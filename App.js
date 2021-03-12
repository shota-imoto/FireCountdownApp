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
import { TransitionPresets } from '@react-navigation/stack';

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
      // jwtToken: "eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOjE4LCJpYXQiOjE2MTc0OTUwMTh9.BK8J6efrBhqJ7ts2rPMH0hJrEO-9c4LSY6V-a296YM9aDyEJY8n5dY3XFBP2VTn13zi1IfHuuekazhcLCruTavPwsjOZc2Jaluzl4RRHtaZBt9K8xKmrS2a_8jAxaW4TO6jPValhsoIfHpNZDk-krW3TrYKRtngvBqz7QFiLPoGjKr7MzN0j801OgvwnDe7rRVPPBnPPwQApPwLqp5bt4efxlPf6fEqgQIjnbDDHDymO5VcQXgR9o9kgzC781PLE9kBiHeXbsJM08VbaUSpdDdW4lPUU36L7a5X0g5JNdOdgsfuQ1xo156AUZ1NRQcu9UIvbr_BRIj0YE-KjHg",
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
      // asset config
      initial_asset: null, // 現在の資産
      monthly_purchase: null, // 月々の積立額
      annual_yield: null, // 期待年利
      // retirement asset config
      monthly_living_cost: null, // 月々の生活費
      tax_rate: null, // 税引き後レート
      annual_yield: null, // 期待年利
      mouted: true,
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
      username: result.included[0].attributes.nickname,
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

  // asset_config
  handleChangeInitialAsset(text) {
    this.setState({
      initial_asset: text
    });
  };

  handleChangeMonthlyPurchase(text) {
    this.setState({
      monthly_purchase: text
    });
  };

  handleChangeAnnualYield(text) {
    this.setState({
      annual_yield: text
    });
  };

  // retirement_asset_config
  handleChangeMonthlyLivingCost(text) {
    this.setState({
      monthly_living_cost: text
    });
  };

  handleChangeTaxRate(text) {
    this.setState({
      tax_rate: text
    });
  };

  handleChangeAnnualYield(text) {
    this.setState({
      annual_yield: text
    });
  };

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
              <Stack.Screen name="UserSignin">
                {() => <UserSigninScreen navigation={useNavigation()} {...this.state} setToken={(token) => {this.setToken(token)}} onChangeEmail={(text) => {this.handleChangeEmail(text)}} onChangePassword={(text) => {this.handleChangePassword(text)}}/>}
              </Stack.Screen>
              <Stack.Screen name="UserSignup" options={{ headerShown: false, cardStyle: {backgroundColor: 'transparent'}, ...TransitionPresets.ModalTransition }}>
                {() => <UserSignupScreen navigation={useNavigation()} {...this.state} onChangeNickname={(text) => {this.handleChangeNickname(text)}} onChangeEmail={(text) => {this.handleChangeEmail(text)}} onChangePassword={(text) => {this.handleChangePassword(text)}} onChangePasswordConfirmation={(text) => {this.handleChangePasswordConfirmation(text)}} onClearInput={this.clearUserInput}/>}
              </Stack.Screen>
              <Stack.Screen name="ResetPassword">
                {() => <ResetPasswordScreen navigation={useNavigation()} {...this.state} onChangePassword={(text) => {this.handleChangePassword(text)}} onChangePasswordConfirmation={(text) => {this.handleChangePasswordConfirmation(text)}} resetState={(attributes) => {this.resetState(attributes)}}/>}
              </Stack.Screen>
            </>
          ) : (
            <>
              <Stack.Screen name="Home">
                {() => <HomeScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} onSignout={() => {this.handleSignout()}} {...this.state} setSuccessData={(props) => {this.setSuccessData(props)}} setErrorData={(props) => {this.setErrorData(props)}}/>}
              </Stack.Screen>
              <Stack.Screen name="Config">
                {() => <ConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} changeConfig={() => {this.notifyConfigChanged()}} handleChangeInitialAsset={(props) => {this.handleChangeInitialAsset(props)}} handleChangeMonthlyPurchase={(props) => {this.handleChangeMonthlyPurchase(props)}} handleChangeAnnualYield={(props) => {this.handleChangeAnnualYield(props)}} setConfig={(props) => {this.setState(props)}} {...this.state}/>}
              </Stack.Screen>
              <Stack.Screen name="RetirementAssetConfig">
                {() => <RetirementAssetConfigScreen navigation={useNavigation()} setToken={(token) => {this.setToken(token)}} changeConfig={() => {this.notifyConfigChanged()}} handleChangeMonthlyLivingCost={(props) => {this.handleChangeMonthlyLivingCost(props)}} handleChangeTaxRate={(props) => {this.handleChangeTaxRate(props)}} handleChangeAnnualYield={(props) => {this.handleChangeAnnualYield(props)}} setConfig={(props) => {this.setState(props)}} {...this.state}/>}
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
