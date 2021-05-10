import React, { useState, useEffect, useContext } from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, ImageBackground, Dimensions, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from '../components/textInputComponent.js';
import { useFocusEffect } from '@react-navigation/native';
import firebase from "firebase/app";
import "firebase/auth";
import * as Linking from 'expo-linking';
import { Buffer } from 'buffer';
import background from '../assets/background_img.jpg'
import { Translations } from '../locale/i18n.js'
import {setJWT, setSignin} from '../components/jwt.js'

function handlePress(input, props) {
  firebase.auth().signInWithEmailAndPassword(input.email, input.password)
  .then((res) => {
    if (res.user.emailVerified) {
      props.setToken()
      firebase.auth().currentUser.getIdToken().then((token) => {
        setJWT(token)
        setSignin()
      })
    } else {
      firebase.auth().currentUser.sendEmailVerification()
      .then(function() {
        alert('メール認証が完了していません。認証メールを再送しましたので、ご確認ください。')
      })
      .catch(function(e) {
        alert('メール認証が完了していません。認証メールの再送に失敗しました。再度ログインを試みてください。')
      })
    }
  })
  .catch((error) => {
    alert(error.message);
  });
}

const TitleLogo = () => (
  <View style={titleStyle.wrapper}>
    <View>
      <Text style={textTitleMain}>F.I.R.E</Text>
    </View>
    <View>
      <Text style={textTitleSub}>Countdown App</Text>
    </View>
  </View>
)

function Footer(props) {
  return (
    <View style={footerStyle.wrapper}>
      <TouchableOpacity style={footerStyle.btn} onPress={() => {props.onPress()}}>
        <Text style={footerStyle.text}>{Translations.t('sign_in.forgot_password')}</Text>
      </TouchableOpacity>
    </View>
  )
}


function UserSigninScreen(props) {
  const [visible, setVisible] = useState(true)

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signinInput = {
    email: email,
    password: password,
  }

  useEffect(() => {
    // store.setJwtToken("eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOjE4LCJpYXQiOjE2MTc0OTUwMTh9.BK8J6efrBhqJ7ts2rPMH0hJrEO-9c4LSY6V-a296YM9aDyEJY8n5dY3XFBP2VTn13zi1IfHuuekazhcLCruTavPwsjOZc2Jaluzl4RRHtaZBt9K8xKmrS2a_8jAxaW4TO6jPValhsoIfHpNZDk-krW3TrYKRtngvBqz7QFiLPoGjKr7MzN0j801OgvwnDe7rRVPPBnPPwQApPwLqp5bt4efxlPf6fEqgQIjnbDDHDymO5VcQXgR9o9kgzC781PLE9kBiHeXbsJM08VbaUSpdDdW4lPUU36L7a5X0g5JNdOdgsfuQ1xo156AUZ1NRQcu9UIvbr_BRIj0YE-KjHg")
    if (props.linkingParams) {
      alert(props.linkingParams.message)
    }
  }, [props.linkingParams])

  useFocusEffect(
    React.useCallback(() => {
      setVisible(true)
    }, [])
  )

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}/>
      {visible ? (
        <>
          <TitleLogo />
          <View style={ formStyle.wrapper }>
            <Text style={ formStyle.text }>{Translations.t('common.email')}</Text>
            <TextInputComponent
              value={ props.email }
              onChangeText={(text) => setEmail(text)}
              type='email'
            />
          </View>
          <View style={ formStyle.wrapper }>
            <Text style={ formStyle.text }>{Translations.t('common.password')}</Text>
            <TextInputComponent
              value={ props.password }
              onChangeText={(text) => setPassword(text)}
              type='password'
            />
          </View>
          <View style={ btnStyle.wrapper }>
            <View>
              <TouchableOpacity
                style={btnYellow}
                onPress={() => {handlePress(signinInput, props)} }
              >
                <Text style={btnStyle.textYellow}>{Translations.t('sign_in.sign_in')}</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={btnStyle.btn}
                onPress={() => {setVisible(false); props.navigation.navigate('UserSignup')}}
              >
                <Text style={btnStyle.text}>{Translations.t('sign_in.sign_up')}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Footer
            onPress={() => {setVisible(false); props.navigation.navigate('ResetPassword')}}
          />
      </>
      ) : (<></>)}
    </View>
  )
}

// StyleSheet
const backgroundImage = require('../assets/background_img.jpg')

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    top: '-35%',
    width: '180%',
    left: '-110%'
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    padding: 40,
    paddingTop: 80,
    alignItems: 'center'
  },
  listner: {
    display: 'none'
  }
})

const titleStyle = StyleSheet.create({
  wrapper: {
    marginTop: 30,
    marginBottom: 20,
    width: 310
  },
  textCommon: {
    color: '#ffffff'
  },
  textMain: {
    fontSize: 120,
    textAlign: 'center'
  },
  textSub: {
    fontSize: 43,
    textAlign: 'center'
  }
})

const textTitleMain = StyleSheet.compose(titleStyle.textMain, titleStyle.textCommon)
const textTitleSub = StyleSheet.compose(titleStyle.textSub, titleStyle.textCommon)

const btnStyle = StyleSheet.create ({
  wrapper: {
    marginTop: 20,
    width: 310,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  btn: {
    marginTop: 20,
    height: 40,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnYellow: {
    borderRadius: 8,
    backgroundColor: '#edb413'
  },
  text: {
    fontSize: 26,
    color: '#555555'
  },
  textYellow: {
    fontSize: 26,
    color: '#ffffff',
  },
})

const btnYellow = StyleSheet.compose(btnStyle.btn, btnStyle.btnYellow)

const formStyle = StyleSheet.create ({
  wrapper: {
    marginVertical: 'auto',
    width: 310,
  },
  text: {
    paddingVertical: 10,
    width: 140,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

const footerStyle = StyleSheet.create({
  wrapper: {
    width: 310,
    position: 'absolute',
    bottom:40,
    alignItems: 'flex-end'
  },
  btn: {
    marginBottom: 14
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default UserSigninScreen;
