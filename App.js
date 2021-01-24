import React from 'react';

import { NavigationContainer, useLinkProps, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './homeScreen.js';
import UserSignupScreen from './userSignupScreen.js'

const Stack = createStackNavigator();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      protcol: 'http://',
      hostDomain: 'localhost:3000',
      apiVersion: 'v1',
      rootPath :null
    }
  }

  componentDidMount() {
    this.setState({
      rootPath: this.state.protcol + this.state.hostDomain + '/api/' + this.state.apiVersion +'/'
    });
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home">
            {() => <HomeScreen navigation={useNavigation()} rootPath={this.state.rootPath}/>}
          </Stack.Screen>
          <Stack.Screen name="UserSignup">
            {() => <UserSignupScreen navigation={useNavigation()} rootPath={this.state.rootPath}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
