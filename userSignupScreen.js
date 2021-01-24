import React from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';


class TextInputComponent extends React.Component {
  // onChangeTextで変更する値をemail, passwordなど使い回せる？

  render() {
    var autoCompleteType, textContent;
    var secureTextEntry = false;

    switch (this.props.type) {
      case 'email':
        autoCompleteType = 'email';
        textContent = 'emailAddress';
        break;
      case 'password':
      case 'password_confirmation':
        autoCompleteType = 'password';
        textContent = 'password';
        secureTextEntry = true;
        break;
      case 'nickname':
        autoCompleteType = 'username';
        textContent = 'name';
    }

    return (
      <TextInput
        style={ styles.textForm }
        value={ this.props.value }
        onChangeText={ text => this.props.onChangeText(text) }
        autoCapitalize={ 'none' }
        autoCompleteType={ autoCompleteType }
        textContentType={ textContent }
        secureTextEntry={ secureTextEntry }
      />
    )
  }
}

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
      email: null,
      password: null,
      password_confirmation: null
    }
  }

  handleChangeNickname(text) {
    this.setState({
      nickname: text
    });
  };

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

  handleChangePasswordConfirmation(text) {
    this.setState({
      password_confirmation: text
    });
  }

  handlePress() {
    console.log('ok')
  }


  render() {
  return (
    <View>
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>ニックネーム</Text>
        <TextInputComponent
          value={ this.state.nickname }
          onChangeText={(text) => this.handleChangeNickname(text)}
          type='nickname'
        />
      </View>
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
      <View style={ styles.textFormBox }>
        <Text style={ styles.text }>パスワード(確認用)</Text>
        <TextInputComponent
          value={ this.state.password_confirmation }
          onChangeText={(text) => this.handleChangePasswordConfirmation(text)}
          type='password_confirmation'
        />
      </View>
      <View style={ styles.submitBox }>
        <Button
          title={ '登録する' }
          onPress={ this.handlePress }
        />
      </View>
    </View>
  )
  }
}

class UserSignupScreen extends React.Component {
  constructor(props) {
    super(props);
  };

  render() {
    return (
      <View style={ styles.wrapper }>
        <Forms />
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
  textForm: {
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
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
