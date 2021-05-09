import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Linking from 'expo-linking';
import HomeScreen from './screen/homeScreen.js';
import UserSignupScreen from './screen/userSignupScreen.js';
import UserSigninScreen from './screen/userSigninScreen.js';
import ResetPasswordScreen from './screen/resetPasswordScreen.js';
import ConfigScreen from './screen/configScreen.js';
import RetirementAssetConfigScreen from './screen/retirementAssetConfigScreen.js';
import AssetRecordScreen from './screen/assetRecordScreen.js';
import UrlParser from './lib/url.js';
import { TransitionPresets } from '@react-navigation/stack';
import * as firebase from 'firebase';
import { setJWT, getJWT } from './components/jwt.js'

const Stack = createStackNavigator();

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyACLCFZ7eRkj-Zr_XXkh_zXCgqyetgK8EQ',
  authDomain: 'fcapp-58538.firebaseapp.com',
  databaseURL: 'https://project-id.firebaseio.com',
  projectId: 'fcapp-58538',
  storageBucket: 'fcapp-58538.appspot.com',
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locale: 'en',
      protcol: 'http://',
      hostDomain: 'localhost:3000',
      // protcol: 'https://'
      // hostDomain: 'fcaapp.cf',
      apiVersion: 'v1',
      rootPath: null,
      jwtToken: "",
      linkingUrl: null,
      linkingHostname: null,
      linkingParams: null,
      // home mount
      mounted: true,
      username: null,
      rest_years: null,
      rest_months: null,
      rest_days: null,
      unset_configs: [],
      config_changed: false,
    };
  }

  componentDidMount() {
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
      rest_years: result.data.attributes.rest_years,
      rest_months: result.data.attributes.rest_months,
      rest_days: result.data.attributes.rest_days,
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

    if (this.state.jwtToken == "") {
    getJWT().then((token) =>{
      this.setToken(token)
    })
    }

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
              <Stack.Screen name="ResetPassword" options={{ headerShown: false, cardStyle: {backgroundColor: 'transparent'}, ...TransitionPresets.ModalTransition }}>
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
              <Stack.Screen name="AssetRecord" options={{ headerShown: false, cardStyle: {backgroundColor: 'transparent'}, ...TransitionPresets.ModalTransition }}>
                {() => <AssetRecordScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} changeConfig={() => {this.notifyConfigChanged()}} handleChangeInitialAsset={(props) => {this.handleChangeInitialAsset(props)}} handleChangeMonthlyPurchase={(props) => {this.handleChangeMonthlyPurchase(props)}} handleChangeAnnualYield={(props) => {this.handleChangeAnnualYield(props)}} setConfig={(props) => {this.setState(props)}} {...this.state}/>}
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
