import React from 'react';
import { SafeAreaView, View, StyleSheet, Text, Button } from 'react-native';

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Content = ({resttime}) => (
  <View style={styles.content}>
    <Text style={styles.mainMessage}>リタイアまで{resttime}年</Text>
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
      <HeaderMenu onPress={() => {props.onPress()}} />
    </View>
  )
};

const ItemList = () => (
  <View>
    <Item title='メイン設定' />
    <Item title='期待年利' />
    <Item title='リタイア額計算' />
  </View>
)

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
    const url = "http://"+ this.props.rootPath +"/api/v1"
    fetch(url)
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

  componentWillUnmount() {
    this.setState({
      mounted: false
    });
  }

  render() {
    return (
      <SafeAreaView>
        <Header
          onPress={() => {this.props.navigation.navigate('UserSignup')}}
          username={this.state.username}
        />
        <Content
          resttime={this.state.resttime}
        />
        <ItemList />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
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
  },
  title: {
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
