import React from 'react';
import { NavigationContainer, useLinkProps, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import HomeScreen from './homeScreen.js';
import UserSignupScreen from './userSignupScreen.js';
import UserSigninScreen from './userSigninScreen.js';
import ConfigScreen from './configScreen.js';
import ResetPasswordScreen from './resetPasswordScreen.js';
import RetirementAssetConfigScreen from './retirementAssetConfigScreen.js';
import Url from 'url-parse';
import { Buffer } from 'buffer';
import { Encoding } from 'encoding-japanese';

// UTF-8デコード
const encoding = require('encoding-japanese');
// const encoding = Encoding

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
    Linking.addEventListener('url', this.handleLink)
  }

  handleLink(e) {
    // FIXME: アプリが起動されていない状態で本登録をタップしたときに、イベントリスナーが機能しない不具合
    const str=decodeURI(e.url)
    const url = new Url(str);
    const query = url.query.slice(1).split('&')
    const queryObject = query.reduce((result, val, i) => {
      const index = val.indexOf('=')
      const key = val.slice(0, index)
      result[key] = val.slice(index + 1)
      return result
    }, {})
    alert(queryObject.message)
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
    const config = {
      screens: {
        UserSignin: 'home',
        ResetPassword: 'reset_password'
      }
    }
    const linking = {
      prefixes: ['firecountdownapp://'],
      config
    };


    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Home">
          {this.state.jwtToken == "" ? (
            <>
              <Stack.Screen name="UserSignin">
                {() => <UserSigninScreen navigation={useNavigation()} {...this.state} setToken={(token) => {this.setToken(token)}} />}
              </Stack.Screen>
              <Stack.Screen name="UserSignup">
                {() => <UserSignupScreen navigation={useNavigation()} {...this.state}/>}
              </Stack.Screen>
              <Stack.Screen name="ResetPassword">
                {() => <ResetPasswordScreen navigation={useNavigation()} {...this.state}/>}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Home">
                {() => <HomeScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} onSignout={() => {this.handleSignout()}} {...this.state}/>}
              </Stack.Screen>

              <Stack.Screen name="Config">
                {() => <ConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} {...this.state}/>}
              </Stack.Screen>
              <Stack.Screen name="RetirementAssetConfig">
                {() => <RetirementAssetConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} {...this.state}/>}
              </Stack.Screen>
            </>
          )
        }

        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
