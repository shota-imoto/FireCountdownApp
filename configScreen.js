import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

function getConfig(props) {
  const url = props.rootPath + 'config/new'
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': props.jwtToken
    }
  }).then(res => res.json())
  .then(body => {
    const asset_config = body.data.attributes
    const newState = {};
    Object.keys(asset_config).forEach(key => {
          newState[key] = asset_config[key];
    });
    props.setConfig(newState);
  })
}


function handlePress(props) {
  const url = props.rootPath + 'config'
  const data = {
    "asset_config": {
      initial_asset: props.initial_asset,
      monthly_purchase: props.monthly_purchase,
      annual_yield: props.annual_yield
    }
  }

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': props.jwtToken
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(body => {
    const status = body.data.attributes.status;
    const message = body.data.attributes.message;
    if (status == 'success') {
      alert('設定が完了しました')
      props.navigation.navigate('Home')
      // home画面の更新
      props.changeConfig()
    } else {
      const errorMessage = []
      Object.keys(message).forEach(key => {
        errorMessage.push(key + ':' + message[key]);
      });
      alert(errorMessage.join('\n'));
    }
  })
}


function ConfigScreen (props) {
  useEffect(() => {getConfig(props)}, [])

  return (
    <View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>現在の資産</Text>
        <TextInputComponent
          value={ props.initial_asset }
          onChangeText={(text) => props.handleChangeInitialAsset(text)}
          type='number'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>月々の積立額</Text>
        <TextInputComponent
          value={ props.monthly_purchase }
          onChangeText={(text) => props.handleChangeMonthlyPurchase(text)}
          type='number'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>期待年利</Text>
        <TextInputComponent
          value={ props.annual_yield }
          onChangeText={(text) => props.handleChangeAnnualYield(text)}
          type='number'
        />
      </View>
      <View style={ styles.submitBox }>
      <Button
        title={ '設定する' }
        onPress={() => {handlePress(props)} }
      />
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    width: 140,
    paddingHorizontal: 10,
    textAlign: 'right'
  },
  textFormBox: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
})

export default ConfigScreen;
