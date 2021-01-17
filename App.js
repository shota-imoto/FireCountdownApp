import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './homeScreen.js';
import UserSignupScreen from './userSignupScreen.js'

const Stack = createStackNavigator();



class App extends React.Component {
  handlePress() {
    console.log('ok');
  }

  render() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="UserSignup" component={UserSignupScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }
}

export default App;
