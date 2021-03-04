import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

class RetirementAssetConfigScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthly_living_cost: null, // 月々の生活費
      tax_rate: null, // 税引き後レート
      annual_yield: null, // 期待年利
      mouted: true
    }
  }

  handleChangeInitialAsset(text) {
    this.setState({
      monthly_living_cost: text
    });
  };

  handleChangeMonthlyPurchase(text) {
    this.setState({
      tax_rate: text
    });
  };

  handleChangeAnnualYield(text) {
    this.setState({
      annual_yield: text
    });
  };

  getConfig(props) {
    const url = this.props.rootPath + 'retirement_asset_config/new'
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.jwtToken
      }
    }).then(res => res.json())
    .then(body => {
      const asset_config = body.data.attributes
      const newState = {};
      Object.keys(asset_config).forEach(key => {
            newState[key] = asset_config[key];
      });
      this.setState(newState);
    })
  }

  handlePress(props) {
    const url = this.props.rootPath + 'retirement_asset_config'
    const data = {
      "retirement_asset_calc": {
        monthly_living_cost: this.state.monthly_living_cost,
        tax_rate: this.state.tax_rate,
        annual_yield: this.state.annual_yield
      }
    }
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': this.props.jwtToken
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(body => {
      const status = body.data.attributes.status;
      const message = body.data.attributes.message;
      if (status == 'success') {
        alert('設定が完了しました')
        this.props.navigation.navigate('Home')
        this.props.changeConfig()
      } else {
        const errorMessage = []
        Object.keys(message).forEach(key => {
          errorMessage.push(key + ':' + message[key]);
        });
        alert(errorMessage.join('\n'));
      }
    })
  }

  componentDidMount() {
    this.getConfig();
  }

  componentWillUnmount() {
    this.setState({
      mounted: false
    });
  }

  render() {
    return (
      <View>
        <View style={ styles.textFormBox }>
          <Text style={ styles.text }>月々の生活費</Text>
          <TextInputComponent
            value={ this.state.monthly_living_cost }
            onChangeText={(text) => this.handleChangeInitialAsset(text)}
            type='number'
          />
        </View>
        <View style={ styles.textFormBox }>
          <Text style={ styles.text }>税引き後レート(%)</Text>
          <TextInputComponent
            value={ this.state.tax_rate }
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
        <View>
          <Text>※4%ルール適用の場合は税引き後レートを80%、期待年利を5%と入力。</Text>
          <Text> 5% × 80% = 4%</Text>
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

export default RetirementAssetConfigScreen;
