import { CommonActions } from '@react-navigation/routers';
import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from '../components/textInputComponent.js';
import { Translations } from '../locale/i18n.js';
import { getJWT } from '../components/jwt.js'

function getConfig(props) {
  return getJWT().then((token) =>{
    const url = props.rootPath + 'retirement_asset_config/new'
    return fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
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
  })
}

function handlePress(retirement_asset_config, props) {
  getJWT().then((token) =>{
    const url = props.rootPath + 'retirement_asset_config'
    const data = {
      "retirement_asset_calc": {
        monthly_living_budget: retirement_asset_config.monthly_living_budget,
        ajust_4per_rule: retirement_asset_config.ajust_4per_rule,
      }
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
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
  })
}

function RetirementAssetConfigScreen(props) {
  const [monthly_living_budget, setMonthlyLivingBudget] = useState(null)
  const [ajust_4per_rule, setAjust4perRule] = useState(null)

  const retirementAssetConfigInput = {
    monthly_living_budget: monthly_living_budget,
    ajust_4per_rule: ajust_4per_rule
  }

  useEffect(() => {
    const config = getConfig(props)
    config.then(config => {
      setMonthlyLivingBudget(config.monthly_living_budget)
      setAjust4perRule(config.ajust_4per_rule)
    })
  }, [])

  return (
    <View style={ styles.wrapper }>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>{Translations.t('retirement_asset_config.monthly_living_budget')}</Text>
        </View>
        <TextInputComponent
          value={ monthly_living_budget }
          onChangeText={(text) => setMonthlyLivingBudget(text)}
          type='number'
        />
      </View>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>{Translations.t('retirement_asset_config.four_percents_rule_adjustment')}</Text>
        </View>
        <TextInputComponent
          value={ ajust_4per_rule }
          onChangeText={(text) => setAjust4perRule(text)}
          type='number'
        />
      </View>
      <View style={ btnStyle.wrapper }>
        <TouchableOpacity style={ btnStyle.btn } onPress={() => {handlePress(retirementAssetConfigInput, props)} }>
          <Text style={ btnStyle.text }>{Translations.t('common.setting')}</Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default RetirementAssetConfigScreen;
