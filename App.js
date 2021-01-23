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
      apiRootPath: 'localhost:3000',
    }
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home">
            {() => <HomeScreen navigation={useNavigation()} rootPath={this.state.apiRootPath}/>}
          </Stack.Screen>
          <Stack.Screen name="UserSignup" component={UserSignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
