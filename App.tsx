import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';

const StackNavigator = createStackNavigator();

const App = () => (
  <NavigationContainer>
    <StackNavigator.Navigator initialRouteName="Home">
      <StackNavigator.Screen name="Home" component={HomeScreen} />
      <StackNavigator.Screen name="About" component={AboutScreen} />
    </StackNavigator.Navigator>
  </NavigationContainer>
);

export default App;
