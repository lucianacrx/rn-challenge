/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */



import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import HomeScreen from './components/Home'
import UserDetailScreen from './components/UserDetail'

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Details: {
    screen: UserDetailScreen
  }
});
export default createAppContainer(AppNavigator);