import React, {useState} from 'react';
import { NavigationContainer, NavigationContext, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import HomeScreen from './homeScreen.js';
import UserSignupScreen from './userSignupScreen.js';
import UserSigninScreen from './userSigninScreen.js';
import ConfigScreen from './configScreen.js';
import ResetPasswordScreen from './resetPasswordScreen.js';
import RetirementAssetConfigScreen from './retirementAssetConfigScreen.js';
import UrlParser from './lib/url.js';
import { TransitionPresets } from '@react-navigation/stack';
import * as firebase from 'firebase';

const Stack = createStackNavigator();

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyACLCFZ7eRkj-Zr_XXkh_zXCgqyetgK8EQ',
  authDomain: 'fcapp-58538.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'fcapp-58538',
  storageBucket: 'fcapp-58538.appspot.com',
};

firebase.initializeApp(firebaseConfig);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      protcol: 'http://',
      hostDomain: 'localhost:3000',
      apiVersion: 'v1',
      rootPath: null,
      jwtToken: "",
      // jwtToken: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY4NDY2MjEyMTQxMjQ4NzUxOWJiZjhlYWQ4ZGZiYjM3ODYwMjk5ZDciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmNhcHAtNTg1MzgiLCJhdWQiOiJmY2FwcC01ODUzOCIsImF1dGhfdGltZSI6MTYxNjgxODIwMiwidXNlcl9pZCI6IjRBdTR0VlFId21hRTg1RkJkT3ZqdkpoZjVTMTMiLCJzdWIiOiI0QXU0dFZRSHdtYUU4NUZCZE92anZKaGY1UzEzIiwiaWF0IjoxNjE2ODE4MjAyLCJleHAiOjE2MTY4MjE4MDIsImVtYWlsIjoiaGlkZXlvc2hpLnBsYXlpbmcudGhlLmJhbmpvQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImhpZGV5b3NoaS5wbGF5aW5nLnRoZS5iYW5qb0BnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.P79tQJSiCDAEjls_LZVn1nBPV-V-HXlQ49ipBs5_v8L90ahPUJ0R19EueImfUOdQ8HFmG31uz94aOLPeU-TkZsnDxQDTOGbLbEr9R_PREAx4kvL1Z5TRl3pH7oshKsK60kJo3jdrxLSNIsP6qewvDCDPhbzB38qwT9uadH2XP08MgemnWwquST23qkZt_J56WTb2NaBnWT-MQyJsdDYvvRcirbb4z3wnCD6jlVgZ4jigHwCKMdIxJYqYC_UQo15ZG4JVFkkfYy4LswfbQuHtG7sXuAIXe2Kob1z3LGVBjk_LwK11Zcjyhwkbxq9yV2HSwsvmBFSBw83CyP9pNSdHBg",
      linkingUrl: null,
      linkingHostname: null,
      linkingParams: null,
      // user
      nickname: null,
      email: null,
      password: null,
      password_confirmation: null,
      // home mount
      mounted: true,
      username: null,
      rest_years: null,
      rest_months: null,
      unset_configs: [],
      config_changed: false,
    };
  }



  componentDidMount() {
    // var string = decodeURI('firecalc://home?status=error&message=%E7%99%BB%E9%8C%B2%E7%A2%BA%E8%AA%8D%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%AE%E6%9C%9F%E9%99%90%E3%81%8C%E5%88%87%E3%82%8C%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99')
    // const url = new UrlParser(string);

    this.setState({
      rootPath: this.state.protcol + this.state.hostDomain + '/api/' + this.state.apiVersion +'/'
    });
    Linking.addEventListener('url', this.handleLink)
  }

  handleLink = (e) => {
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

  handleChangeNickname(text) {
    this.setState({
      nickname: text
    });
  };

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

  clearUserInput() {
    this.setState({
      nickname: null,
      email: null,
      password: null,
      password_confirmation: null
    });
  }

  setSuccessData(result) {
    this.setState({
      rest_years: result.data.attributes.asset_years,
      rest_months: result.data.attributes.asset_months,
      messages: null
    })
  }

  setErrorData(result) {
    const messages = result.data.attributes.messages
    const unset_configs = Object.keys(messages)

    this.setState({
      rest_years: null,
      rest_months: null,
      username: result.included[0].attributes.nickname,
      unset_configs: unset_configs
    })
  }

  notifyConfigChanged() {
    this.setState({
      config_changed: !this.state.config_changed
    })
  }

  resetState(attributes) {
    let stateList = {}
    attributes.forEach( attribute => {
      stateList[attribute] = null
    })
    this.setState(stateList)
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
        <Stack.Navigator initialRouteName="Home">
          {this.state.jwtToken == "" ? (
            <>
              <Stack.Screen name="UserSignin" options={{ headerShown: false }}>
                {() =><UserSigninScreen navigation={ useNavigation()} {...this.state} setToken={(token) => {this.setToken(token)}} onChangeEmail={(text) => {this.handleChangeEmail(text)}} onChangePassword={(text) => {this.handleChangePassword(text)}}/>}
              </Stack.Screen>
              <Stack.Screen name="UserSignup" options={{ headerShown: false, cardStyle: {backgroundColor: 'transparent'}, ...TransitionPresets.ModalTransition }}>
                {() =>  <UserSignupScreen navigation={useNavigation()} {...this.state} onChangeNickname={(text) => {this.handleChangeNickname(text)}} onChangeEmail={(text) => {this.handleChangeEmail(text)}} onChangePassword={(text) => {this.handleChangePassword(text)}} onChangePasswordConfirmation={(text) => {this.handleChangePasswordConfirmation(text)}} onClearInput={this.clearUserInput}/>}
              </Stack.Screen>
              <Stack.Screen name="ResetPassword">
                {() => <ResetPasswordScreen navigation={useNavigation()} {...this.state} onChangePassword={(text) => {this.handleChangePassword(text)}} onChangePasswordConfirmation={(text) => {this.handleChangePasswordConfirmation(text)}} resetState={(attributes) => {this.resetState(attributes)}}/>}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {() => <HomeScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} onSignout={() => {this.handleSignout()}} {...this.state} setSuccessData={(props) => {this.setSuccessData(props)}} setErrorData={(props) => {this.setErrorData(props)}}/>}
              </Stack.Screen>
              <Stack.Screen name="Config" options={{ headerShown: false, cardStyle: {backgroundColor: 'transparent'}, ...TransitionPresets.ModalTransition }}>
                {() => <ConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} changeConfig={() => {this.notifyConfigChanged()}} handleChangeInitialAsset={(props) => {this.handleChangeInitialAsset(props)}} handleChangeMonthlyPurchase={(props) => {this.handleChangeMonthlyPurchase(props)}} handleChangeAnnualYield={(props) => {this.handleChangeAnnualYield(props)}} setConfig={(props) => {this.setState(props)}} {...this.state}/>}
              </Stack.Screen>
              <Stack.Screen name="RetirementAssetConfig" options={{ headerShown: false, cardStyle: {backgroundColor: 'transparent'}, ...TransitionPresets.ModalTransition }}>
                {() => <RetirementAssetConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} changeConfig={() => {this.notifyConfigChanged()}} {...this.state}/>}
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
