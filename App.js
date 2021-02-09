import React from 'react';

import { NavigationContainer, useLinkProps, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './homeScreen.js';
import UserSignupScreen from './userSignupScreen.js';
import ConfigScreen from './configScreen.js';
import RetirementAssetConfigScreen from './retirementAssetConfigScreen.js';

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      protcol: 'http://',
      hostDomain: 'localhost:3000',
      apiVersion: 'v1',
      rootPath: null,
      jwtToken: ""
    }
  }

  componentDidMount() {
    this.setState({
      rootPath: this.state.protcol + this.state.hostDomain + '/api/' + this.state.apiVersion +'/'
    });
  }

  setToken(token) {
    this.setState({
      jwtToken: token
    })
  }

  handleSignout() {
    this.setState({
      jwtToken: ""
    })
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home">
            {() => <HomeScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} onSignout={() => {this.handleSignout()}} {...this.state}/>}
          </Stack.Screen>
          <Stack.Screen name="UserSignup">
            {() => <UserSignupScreen navigation={useNavigation()} {...this.state}/>}
          </Stack.Screen>
          <Stack.Screen name="Config">
            {() => <ConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} {...this.state}/>}
          </Stack.Screen>
          <Stack.Screen name="RetirementAssetConfig">
            {() => <RetirementAssetConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} {...this.state}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
