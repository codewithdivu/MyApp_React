import { collection, query, where, getDocs } from 'firebase/firestore';
import { DB } from '../contexts/FirebaseContext';

export const getStoryItem = (collectionName, queryList = null) =>
  new Promise((resolve) => {
    const dbQuery =
      queryList && queryList.length > 0
        ? query(
            collection(DB, collectionName),
            ...queryList?.map(({ property, operator, value }) => where(property, operator, value))
          )
        : query(collection(DB, collectionName));
    const fetchedData = [];
    getDocs(dbQuery)
      .then((response) => {
        response.docs.forEach((document) => {
          const fetchedDoc = {
            id: document.id,
            ...document.data(),
          };
          fetchedData.push(fetchedDoc);
        });
        resolve(fetchedData);
      })
      .catch(() => {
        resolve('');
      });
  });
