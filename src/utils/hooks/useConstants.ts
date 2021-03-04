const useConstants = () => {
  const route = {
    homeTab: {
      index: '1',
      home: '1-1',
      about: '1-2',
    },
    historyStack: {
      index: '2',
      result: '2-1',
    },
  };

  const header = {
    home: 'Home',
    about: 'About',
    history: 'History',
    historyResult: 'History Result',
  };

  return {route, header};
};

export default useConstants;
