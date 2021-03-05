import React, { useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

function getConfig(props) {
  const url = props.rootPath + 'retirement_asset_config/new'
  fetch(url, {
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
  const url = props.rootPath + 'retirement_asset_config'
  const data = {
    "retirement_asset_calc": {
      monthly_living_cost: props.monthly_living_cost,
      tax_rate: props.tax_rate,
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


function RetirementAssetConfigScreen(props) {
  useEffect(() => {getConfig(props)}, [])

  return (
    <View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>月々の生活費</Text>
        <TextInputComponent
          value={ props.monthly_living_cost }
          onChangeText={(text) => props.handleChangeMonthlyLivingCost(text)}
          type='number'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>税引き後レート(%)</Text>
        <TextInputComponent
          value={ props.tax_rate }
          onChangeText={(text) => props.handleChangeTaxRate(text)}
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
      <View>
        <Text>※4%ルール適用の場合は税引き後レートを80%、期待年利を5%と入力。</Text>
        <Text> 5% × 80% = 4%</Text>
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

export default RetirementAssetConfigScreen;
