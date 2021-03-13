import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from './components/textInputComponent.js'

function getConfig(props, rootPath, jwtToken) {
  const url = rootPath + 'config/new'
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': jwtToken
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


function handlePress(props, rootPath, jwtToken, navigation) {
  const url = rootPath + 'config'
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
      'Authorization': jwtToken
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
  .then(body => {
    const status = body.data.attributes.status;
    const message = body.data.attributes.message;
    if (status == 'success') {
      alert('設定が完了しました')
      navigation.navigate('Home')
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
  const [initial_asset, setInitialAsset] = useState(null)
  const [monthly_purchase, setMonthlyPurchase] = useState(null)
  const [annual_yield, setAnnualYield] = useState(null)

  const assetConfigInput = {
    initial_asset: initial_asset,
    monthly_purchase: monthly_purchase,
    annual_yield: annual_yield
  }

  useEffect(() => {getConfig(assetConfigInput, props.rootPath, props.jwtToken)}, [])

  return (
    <View style={ styles.wrapper }>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>現在の資産</Text>
        </View>
        <TextInputComponent
          value={ initial_asset }
          onChangeText={(text) => setInitialAsset(text)}
          type='number'
        />
      </View>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>月々の積立額</Text>
        </View>
        <TextInputComponent
          value={ monthly_purchase }
          onChangeText={(text) => setMonthlyPurchase(text)}
          type='number'
        />
      </View>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>期待年利</Text>
        </View>
        <TextInputComponent
          value={ annual_yield }
          onChangeText={(text) => setAnnualYield(text)}
          type='number'
        />
      </View>
      <View style={ btnStyle.wrapper }>
        <TouchableOpacity style={ btnStyle.btn } onPress={() => {handlePress(assetConfigInput, props.rootPath, props.jwtToken, props.navigation)}}>
          <Text style={ btnStyle.text }>設定</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 150,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
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
  submitBox: {
    alignItems: 'center'
  }
})

const textStyle = StyleSheet.create({
  wrapper: {

  },
  labelBlock: {
    marginTop: 25,
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

const btnStyle = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    width: 310,
    alignItems: 'flex-start'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    width: 80,
    backgroundColor: '#EDB413',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default ConfigScreen;
