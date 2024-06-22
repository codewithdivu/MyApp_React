import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { DB } from '../contexts/FirebaseContext';

export const listenCollectionData = (collectionName, callback, queryList = null) => {
  const dataBaseQuery =
    queryList && queryList.length > 0
      ? queryList.map(({ property, operator, value }) => where(property, operator, value))
      : null;

  const listenCollectionQuery = dataBaseQuery
    ? query(collection(DB, collectionName), ...dataBaseQuery)
    : query(collection(DB, collectionName));

  return onSnapshot(listenCollectionQuery, (querySnapshot) => {
    const data = [];
    querySnapshot.forEach((doc) => data.push({ ...doc.data(), id: doc.id }));
    callback(data);
  });
};
