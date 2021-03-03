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
import UrlParser from './lib/url.js';


// UTF-8デコード
// const encoding = require('encoding-japanese');
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
      jwtToken: "",
      linkingUrl: null,
      linkingHostname: null,
      linkingParams: null,
      email: null,
      password: null,
      password_confirmation: null
    };
    // this.handleLink = this.handleLink.bind(this)
  }

  componentDidMount() {
    // console.log('App did mount')
    // var string = decodeURI('firecalc://home?status=error&message=%E7%99%BB%E9%8C%B2%E7%A2%BA%E8%AA%8D%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%AE%E6%9C%9F%E9%99%90%E3%81%8C%E5%88%87%E3%82%8C%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99')
    // const url = new UrlParser(string);

    this.setState({
      rootPath: this.state.protcol + this.state.hostDomain + '/api/' + this.state.apiVersion +'/'
    });
    Linking.addEventListener('url', this.handleLink)
  }

  handleLink(e) {
    const str=decodeURI(e.url)
    const url = new UrlParser(str);
    this.setState({
      linkingHostname: url.hostname,
      linkingParams: url.params
    })
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

  handleChangeEmail(text) {
    this.setState({
      email: text
    });
  };

  handleChangePassword(text) {
    this.setState({
      password: text
    });
  }

  handleChangePasswordConfirmation(text) {
    this.setState({
      password_confirmation: text
    });
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
      config,
    };


    return (
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="ResetPassword">
          {this.state.jwtToken == "" ? (
            <>
              <Stack.Screen name="UserSignin">
                {() => <UserSigninScreen navigation={useNavigation()} {...this.state} setToken={(token) => {this.setToken(token)}} onChangeEmail={(text) => {this.handleChangeEmail(text)}} onChangePassword={(text) => {this.handleChangePassword(text)}}/>}
              </Stack.Screen>
              <Stack.Screen name="UserSignup">
                {() => <UserSignupScreen navigation={useNavigation()} {...this.state}/>}
              </Stack.Screen>
              <Stack.Screen name="ResetPassword">
                {() => <ResetPasswordScreen navigation={useNavigation()} {...this.state} onChangePassword={(text) => {this.handleChangePassword(text)}} onChangePasswordConfirmation={(text) => {this.handleChangePasswordConfirmation(text)}}/>}
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
