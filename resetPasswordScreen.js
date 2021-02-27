import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

class ResetPasswordScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: null,
      password_confirmation: null,
      rootPath: this.props.rootPath
    }
  }

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

  handlePress(props) {
    const url = props.rootPath + 'users/password'
    const data = {
      "user": {
        "user_id" : 'user_id',
        "reset_password_token" : "reset_password_token",
        "password" : this.state.password,
        "password_confirmation" : this.state.password_confirmation
      }
    }
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
    }).then(res => res.json())
    .then(result => {
      alert('reset_password!!')
    })
  }

  render() {
    return (
      <View>
        <View style={ styles.textFormBox }>
          <Text style={ styles.text }>新しいパスワード</Text>
          <TextInputComponent
            value={ this.state.password }
            onChangeText={(text) => this.handleChangePassword(text)}
            type='password'
          />
        </View>
        <View style={ styles.textFormBox }>
          <Text style={ styles.text }>新しいパスワード(確認用)</Text>
          <TextInputComponent
            value={ this.state.password_confirmation }
            onChangeText={(text) => this.handleChangePasswordConfirmation(text)}
            type='password_confirmation'
          />
        </View>
        <View style={ styles.submitBox }>
          <Button
            title={ '登録する' }
            onPress={() => {this.handlePress(this.state)} }
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper:{
    alignItems: 'center',
    justifyContent: 'flex-start'
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

export default ResetPasswordScreen;
