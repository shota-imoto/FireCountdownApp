import React from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';
import TextInputComponent from './components/textInputComponent.js'

function handlePress(props) {
  const url = props.rootPath + 'users/sign_up'
  const data = {
    "user": {
      "nickname" : props.nickname,
      "email" : props.email,
      "password" : props.password,
      "password_confirmation" : props.password_confirmation
    }
  }

  console.log(url)
  console.log(data)
  const errorMessage = (props) =>  "通信エラー しばらくお待ちいただき、再度お試しください (何度か試してもうまく行かない場合は次のエラーメッセージを管理者に連絡ください) <エラーメッセージ> " + props
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  }).then(res => res.json())
  .then(result => {
    const status = result.data.attributes.status;
    const message = result.data.attributes.message;
    if (status == 'success') {
      // alert('ユーザー本登録用のメールを送信しました。しばらく経っても届かない場合は再度お試しください')
      alert('ユーザー登録が完了しました')
      this.props.navigation.navigate('Home')
    } else if (status == 'error') {
      const errorMessage = []
      Object.keys(message).forEach(key => {
        errorMessage.push(key + ':' + message[key]);
      });
      alert(errorMessage.join('\n'))
      // TODO: アラートの順番変更、日本語化
    }
  })
  .catch(error => {alert(errorMessage(error))})
}

function Forms(props) {
  return (
    <View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>ニックネーム</Text>
        <TextInputComponent
          value={ props.nickname }
          onChangeText={(text) => props.onChangeNickname(text)}
          type='nickname'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>メールアドレス</Text>
        <TextInputComponent
          value={ props.email }
          onChangeText={(text) => props.onChangeEmail(text)}
          type='email'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>パスワード</Text>
        <TextInputComponent
          value={ props.password }
          onChangeText={(text) => props.onChangePassword(text)}
          type='password'
        />
      </View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>パスワード(確認用)</Text>
        <TextInputComponent
          value={ props.password_confirmation }
          onChangeText={(text) => props.onChangePasswordConfirmation(text)}
          type='password_confirmation'
        />
      </View>
      <View style={ styles.submitBox }>
        <Button
          title={ '登録する' }
          onPress={() => {handlePress(props)} }
        />
      </View>
    </View>
  )
}

class UserSignupScreen extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={ styles.wrapper }>
        <Forms {...this.props} navigation={this.props.navigation} onChangeNickname={(text) => {this.props.onChangeNickname(text)}} onChangeEmail={(text) => {this.props.onChangeEmail(text)}} onChangePassword={(text) => {this.props.onChangePassword(text)}} onChangePasswordConfirmation={(text) => {this.props.onChangePasswordConfirmation(text)}}/>
      </View>
    );
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

export default UserSignupScreen;
