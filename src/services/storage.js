import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { STORAGE } from '../contexts/FirebaseContext';

// -----------------CONSTANTS---------------------------

export const SCHOOL_BUCKET = 'schools';

export const uploadFile = async (file, path) =>
  new Promise((resolve) => {
    const fileRef = ref(STORAGE, path);

    uploadBytes(fileRef, file)
      .then(() => {
        getDownloadURL(fileRef)
          .then((url) => resolve(url))
          .catch(() => resolve(false));
      })
      .catch(() => resolve(false));
  });

// DELETE

export const deleteFile = async (filePath) =>
  new Promise((resolve) => {
    const fileRef = ref(STORAGE, filePath);
    deleteObject(fileRef)
      .then(() => resolve(true))
      .catch(() => resolve(false));
  });

export const updateFile = async (file, path) =>
  // eslint-disable-next-line no-async-promise-executor
  new Promise(async (resolve) => {
    const res = await deleteFile(path);
    if (res) {
      const resP = await uploadFile(file, path);
      resolve(resP);
    } else resolve('');
  });
