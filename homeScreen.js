import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from './components/modal.js'
import SigninForm from './views/SigninForm.js'

function Item(props) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => {props.onPress()}}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
};

const Content = ({resttime}) => (
  <View style={styles.content}>
    <Text style={styles.mainMessage}>{resttime}年</Text>
  </View>
);

function HeaderMenu(props) {
  return (
    <View style={styles.headerMenu}>
      <Button
        title="ユーザー登録"
        onPress={() => {props.onPress()}}
      />
      <Button
        title ="ログイン"
        onPress={() => {props.onSignin()}}
      />
    </View>
  );
};

const UserName = ({username}) => (
  <Text style={styles.userNameText}>{username}</Text>
);

function Header(props) {
  return (
    <View>
      <UserName username={props.username} />
      <HeaderMenu
        onPress={() => {props.onPress()}}
        onSignin={() => {props.onSignin()}}
      />
    </View>
  )
};

function ItemList(props) {
  return (
    <View>
      <Item title='メイン設定' onPress={() => {props.onPressConfig()}} />
      <Item title='リタイア額計算' onPress={() => {props.onPressRetirementAssetConfig()}}/>
    </View>
  )
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      resttime: null,
      mounted: true
    };
  }

  componentDidMount() {
    this.fetchData()
  }

  componentWillUnmount() {
    this.setState({
      mounted: false
    });
  }

  fetchData() {
    const url = this.props.rootPath
    fetch(url, {
      headers: {
        'Authorization': 'Token ' + this.props.jwtToken
      }
    })
    .then(res => res.json())
    .then((result) => {
      if (this.state.mounted) {
        this.setState({
          resttime: result.data.attributes.asset_years,
          username: result.included[0].attributes.nickname
        });
      };
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Header
          onPress={() => {this.props.navigation.navigate('UserSignup')}}
          onSignin={() => {this.refs.modal.toggleVisible()}}
          username={this.state.username}
        />
        <Content
          resttime={this.state.resttime}
        />
        <ItemList
          onPressConfig={() => {this.props.navigation.navigate('Config')}}
          onPressRetirementAssetConfig={() => {this.props.navigation.navigate('RetirementAssetConfig')}}
        />
        <Modal
          ref='modal'
          content={
            <SigninForm
              rootPath={this.props.rootPath}
              setToken={(token) => {this.props.setToken(token)}}
              toggleVisible={() => {this.refs.modal.toggleVisible()}}
              fetchData={() => {this.fetchData()}}
            />
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
  },
  headerMenu: {
    flexDirection: 'row',
  },
  headerMenuItem: {
    flex: 1,
    flexDirection: 'row',
    marginVertical: 4,
    marginHorizontal: 12
  },
  userName: {
    marginHorizontal: 10
  },
  userNameText: {
    fontWeight: 'bold',
    fontSize: 20
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    color: '#ffffff',
    fontSize: 32,
  },
  content: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  mainMessage: {
    fontSize: 42
  },
  basicFlex: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default HomeScreen;
