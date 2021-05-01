import React, {useState} from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from '../components/textInputComponent.js';
import firebase from "firebase/app";
import "firebase/auth";
import { Translations } from '../locale/i18n.js'

function handlePress(props, rootPath, navigation) {
  if (props.password != props.password_confirmation) {
    alert('password is not correspond with password confirmation')
    return
  }

  firebase.auth().createUserWithEmailAndPassword(props.email, props.password)
  .then((user) => {
    firebase.auth().currentUser.sendEmailVerification()
    .then(() => {
      alert('verify email was sent. Open URL in email and complete sign up.')
      navigation.navigate('UserSignin')
})
  }).catch((error) => {
    alert(error.message);
  })
}

function UserSignupScreen(props) {
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [password_confirmation, setPasswordConfirmation] = useState(null)

  const signupInput = {
    email: email,
    password: password,
    password_confirmation: password_confirmation
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
      <View style={ textStyle.wrapper }>
        <View style={ textStyle.labelBlock }>
          <Text style={ textStyle.label }>{Translations.t('common.password')}</Text>
        </View>
        <TextInputComponent
          value={ props.password }
          onChangeText={(text) => setPassword(text)}
          type='password'
        />
      </View>
      <View style={ textStyle.wrapper }>
        <View style={ textStyle.labelBlock }>
          <Text style={ textStyle.label }>{Translations.t('sign_up.password_confirmation')}</Text>
        </View>
        <TextInputComponent
          value={ props.password_confirmation }
          onChangeText={(text) => setPasswordConfirmation(text)}
          type='password_confirmation'
        />
      </View>
      <View style={ btnStyle.wrapper }>
        <TouchableOpacity style={ btnStyle.btn } onPress={() => {handlePress(signupInput, props.rootPath, props.navigation)} }>
          <Text style={ btnStyle.text }>{Translations.t('sign_up.sign_up')}</Text>
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

export default UserSignupScreen;
