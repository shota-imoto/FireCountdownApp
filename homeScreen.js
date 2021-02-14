import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

function Item(props) {
  return (
    <TouchableOpacity style={styles.item} onPress={() => {props.onPress()}}>
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
};

// TODO: リファクタリング
function Content(props) {
  if (props.jwtToken) {
    if (props.rest_years) {
      return (
        <View style={styles.content}>
          <Text style={styles.mainMessage}>{props.rest_years}年 {props.rest_months}ヶ月後にリタイア</Text>
        </View>
      )
    } else if (props.unset_configs) {
      const array = props.unset_configs
      return (
        <View>
          <Text>{props.unset_configs.join("、 ")}が未設定です。</Text>
        </View>
      )
    } else {
      return(
        <View>
          <Text></Text>
        </View>
      )
    }
  } else {
    return (
      <View>
        <Text>ようこそ！まずはユーザー登録から始めましょう！！</Text>
      </View>
    )
  }
};


const UserName = ({username}) => (
  <Text style={styles.userNameText}>{username}さん、こんにちは！</Text>
);

function Header(props) {
  return (
    <View>
      <UserName username={props.username}></UserName>
      <View style={styles.headerMenu}>
        <Button
          title ="ログアウト"
          onPress={() => {props.onSignout()}}
        />
      </View>
    </View>
  );
};

function ItemList(props) {
  if (props.jwtToken) {
    return (
      <View>
        <Item title='メイン設定' onPress={() => {props.onPressConfig()}} />
        <Item title='リタイア額計算' onPress={() => {props.onPressRetirementAssetConfig()}}/>
      </View>
    )
  } else {
    return (
      <View>
      </View>
    )
  }
}

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      rest_years: null,
      rest_months: null,
      unset_config: null,
      mounted: true
    };
  }


  componentDidMount() {
    // home画面の初期表示。↓単体だと、コード更新後のリフレッシュで呼ばれない
    if (this.props.jwtToken) {
      this.fetchData()
    } else {
      this.props.navigation.navigate('UserSignin')
    }

    // home画面のリレンダリング時
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      if (this.props.jwtToken) {this.fetchData()}
    });
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
        const messages = result.data.attributes.messages
        const unset_configs = Object.keys(messages)

        if (!unset_configs.length) {
          this.setState({
            rest_years: result.data.attributes.asset_years,
            rest_months: result.data.attributes.asset_months,
            username: result.included[0].attributes.nickname,
            messages: null
          });
        } else {
          this.setState({
            rest_years: null,
            rest_months: null,
            username: result.included[0].attributes.nickname,
            unset_configs: unset_configs
          })
        }
      };
    });
  }



  render() {
    return (
      <SafeAreaView style={styles.screen}>
        <Header
          onSignout={() => {this.props.onSignout()}}
          username={this.state.username}
        />
        <Content
          jwtToken={this.props.jwtToken}
          {...this.state}
        />
        <ItemList
          onPressConfig={() => {this.props.navigation.navigate('Config')}}
          onPressRetirementAssetConfig={() => {this.props.navigation.navigate('RetirementAssetConfig')}}
          jwtToken={this.props.jwtToken}
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
