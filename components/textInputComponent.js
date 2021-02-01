import React from 'react';
import { StyleSheet } from 'react-native';
import { TextInput } from "react-native-gesture-handler";

class TextInputComponent extends React.Component {
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
        break;
      case 'number':

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

const styles = StyleSheet.create({

  textForm: {
    height: 30,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1
  },
})

export default TextInputComponent;
