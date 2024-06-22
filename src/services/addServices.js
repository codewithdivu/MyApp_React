import { collection, doc, setDoc } from 'firebase/firestore';
import { AUTH, DB } from '../contexts/FirebaseContext';

export const addStoryItem = (collectionName, data, defaultId = '') =>
  new Promise((resolve) => {
    const newStoryItemRef = defaultId
      ? doc(collection(DB, collectionName), defaultId)
      : doc(collection(DB, collectionName));
    setDoc(newStoryItemRef, {
      ...data,
      id: newStoryItemRef?.id,
      createdAt: new Date(),
      createdBy: AUTH?.currentUser?.uid,
    })
      .then(() => resolve(newStoryItemRef?.id))
      .catch(() => resolve(false));
  });
