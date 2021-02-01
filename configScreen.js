import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

class ConfigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initial_asset: null, // 現在の資産
      monthly_purchase: null, // 月々の積立額
      annual_yield: null, // 期待年利
    }
  }

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

  handlePress(props) {
    const url = this.props.rootPath
    const data = {
      "asset_config": {
        initial_asset: this.state.initial_asset,
        monthly_purchase: this.state.monthly_purchase
      },
      "yield_config": {
        annual_yield: this.state.annual_yield
      }
    }

    console.log(data)

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(body => {
      console.log(body)
      this.props.navigation.navigate('Home')
    })
  }

  render() {
    return (
      <View>
        <View style={ styles.textFormBox }>
          <Text style={ styles.text }>現在の資産</Text>
          <TextInputComponent
            value={ this.state.initial_asset }
            onChangeText={(text) => this.handleChangeInitialAsset(text)}
            type='number'
          />
        </View>
        <View style={ styles.textFormBox }>
          <Text style={ styles.text }>月々の積立額</Text>
          <TextInputComponent
            value={ this.state.monthly_purchase }
            onChangeText={(text) => this.handleChangeMonthlyPurchase(text)}
            type='number'
          />
        </View>
        <View style={ styles.textFormBox }>
          <Text style={ styles.text }>期待年利</Text>
          <TextInputComponent
            value={ this.state.annual_yield }
            onChangeText={(text) => this.handleChangeAnnualYield(text)}
            type='number'
          />
        </View>
        <View style={ styles.submitBox }>
        <Button
          title={ '設定する' }
          onPress={() => {this.handlePress(this.state)} }
        />
      </View>
      </View>
    )
  }
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
