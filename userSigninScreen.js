import React from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from './components/textInputComponent.js';

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

class UserSigninScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    }
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

  handlePress(props) {
    const url = props.rootPath + 'users/sign_in'
    const data = {
      "user": {
        "email" : this.state.email,
        "password" : this.state.password
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
      if (token) {this.props.setToken(token)}
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

  render() {
    return (
        <View style={styles.wrapper}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}/>
          <TitleLogo />
          <View style={ formStyle.wrapper }>
            <Text style={ formStyle.text }>メールアドレス</Text>
            <TextInputComponent
              value={ this.state.email }
              onChangeText={(text) => this.handleChangeEmail(text)}
              type='email'
            />
          </View>
          <View style={ formStyle.wrapper }>
            <Text style={ formStyle.text }>パスワード</Text>
            <TextInputComponent
              value={ this.state.password }
              onChangeText={(text) => this.handleChangePassword(text)}
              type='password'
            />
          </View>
          <View style={ btnStyle.wrapper }>
            <View>
              <TouchableOpacity
                style={btnYellow}
                onPress={() => {this.handlePress(this.props)} }
              >
                <Text style={btnStyle.textYellow}>ログイン</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={btnStyle.btn}
                onPress={() => {this.props.navigation.navigate('UserSignup')}}
              >
                <Text style={btnStyle.text}>新規登録</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
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
