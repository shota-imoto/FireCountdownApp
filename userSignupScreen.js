import React from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';

class Forms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: ''
    }
    this.handleChangeEmail = this.handleChangeEmail.bind(this)
    this.handleChangePassword = this.handleChangePassword.bind(this)
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
      <TextInput
        style={ styles.textForm }
        value={ this.state.email }
        onChangeText={ text => this.handleChangeEmail(text) }
        autoCapitalize={ 'none' }
        autoCompleteType={ 'email' }
        textContentType={ 'emailAddress' }
      />
      <TextInput
        style={ styles.textForm }
        value={ this.state.password }
        onChangeText={ text => this.handleChangePassword(text) }
        autoCapitalize={ 'none' }
        autoCompleteType={ 'password' }
        secureTextEntry={ true }
        textContentType={ 'password' }
        clearTextOnFocus={ false }

      />
      <TextInput
        style={ styles.textForm }
        value={ this.state.password_confirmation }
        onChangeText={ text => this.handleChangePasswordConfirmation(text) }
        autoCapitalize={ 'none' }
        autoCompleteType={ 'password' }
        secureTextEntry={ true }
        textContentType={ 'password' }
      />
      <Button
        title={ '登録する' }
        onPress={ this.handlePress }
      />
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>User Signup Screen</Text>
        <Forms />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textForm: {
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  }
})

export default UserSignupScreen;
