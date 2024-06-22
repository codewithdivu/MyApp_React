import { deleteDoc, doc } from 'firebase/firestore';
import { DB } from '../contexts/FirebaseContext';

// Delete Story Item - set deleteDocument flag to true
export const deleteStoryItem = (collectionName, docId) =>
  new Promise((resolve) => {
    deleteDoc(doc(DB, collectionName, docId))
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });
