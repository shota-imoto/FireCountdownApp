import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import TextInputComponent from '../components/textInputComponent.js'

class SigninForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    }
  }

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

  handlePress(props) {
    alert('Implement signin function!')
  }

  render() {
    return (
        <View>
          <View style={ styles.textFormBox }>
            <Text style={ styles.text }>メールアドレス</Text>
            <TextInputComponent
              value={ this.state.email }
              onChangeText={(text) => this.handleChangeEmail(text)}
              type='email'
            />
          </View>
          <View style={ styles.textFormBox }>
            <Text style={ styles.text }>パスワード</Text>
            <TextInputComponent
              value={ this.state.password }
              onChangeText={(text) => this.handleChangePassword(text)}
              type='password'
            />
          </View>
          <View style={ styles.submitBox }>
            <Button
              title={ 'ログイン' }
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
    paddingVertical: 10,
    textAlign: 'left'
  },
  textFormBox: {
    margin: 10,
    alignItems: 'flex-start'
  },
  submitBox: {
    alignItems: 'center'
  }
})

export default SigninForm;
