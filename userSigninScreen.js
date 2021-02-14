import React from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

class UserSigninScreen extends React.Component {
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
    const url = props.rootPath + 'users/sign_in'
    const data = {
      "user": {
        "email" : this.state.email,
        "password" : this.state.password
      }
    }
    const errorMessage = (props) => "通信エラー しばらくお待ちいただき、再度お試しください (何度か試してもうまく行かない場合は次のエラーメッセージを管理者に連絡ください) <エラーメッセージ> " + props

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      const token = res.headers.map["x-authentication-token"];
      this.props.setToken(token);
      return res.json()
    }).then(body => {
      const status = body.data.attributes.status;
      const message = body.data.attributes.message;
      if (status == 'success') {
        alert('ログインしました')
        this.props.toggleVisible();
        this.props.fetchData();
      } else if (status == 'error') {
        alert(message)
        // TODO: アラートの順番変更、日本語化
      }
    })
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
              onPress={() => {this.handlePress(this.props)} }
            />
          </View>
          <View>
            <Button
              title="ユーザー登録"
              onPress={() => {this.props.navigation.navigate('UserSignup')}}
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

export default UserSigninScreen;
