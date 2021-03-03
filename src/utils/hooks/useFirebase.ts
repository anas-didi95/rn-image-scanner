import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import {TResult} from '../types';

type TFirestoreResult = {
  imageUri: string;
  fullText: string;
  texts: TResult[];
  createDate: Date;
};
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

  return {saveImage, getDownloadURL, saveResult};
};

export default useFirebase;
