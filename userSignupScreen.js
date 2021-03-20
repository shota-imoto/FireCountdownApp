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
      "nickname" : props.nickname,
      "email" : props.email,
      "password" : props.password,
      "password_confirmation" : props.password_confirmation
    }
  }

  firebase.auth().createUserWithEmailAndPassword(props.email, props.password)
  .then((user) => {
    console.log(user)
  }).catch((error) => {
    console.log(error.code);
    console.log(error.message);
  })

  // const errorMessage = (props) =>  "通信エラー しばらくお待ちいただき、再度お試しください (何度か試してもうまく行かない場合は次のエラーメッセージを管理者に連絡ください) <エラーメッセージ> " + props
  // fetch(url, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data),
  // }).then(res => res.json())
  // .then(result => {
  //   const status = result.data.attributes.status;
  //   const message = result.data.attributes.message;
  //   if (status == 'success') {
  //     // props.onClearInput()
  //     navigation.navigate('UserSignin')
  //     // alert('ユーザー本登録用のメールを送信しました。しばらく経っても届かない場合は再度お試しください')
  //     alert('ユーザー登録が完了しました')
  //   } else if (status == 'error') {
  //     const errorMessage = []
  //     Object.keys(message).forEach(key => {
  //       errorMessage.push(key + ':' + message[key]);
  //     });
  //     alert(errorMessage.join('\n'))
  //     // TODO: アラートの順番変更、日本語化
  //   }
  // })
  // .catch(error => {alert(errorMessage(error))})
}

function UserSignupScreen(props) {
  const [nickname, setNickname] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [password_confirmation, setPasswordConfirmation] = useState(null)

  const signupInput = {
    nickname: nickname,
    email: email,
    password: password,
    password_confirmation: password_confirmation
  }

  return (
    <View style={ styles.wrapper }>
      <View style={ textStyle.wrapper }>
        <View style={ textStyle.labelBlock }>
          <Text style={ textStyle.label }>ニックネーム</Text>
        </View>
        <TextInputComponent
          value={ props.nickname }
          onChangeText={(text) => setNickname(text)}
          type='nickname'
        />
      </View>
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
      <View style={ textStyle.wrapper }>
        <View style={ textStyle.labelBlock }>
          <Text style={ textStyle.label }>パスワード</Text>
        </View>
        <TextInputComponent
          value={ props.password }
          onChangeText={(text) => setPassword(text)}
          type='password'
        />
      </View>
      <View style={ textStyle.wrapper }>
        <View style={ textStyle.labelBlock }>
          <Text style={ textStyle.label }>パスワード(確認用)</Text>
        </View>
        <TextInputComponent
          value={ props.password_confirmation }
          onChangeText={(text) => setPasswordConfirmation(text)}
          type='password_confirmation'
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

export default UserSignupScreen;
