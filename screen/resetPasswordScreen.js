import React, {useState} from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from '../components/textInputComponent.js';
import firebase from "firebase/app";
import "firebase/auth";
import { Translations } from '../locale/i18n.js'

function handlePress(props, rootPath, navigation) {
  // TODO: リッチなパスワード変更画面の提供
  firebase.auth().sendPasswordResetEmail(props.email)
  .then(function() {
    alert('Password reset email had sent.Click URL and Input password in the email.')
    navigation.navigate('UserSignin')
  })
  .catch(function(error) {
    alert(error.message)
  });
}

function ResetPasswordScreen(props) {
  const [email, setEmail] = useState(null)

  const signupInput = {
    email: email,
  }

  return (
    <View style={ styles.wrapper }>
      <View style={ textStyle.wrapper }>
        <View style={ textStyle.labelBlock }>
          <Text style={ textStyle.label }>{Translations.t('common.email')}</Text>
        </View>
        <TextInputComponent
          value={ props.email }
          onChangeText={(text) => setEmail(text)}
          type='email'
        />
      </View>
      <View style={ btnStyle.wrapper }>
        <TouchableOpacity style={ btnStyle.btn } onPress={() => {handlePress(signupInput, props.rootPath, props.navigation)} }>
          <Text style={ btnStyle.text }>{Translations.t('common.submit')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    paddingTop: 150,
    paddingHorizontal: 40,
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
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

const textStyle = StyleSheet.create({
  wrapper: {

  },
  labelBlock: {
    marginTop: 25,
    marginBottom: 15
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

const btnStyle = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    width: 310,
    alignItems: 'flex-start'
  },
  btn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 40,
    width: 80,
    backgroundColor: '#EDB413',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default ResetPasswordScreen;
