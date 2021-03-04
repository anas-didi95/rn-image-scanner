import React from 'react';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import {createStackNavigator} from '@react-navigation/stack';
import {Alert, BackHandler} from 'react-native';
import useConstants from './src/utils/hooks/useConstants';
import HistoryScreen from './src/screens/HistoryScreen';
import HistoryResultScreen from './src/screens/HistoryResultScreen';

const HistoryStackNavigator = createStackNavigator();
const HistoryStack = () => (
  <HistoryStackNavigator.Navigator initialRouteName="History">
    <HistoryStackNavigator.Screen
      name="History"
      component={HistoryScreen}
      options={{header: ({}) => null}}
    />
    <HistoryStackNavigator.Screen
      name="history-about"
      component={HistoryResultScreen}
      options={{header: () => null}}
    />
  </HistoryStackNavigator.Navigator>
);

const HomeTabNavigator = createBottomTabNavigator();
const HomeTab = () => {
  const constants = useConstants();

  useFocusEffect(() => {
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
    <HomeTabNavigator.Navigator initialRouteName={constants.route.homeTab.home}>
      <HomeTabNavigator.Screen
        name={constants.route.homeTab.home}
        component={HomeScreen}
        options={{
          title: constants.header.home,
          tabBarIcon: ({focused}) =>
            focused ? <Icon name="home" /> : <Icon name="home-outline" />,
        }}
      />
      <HomeTabNavigator.Screen
        name="historyStack"
        component={HistoryStack}
        options={{
          title: 'History',
          tabBarIcon: ({focused}) =>
            focused ? <Icon name="timer" /> : <Icon name="timer-outline" />,
        }}
      />
      <HomeTabNavigator.Screen
        name={constants.route.homeTab.about}
        component={AboutScreen}
        options={{
          title: constants.header.about,
          tabBarIcon: ({focused}) =>
            focused ? <Icon name="person" /> : <Icon name="person-outline" />,
        }}
      />
    </HomeTabNavigator.Navigator>
  );
};

const AppStackNavigator = createStackNavigator();
const App = () => {
  const constants = useConstants();

  return (
    <NavigationContainer>
      <AppStackNavigator.Navigator
        initialRouteName={constants.route.homeTab.index}>
        <AppStackNavigator.Screen
          name={constants.route.homeTab.index}
          component={HomeTab}
          options={{header: () => null}}
        />
      </AppStackNavigator.Navigator>
    </NavigationContainer>
  );
};

export default App;
