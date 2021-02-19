import React, {createContext, ReactNode, useContext, useState} from 'react';

interface ICameraContext {
  getUri: () => string;
  setUri: (uri: string) => void;
}
const CameraContext = createContext<ICameraContext>({
  getUri: () => '',
  setUri: () => {},
});

const CameraProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [data, setData] = useState<{uri: string}>({
    uri: '',
  });

  const getUri = () => data.uri;
  const setUri = (uri: string) => setData((prev) => ({...prev, uri: uri}));

  return (
    <CameraContext.Provider value={{getUri, setUri}}>
      {children}
    </CameraContext.Provider>
  );
};

const useCameraContext = () => useContext(CameraContext);

export default CameraProvider;
export {useCameraContext};
