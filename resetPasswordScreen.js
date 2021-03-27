import React, {useState} from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from './components/textInputComponent.js';
import firebase from "firebase/app";
import "firebase/auth";

function handlePress(props, rootPath, navigation) {
  console.log(props)
  console.log(rootPath)
  const url = rootPath + 'users/sign_up'
  const data = {
    "user": {
      "email" : props.email,
    }
  }

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

function ResetPasswordScreen(props) {
  const [email, setEmail] = useState(null)

  const signupInput = {
    email: email,
  }

  return (
    <View style={ styles.wrapper }>
      <View style={ textStyle.wrapper }>
        <View style={ textStyle.labelBlock }>
          <Text style={ textStyle.label }>メールアドレス</Text>
        </View>
        <TextInputComponent
          value={ props.email }
          onChangeText={(text) => setEmail(text)}
          type='email'
        />
      </View>
      <View style={ btnStyle.wrapper }>
        <TouchableOpacity style={ btnStyle.btn } onPress={() => {handlePress(signupInput, props.rootPath, props.navigation)} }>
          <Text style={ btnStyle.text }>登録</Text>
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default ResetPasswordScreen;
