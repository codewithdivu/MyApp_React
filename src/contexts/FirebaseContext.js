import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer, useState } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
//
import { addStoryItem } from '../services/addServices';
import { USER_STATUS } from '../constants/keywords';
import { FIREBASE_COLLECTIONS } from '../constants/collections';
import { FIREBASE_API } from '../config';

// ----------------------------------------------------------------------

const ADMIN_EMAILS = ['admin@gmail.com'];

const firebaseApp = initializeApp(FIREBASE_API);

export const AUTH = getAuth(firebaseApp);

export const DB = getFirestore(firebaseApp);

export const STORAGE = getStorage(firebaseApp);

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }

  return state;
};

const AuthContext = createContext({
  ...initialState,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

// ----------------------------------------------------------------------

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [profile, setProfile] = useState(null);
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const sub = onAuthStateChanged(AUTH, async (user) => {
      if (user) {
        const userRef = doc(DB, FIREBASE_COLLECTIONS.users, user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists() && docSnap.data()?.status === USER_STATUS.ACTIVE) {
          setProfile(docSnap.data());
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: true, user },
          });
        } else {
          setProfile(null);
          dispatch({
            type: 'INITIALISE',
            payload: { isAuthenticated: false, user: null },
          });
        }
      } else {
        dispatch({
          type: 'INITIALISE',
          payload: { isAuthenticated: false, user: null },
        });
      }
    });
    return sub;
  }, []);

  const login = (email, password) => signInWithEmailAndPassword(AUTH, email, password);

  const logout = () => signOut(AUTH);

  const register = ({ email, password, firstName, lastName, ...rest }) =>
    new Promise((resolve) => {
      createUserWithEmailAndPassword(AUTH, email, password)
        .then(async (res) => {
          const response = await addStoryItem(
            FIREBASE_COLLECTIONS.users,
            {
              uid: res.user?.uid,
              email,
              displayName: `${firstName} ${lastName}`,
              createdAt: new Date(),
              createdBy: res.user?.uid,
              ...rest,
            },
            res.user?.uid
          );
          logout();
          resolve(response);
        })
        .catch(() => resolve(''));
    });

  return (
    <AuthContext.Provider
      value={{
        ...state,
        user: {
          id: state?.user?.uid,
          email: state?.user?.email,
          photoURL: state?.user?.photoURL || profile?.photoURL,
          displayName: state?.user?.displayName || profile?.displayName,
          role: ADMIN_EMAILS.includes(state?.user?.email) ? 'admin' : profile?.designation,
          phoneNumber: state?.user?.phoneNumber || profile?.phoneNumber || '',
          ...profile,
        },
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
