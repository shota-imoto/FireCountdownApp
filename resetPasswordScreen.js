import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'
import * as Linking from 'expo-linking';
import Url from 'url-parse';

function handlePress(props) {
  const url = props.rootPath + 'users/password'
  const data = {
    "user": {
      "user_id" : 'user_id',
      "reset_password_token" : "reset_password_token",
      "password" : props.password,
      "password_confirmation" : props.password_confirmation
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

function ResetPasswordScreen (props) {
  // componentDidMount() {
    // alert(this.props.linkingUrl)
    // if (this.props.linkingUrl == null) {return}
    // if (this.props.linkingUrl.hostname == 'reset_password') {
    //   this.handleLinkResetPassword()
    // }
  // }

  return (
    <View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>新しいパスワード</Text>
        <TextInputComponent
          value={ props.password }
          onChangeText={(text) => props.onChangePassword(text)}
          type='password'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>新しいパスワード(確認用)</Text>
        <TextInputComponent
          value={ props.password_confirmation }
          onChangeText={(text) => props.onChangePasswordConfirmation(text)}
          type='password_confirmation'
        />
      </View>
      <View style={ styles.submitBox }>
        <Button
          title={ '変更する' }
          onPress={() => {handlePress(props)} }
        />
      </View>
    </View>
  )
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
