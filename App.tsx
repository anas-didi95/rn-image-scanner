import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import CameraProvider from './src/utils/contexts/CameraContext';

const TabNavigator = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <CameraProvider>
      <TabNavigator.Navigator initialRouteName="Home">
        <TabNavigator.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <Icon name="home" /> : <Icon name="home-outline" />,
          }}
        />
        <TabNavigator.Screen
          name="About"
          component={AboutScreen}
          options={{
            tabBarIcon: ({focused}) =>
              focused ? <Icon name="person" /> : <Icon name="person-outline" />,
          }}
        />
      </TabNavigator.Navigator>
    </CameraProvider>
  </NavigationContainer>
);

export default App;
