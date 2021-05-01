import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from '../components/textInputComponent.js';

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
      four_percents_rule_ajustment: retirement_asset_config.four_percents_rule_ajustment,
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
  const [four_percents_rule_ajustment, setFourPercentsRuleAjustment] = useState(null)

  const retirementAssetConfigInput = {
    monthly_living_cost: monthly_living_cost,
    four_percents_rule_ajustment: four_percents_rule_ajustment
  }

  useEffect(() => {
    const config = getConfig(props)
    config.then(config => {
      setMonthlyLivingCost(config.monthly_living_cost)
      setFourPercentsRuleAjustment(config.four_percents_rule_ajustment)
    })
  }, [])

  return (
    <View style={ styles.wrapper }>
      <View style={ textStyle.wrapper }>
        <View>
          <Text style={ textStyle.label }>月々の生活費</Text>
        </View>
        <TextInputComponent
          value={ monthly_living_cost }
          onChangeText={(text) => setMonthlyLivingCost(text)}
          type='number'
        />
      </View>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>4%ルール補正</Text>
        </View>
        <TextInputComponent
          value={ four_percents_rule_ajustment }
          onChangeText={(text) => setFourPercentsRuleAjustment(text)}
          type='number'
        />
      </View>
      <View style={ btnStyle.wrapper }>
        <TouchableOpacity style={ btnStyle.btn } onPress={() => {handlePress(retirementAssetConfigInput, props)} }>
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
  },
  descriptionBox: {
    marginTop: 20
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

export default RetirementAssetConfigScreen;
