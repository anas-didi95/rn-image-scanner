import storage from '@react-native-firebase/storage';

const useFirebase = () => {
  const saveImage = async (fullPath: string): Promise<string> => {
    try {
      const fileName = fullPath.slice(fullPath.lastIndexOf('/') + 1);
      const reference = await storage().ref(fileName).putFile(fullPath);

      return reference.metadata.name;
    } catch (e) {
      console.error('[useFirebase] saveImage failed!', e);
      return '';
    }
  };

  return {saveImage};
};

export default useFirebase;
