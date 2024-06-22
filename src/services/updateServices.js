import { doc, increment, updateDoc } from 'firebase/firestore';
import { DB } from '../contexts/FirebaseContext';

export const updateStoryItem = (collectionName, data) =>
  new Promise((resolve) => {
    updateDoc(doc(DB, collectionName, data?.id), {
      ...data,
      updateCount: increment(1),
      updatedAt: new Date(),
    })
      .then(() => resolve(data?.id))
      .catch(() => resolve(false));
  });
