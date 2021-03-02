import storage from '@react-native-firebase/storage';

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

  return {saveImage, getDownloadURL};
};

export default useFirebase;
