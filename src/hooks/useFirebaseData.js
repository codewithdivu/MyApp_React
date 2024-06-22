import { useState, useEffect } from 'react';
import { listenCollectionData } from '../services/listeners';
import useAuth from './useAuth';
import { getStoryItem } from '../services/getServices';

// const { user } = useAuth();

// const [data, isLoading] = useFirebaseData(
//   REVIEWER,
//   firebaseDataType.STUDENT_DATA,
//   [
//     {
//       property: 'createdBy',
//       operator: firebaseQueryOperators.EQUAL_TO,
//       value: user?.uid,
//     },
//     {
//       property: 'deleteDocument',
//       operator: firebaseQueryOperators.EQUAL_TO,
//       value: false,
//     },
//   ]
// );

const useFirebaseData = (collectionName, queryList = null) => {
  const [collectionData, setCollectionData] = useState(null);
  const [isDataFetching, setIsDataFetching] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    let listener = '';
    if (user) {
      listener = listenCollectionData(
        collectionName,
        (fetchedData) => {
          setCollectionData(fetchedData);
          setIsDataFetching(false);
        },
        queryList
      );
    }
    return () => listener && listener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchData = async (queryList = []) => {
    try {
      setIsDataFetching(true);
      const res = await getStoryItem(collectionName, queryList);
      setIsDataFetching(false);
      if (res) {
        setCollectionData(res);
      }
    } catch (error) {
      setIsDataFetching(false);
    }
  };

  return {
    data: collectionData,
    isFetching: isDataFetching,
    fetchData,
  };
};

export default useFirebaseData;
