import React from 'react';
import { SafeAreaView, View, Button, StyleSheet, Text, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from './components/textInputComponent.js';

const TitleLogo = () => (
  <View style={styles.titleWrapper}>
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
    const errorMessage = (props) => "通信エラー しばらくお待ちいただき、再度お試しください (何度か試してもうまく行かない場合は次のエラーメッセージを管理者に連絡ください) <エラーメッセージ> " + props

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(res => {
      const token = res.headers.map["x-authentication-token"];
      this.props.setToken(token);
      return res.json()
    }).then(body => {
      const status = body.data.attributes.status;
      const message = body.data.attributes.message;
      if (status == 'success') {
        alert('ログインしました')
        this.props.toggleVisible();
        this.props.fetchData();
      } else if (status == 'error') {
        alert(message)
        // TODO: アラートの順番変更、日本語化
      }
    })
  }


  render() {
    const backgroundImage = require('./assets/background_img.jpg')

    return (
        <View style={styles.wrapper}>
          <ImageBackground source={backgroundImage} style={styles.backgroundImage}/>
          <TitleLogo />
          <View style={ styles.formWrapper }>
            <Text style={ styles.formText }>メールアドレス</Text>
            <TextInputComponent
              value={ this.state.email }
              onChangeText={(text) => this.handleChangeEmail(text)}
              type='email'
            />
          </View>
          <View style={ styles.formWrapper }>
            <Text style={ styles.formText }>パスワード</Text>
            <TextInputComponent
              value={ this.state.password }
              onChangeText={(text) => this.handleChangePassword(text)}
              type='password'
            />
          </View>
          <View style={ styles.buttonWrapper }>
            <View>
              <TouchableOpacity
                style={buttonYellow}
                onPress={() => {this.handlePress(this.props)} }
              >
                <Text style={styles.buttonYellowText}>ログイン</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {this.props.navigation.navigate('UserSignup')}}
              >
                <Text style={styles.buttonText}>新規登録</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
    )
  }
}

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
  titleWrapper: {
    marginTop: 30,
    marginBottom: 20,
    width: 310
  },
  textTitleCommon: {
    fontFamily: 'Fira Sans',
    color: '#ffffff'
  },
  textTitleMain: {
    fontSize: 120,
    textAlign: 'center'
  },
  textTitleSub: {
    fontSize: 43,
    textAlign: 'center'
  },
  formWrapper: {
    marginVertical: 'auto',
    width: 310,
  },
  formText: {
    paddingVertical: 10,
    width: 140,
    textAlign: 'left',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  buttonWrapper: {
    marginTop: 20,
    width: 310,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    marginTop: 20,
    height: 40,
    width: 140,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonYellow: {
    borderRadius: 8,
    backgroundColor: '#edb413'
  },
  buttonText: {
    fontSize: 26,
    color: '#555555'
  },
  buttonYellowText: {
    fontSize: 26,
    color: '#ffffff',
  },
})

const textTitleMain = StyleSheet.compose(styles.textTitleMain, styles.textTitleCommon)
const textTitleSub = StyleSheet.compose(styles.textTitleSub, styles.textTitleCommon)
const buttonYellow = StyleSheet.compose(styles.button, styles.buttonYellow)
export default UserSigninScreen;
