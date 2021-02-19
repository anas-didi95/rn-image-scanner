import React, {createContext, ReactNode, useContext, useState} from 'react';

interface ICameraContext {
  isOpen: () => boolean;
  setOpen: () => void;
  setClose: () => void;
}
const CameraContext = createContext<ICameraContext>({
  isOpen: () => false,
  setOpen: () => {},
  setClose: () => {},
});

const CameraProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [status, setStatus] = useState<boolean>(false);

  const isOpen = () => status;
  const setOpen = () => setStatus(true);
  const setClose = () => setStatus(false);

  return (
    <CameraContext.Provider value={{isOpen, setOpen, setClose}}>
      {children}
    </CameraContext.Provider>
  );
};

const useCameraContext = () => useContext(CameraContext);

export default CameraProvider;
export {useCameraContext};
