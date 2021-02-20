import React from 'react';
import { NavigationContainer, useLinkProps, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import HomeScreen from './homeScreen.js';
import UserSignupScreen from './userSignupScreen.js';
import UserSigninScreen from './userSigninScreen.js';
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
    const str = 'http://google.com?status=success&message=%E3%81%99%E3%81%A7%E3%81%AB%E6%9C%AC%E7%99%BB%E9%8C%B2%E3%81%8C%E5%AE%8C%E4%BA%86%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99';
    const url = new URL(str);
    console.log(url.constructor.name)
    const queryStrings = url.search;
    console.log(queryStrings)
    const message = queryStrings.get('message')
    console.log(message)

    this.setState({
      rootPath: this.state.protcol + this.state.hostDomain + '/api/' + this.state.apiVersion +'/'
    });
    Linking.addEventListener('url', this.handleLink)
  }

  handleLink(e) {
    const url = 'firecountdownapp://home?status=success&message=%E3%81%99%E3%81%A7%E3%81%AB%E6%9C%AC%E7%99%BB%E9%8C%B2%E3%81%8C%E5%AE%8C%E4%BA%86%E3%81%97%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99'
    const params = url.replace(/.+:\/\//, '')

    alert('ok')
    alert(params)
    // alert('本登録が完了しました。登録したメールアドレスとパスワードを入力してログインしてください')
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
        UserSignin: 'home'
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
