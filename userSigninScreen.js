import React, { useEffect } from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from './components/textInputComponent.js';
import * as Linking from 'expo-linking';
import Url from 'url-parse';
import { Buffer } from 'buffer';

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

function handleLinkSignUp() {
  // alert('url')
  // alert(url)
  // alert('url.query')
  // alert(url.query)
  // const urlobj = new Url(url)
  // alert('urlobj')
  // alert(urlobj.query)



  // FIXME: アプリが起動されていない状態で本登録をタップしたときに、イベントリスナーが機能しない不具合
  // const query = this.props.linkingQuery.slice(1).split('&')
  // alert('1')

  // const queryObject = query.reduce((result, val, i) => {
  //   const index = val.indexOf('=')
  //   const key = val.slice(0, index)
  //   result[key] = val.slice(index + 1)
  //   return result
  // }, {})
  // alert('2')

  // alert(queryObject.message)
}

function handlePress(props) {
  const url = props.rootPath + 'users/sign_in'
  const data = {
    "user": {
      "email" : props.email,
      "password" : props.password
    }
  }
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => {
    const token = res.headers.map["x-authentication-token"];
    if (token) {props.setToken(token)}
    return res.json()
  }).then(body => {
    const status = body.data.attributes.status;
    const message = body.data.attributes.message;
    if (status == 'success') {
      alert('ログインしました')
    } else if (status == 'error') {
      alert(message)
    }
  })
}

function UserSigninScreen(props) {

  useEffect(() => {

    alert(props.linkingParams.message)
    }
  }, [props.linkingParams])

  return (
    <View style={styles.wrapper}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}/>
      <TitleLogo />
      <View style={ formStyle.wrapper }>
        <Text style={ formStyle.text }>メールアドレス</Text>
        <TextInputComponent
          value={ props.email }
          onChangeText={(text) => props.onChangeEmail(text)}
          type='email'
        />
      </View>
      <View style={ formStyle.wrapper }>
        <Text style={ formStyle.text }>パスワード</Text>
        <TextInputComponent
          value={ props.password }
          onChangeText={(text) => props.onChangePassword(text)}
          type='password'
        />
      </View>
      <View style={ btnStyle.wrapper }>
        <View>
          <TouchableOpacity
            style={btnYellow}
            onPress={() => {handlePress(props)} }
          >
            <Text style={btnStyle.textYellow}>ログイン</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={btnStyle.btn}
            onPress={() => {props.navigation.navigate('UserSignup')}}
          >
            <Text style={btnStyle.text}>新規登録</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

// StyleSheet

const backgroundImage = require('./assets/background_img.jpg')

const styles = StyleSheet.create({
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    top: -270,
    left: -340,
    width: 1100
  },
  wrapper: {
    ...StyleSheet.absoluteFillObject,
    padding: 40,
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

export default UserSigninScreen;
