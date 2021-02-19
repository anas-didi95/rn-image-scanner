import React from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import CameraProvider, {
  useCameraContext,
} from './src/utils/contexts/CameraContext';
import Camera from './src/components/Camera';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, BackHandler} from 'react-native';

const HomeTabNavigator = createBottomTabNavigator();
const HomeTab = () => {
  const cameraContext = useCameraContext();

  useFocusEffect(() => {
    cameraContext.setClose();
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go exit?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  });

  return (
    <HomeTabNavigator.Navigator initialRouteName="Home">
      <HomeTabNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <Icon name="home" /> : <Icon name="home-outline" />,
        }}
      />
      <HomeTabNavigator.Screen
        name="About"
        component={AboutScreen}
        options={{
          tabBarIcon: ({focused}) =>
            focused ? <Icon name="person" /> : <Icon name="person-outline" />,
        }}
      />
    </HomeTabNavigator.Navigator>
  );
};

const AppStackNavigator = createStackNavigator();
const App = () => (
  <NavigationContainer>
    <CameraProvider>
      <AppStackNavigator.Navigator initialRouteName="HomeTab">
        <AppStackNavigator.Screen
          name="HomeTab"
          component={HomeTab}
          options={{header: () => null}}
        />
        <AppStackNavigator.Screen
          name="Camera"
          component={Camera}
          options={{header: () => null}}
        />
      </AppStackNavigator.Navigator>
    </CameraProvider>
  </NavigationContainer>
);

export default App;
