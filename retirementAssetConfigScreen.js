import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

function getConfig(props) {
  const url = props.rootPath + 'retirement_asset_config/new'
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
    return newState;
  })
}

function handlePress(retirement_asset_config, props) {
  const url = props.rootPath + 'retirement_asset_config'
  const data = {
    "retirement_asset_calc": {
      monthly_living_cost: retirement_asset_config.monthly_living_cost,
      tax_rate: retirement_asset_config.tax_rate,
      annual_yield: retirement_asset_config.annual_yield
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
      alert(message.join('\n'));
    }
  })
}


function RetirementAssetConfigScreen(props) {
  const [monthly_living_cost, setMonthlyLivingCost] = useState(null)
  const [tax_rate, setTaxRate] = useState(null)
  const [annual_yield, setAnnualYield] = useState(null)

  const retirementAssetConfigInput = {
    monthly_living_cost: monthly_living_cost,
    tax_rate: tax_rate,
    annual_yield: annual_yield
  }

  useEffect(() => {
    const config = getConfig(props)
    config.then(config => {
      setMonthlyLivingCost(config.monthly_living_cost)
      setTaxRate(config.tax_rate)
      setAnnualYield(config.annual_yield)
    })
  }, [])

  return (
    <View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>月々の生活費</Text>
        <TextInputComponent
          value={ monthly_living_cost }
          onChangeText={(text) => setMonthlyLivingCost(text)}
          type='number'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>税引き後レート(%)</Text>
        <TextInputComponent
          value={ tax_rate }
          onChangeText={(text) => setTaxRate(text)}
          type='number'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>期待年利</Text>
        <TextInputComponent
          value={ annual_yield }
          onChangeText={(text) => setAnnualYield(text)}
          type='number'
        />
      </View>
      <View style={ styles.submitBox }>
        <Button
          title={ '設定する' }
          onPress={() => {handlePress(retirementAssetConfigInput, props)} }
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
