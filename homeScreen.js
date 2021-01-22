import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, Button } from 'react-native';
import Signup from './App.js'
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'メイン設定',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: '期待年利',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'リタイア額計算',
  },
];

const HEADER = [
  {
    title: 'ユーザ登録',
  },
  {
    title: 'ログイン',
  }
]

const Item = ({ title }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const Content = () => (
  <View style={styles.content}>
    <Text style={styles.mainMessage}>リタイアまでX年</Text>
  </View>
);

const HeaderMenuItem = ({data}) => (
  <View style={styles.headerMenuItem}>
    <Text>{data.title}</Text>
  </View>
);

function HeaderMenu(props) {
  const renderHeaderItem = ({item}) => (
    <HeaderMenuItem data={item} />
  );

  return (
    <View style={styles.headerMenu}>
      <Button
        title="ユーザー登録"
        onPress={props.onPress}
      />
      <Button
        title ="ログイン"
      />
    </View>
  )
};

const UserName = () => (
  <View style={styles.userName}>
    <Text style={styles.userNameText}>Shota</Text>
  </View>
);

function Header(props) {
  return (
    <View>
      <UserName />
      <HeaderMenu onPress={props.onPress}/>
    </View>
  )
};

// const renderItem = ({item}) => (
//   <Item title={item.setting} />
// );

const ItemList = () => (
  <View>
    <Item title='メイン設定' />
    <Item title='期待年利' />
    <Item title='リタイア額計算' />
  </View>
)

function HomeScreen ({navigation}) {
    return (
      <SafeAreaView>
      <Header onPress={({onPress}) => navigation.navigate('UserSignup')}/>
      <Content/>
      <ItemList />
    </SafeAreaView>
    )
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
