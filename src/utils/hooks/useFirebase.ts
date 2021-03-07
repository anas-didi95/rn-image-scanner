import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {TFirestoreResult} from '../types';

const useFirebase = () => {
  const saveImage = async (fullPath: string): Promise<string> => {
    try {
      const fileName = `images/${fullPath.slice(
        fullPath.lastIndexOf('/') + 1,
      )}`;
      await storage().ref(fileName).putFile(fullPath);

      return fileName;
    } catch (e) {
      console.error('[useFirebase] saveImage failed!', e);
      return '';
    }
  };

  const getDownloadURL = async (path: string): Promise<string> => {
    try {
      const downloadURL = await storage().ref(path).getDownloadURL();

      return downloadURL;
    } catch (e) {
      console.error('[useFirebase] getDownloadURL failed!', e);
      return '';
    }
  };

  const saveResult = async (result: TFirestoreResult): Promise<string> => {
    try {
      const document = await firestore().collection('results').add(result);

      return document.id;
    } catch (e) {
      console.error('[useFirebase] saveResult failed!', e);
      return '';
    }
  };

  const getResultList = async (
    lastDoc?: any,
  ): Promise<[TFirestoreResult[], any]> => {
    try {
      let collection = null;
      if (lastDoc) {
        collection = await firestore()
          .collection('results')
          .orderBy('createDate', 'desc')
          .startAfter(lastDoc)
          .limit(5)
          .get();
      } else {
        collection = await firestore()
          .collection('results')
          .orderBy('createDate', 'desc')
          .limit(5)
          .get();
      }

      const lastVisible = collection.docs[collection.docs.length - 1];
      const resultList: TFirestoreResult[] = collection.docs.map((doc) => {
        const data = doc.data();

        return {
          ...data,
          id: doc.id,
          createDate: data.createDate.toDate(),
        } as TFirestoreResult;
      });

      return [resultList, lastVisible];
    } catch (e) {
      console.error('[useFirebase] getResultList failed!', e);
      return [[], null];
    }
  };

  return {saveImage, getDownloadURL, saveResult, getResultList};
};

export default useFirebase;
