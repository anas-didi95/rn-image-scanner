const useConstants = () => {
  const route = {
    homeTab: {
      index: 'home-tab',
      home: 'home-tab-home',
      about: 'home-tab-about',
    },
    camera: 'camera',
  };

  const header = {
    home: 'Home',
    about: 'About',
  };

  return {route, header};
};

export default useConstants;
