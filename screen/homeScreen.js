import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import { Translations } from '../locale/i18n';
import { getJWT, getToken } from '../components/jwt.js'
import firebase from 'firebase';
import { FontAwesome5 } from '@expo/vector-icons';

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

const Header = () => {
  return(
    <View><TitleLogo/></View>
  )
};

const restYears = (years) => (years != null ? years : '??')

const restMonths = (months) => (months != null ? months :'?')

const restDays = (days) => (days ? days :'??')

function NoticeNoConfig(props) {
  if (props.unset_configs.length) {
    return (
      <View style={unsetConfigStyle.wrapper}>
        <View style={unsetConfigStyle.text}><Text style={unsetConfigStyle.text}>未設定の項目があります</Text></View>
        <View><Text style={unsetConfigStyle.text}>({props.unset_configs.join("、 ")})</Text></View>
      </View>
    )
  } else {
    return (
      <View style={unsetConfigStyle.wrapper}></View>
    )
  }
}

function RestYear(props) {
  return (
    <View style={contentStyle.numberBlock}>
      <Text style={contentStyle.countdownNumber}>{restYears(props.restYears)}</Text>
    </View>
  )
}

function RestMonth(props) {
  return (
    <View style={contentStyle.numberBlock}>
      <Text style={contentStyle.countdownNumber}>{restMonths(props.restMonths)}</Text>
    </View>
  )
}


function Unit(props) {
  return (
    <View style={contentStyle.unitBlock}>
      <Text style={contentStyle.countdownUnit}>{props.unitName}</Text>
    </View>
  )
}

function RestPeriod(props) {
  const rest_years = Math.floor(props.days / 365)
  const rest_months = Math.floor(props.days % 365 / 30)

  return (
    <View>
      <Text style={contentStyle.countdownMessage}>{Translations.t('home.rest_time.until_retire')}</Text>
      <View style={contentStyle.countdownDate}>
        <View style={contentStyle.numberBlock}>
          <Text style={contentStyle.countdownNumber}>{restYears(rest_years)}</Text>
        </View>
        <Unit unitName={Translations.t('home.rest_time.rest_years')}/>
        <View style={contentStyle.numberBlock}>
          <Text style={contentStyle.countdownNumber}>{restMonths(rest_months)}</Text>
        </View>
        <Unit unitName={Translations.t('home.rest_time.rest_months')}/>
      </View>
    </View>
  )
}

function RestDay(props) {
  return (
    <View>
      <Text style={contentStyle.countdownMessage}>{Translations.t('home.rest_time.until_retire')}</Text>
      <View style={contentStyle.countdownDate}>
        <View style={contentStyle.numberBlock}>
          <Text style={contentStyle.countdownNumber}>{restDays(props.days)}</Text>
        </View>
        <Unit unitName={Translations.t('home.rest_time.rest_days')}/>
      </View>
    </View>
  )
}

function RetirementDate(props) {
  return (
    <View>
      <Text style={contentStyle.countdownMessage}>{Translations.t('home.retire_date.you_will_retire')}</Text>
      <View style={contentStyle.countdownDate}>
        <Text style={contentStyle.retireDate}>{props.retire_date}</Text>
      </View>
    </View>
  )
}

function ChangeDisplayButton(props) {
  return (
    <View style={contentStyle.changeBtnWrapper}>
      <TouchableOpacity style={contentStyle.changeBtn} onPress={() => {props.changeDisplayMode()}}>
        <FontAwesome5 name="exchange-alt" style={contentStyle.changeBtnIcon}/>
        <Text style={contentStyle.changeBtnText}>mode</Text>
      </TouchableOpacity>
    </View>
  )
}

function DisplayControler(props) {
  const modeArray = [0, 1, 2]
  const nextMode = (modeArray.indexOf(props.displayMode) == modeArray.length - 1) ? modeArray[0] : props.displayMode + 1

  switch (props.displayMode) {
    case 0: return (
      <View>
        <View style={contentStyle.mainWrapper}>
          <RestDay days={props.rest_days} />
        </View>
        <ChangeDisplayButton changeDisplayMode={() => {props.setDisplayMode(nextMode)}}/>
      </View>
    )
    case 1: return (
      <View>
        <View style={contentStyle.mainWrapper}>
          <RestPeriod days={props.rest_days}/>
        </View>
        <ChangeDisplayButton changeDisplayMode={() => {props.setDisplayMode(nextMode)}}/>
      </View>
    )
    case 2: return (
      <View>
        <View style={contentStyle.mainWrapper}>
          <RetirementDate retire_date={props.retire_date}/>
        </View>
        <ChangeDisplayButton changeDisplayMode={() => {props.setDisplayMode(nextMode)}}/>
      </View>
    )

  }
}

// TODO: リファクタリング
function Content(props) {
  return (
    <View style={contentStyle.wrapper}>
      <DisplayControler {...props}/>
      <NoticeNoConfig unset_configs={props.unset_configs} />
    </View>
  )
};

function Item(props) {
  return (
    <TouchableOpacity style={configStyle.item} onPress={() => {props.onPress()}}>
      <Text style={configStyle.title}>{props.title}</Text>
    </TouchableOpacity>
  )
};

function ItemList(props) {
  return (
    <View>
      <Item title={Translations.t('home.asset_config')} onPress={() => {props.onPressConfig()}} />
      <Item title={Translations.t('home.retirement_asset_config')} onPress={() => {props.onPressRetirementAssetConfig()}}/>
      <Item title={Translations.t('home.asset_record')} onPress={() => {props.onPressAssetRecord()}} />
    </View>
  )
}

function Footer(props) {
  return (
    <View style={footerStyle.wrapper}>
      <TouchableOpacity onPress={() => {props.onSignout()}}>
        <Text style={footerStyle.text}>{Translations.t('home.sign_out')}</Text>
      </TouchableOpacity>
    </View>
  )
}

function fetchData(props) {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      getJWT().then((token) => {
        const url = props.rootPath + '?locale=ja'
        fetch(url, {
          headers: {
            'Authorization': 'Token ' + token
          }
        })
        .then(res => res.json())
        .then((result) => {
          if (props.mounted) {
            const messages = result.data.attributes.messages
            const unset_configs = Object.keys(messages)

            if (!unset_configs.length) {
              props.setSuccessData(result)
            } else {
              props.setErrorData(result)
            }
          };
        });

      })
    }
  })
}

function HomeScreen (props) {
  const [visible, setVisible] = useState(true)
  const [displayMode, setDisplayMode] = useState(0)

  useEffect(() => {fetchData(props)}, [props.config_changed])
  useFocusEffect(
    React.useCallback(() => {
      setVisible(true)
    }, [])
  )

  return (
    <SafeAreaView style={styles.screen}>
      <ImageBackground source={backgroundImage} style={styles.backgroundImage}/>
        {visible ? (
          <>
            <Header/>
            <Content
              {...props}
              displayMode={displayMode}
              setDisplayMode={setDisplayMode}
            />
            <ItemList
              onPressConfig={() => {setVisible(false); props.navigation.navigate('Config')}}
              onPressRetirementAssetConfig={() => {setVisible(false); props.navigation.navigate('RetirementAssetConfig')}}
              onPressAssetRecord={() => {setVisible(false); props.navigation.navigate('AssetRecord')}}
            />
            <Footer onSignout={() => {props.onSignout()}}/>
          </>
        ) : (<></>)}
    </SafeAreaView>
  );
}

const backgroundImage = require('../assets/background_img.jpg')

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    padding: 40,
    alignItems: 'center'
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    top: '-35%',
    width: '180%',
    left: '-110%'
  },
});

const titleStyle = StyleSheet.create({
  wrapper: {
    marginTop: 40,
    marginBottom: 100,
    width: 310,
    alignItems: 'flex-end'
  },
  textCommon: {
    color: '#ffffff'
  },
  textMain: {
    fontSize: 53,
    textAlign: 'center'
  },
  textSub: {
    fontSize: 19,
    textAlign: 'center'
  }
})

const textTitleMain = StyleSheet.compose(titleStyle.textMain, titleStyle.textCommon)
const textTitleSub = StyleSheet.compose(titleStyle.textSub, titleStyle.textCommon)

const contentStyle = StyleSheet.create({
  wrapper: {
    width: 310,
    marginBottom: 10,
  },
  mainWrapper: {
    height: 80,
    marginBottom: 20
  },
  changeBtnWrapper: {
    alignItems: 'flex-end'
  },
  changeBtn: {
    flexDirection: 'row',
    height: 30,
    width: 80,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0e38ad'
  },
  changeBtnIcon: {
    marginRight: 5,
    fontSize: 14,
    color: '#ffffff',
  },
  changeBtnText: {
    fontSize: 14,
    color: '#ffffff'
  },
  countdownMessage: {
    marginBottom: 6,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  countdownDate: {
    marginBottom: 6,
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  numberBlock: {
    marginLeft: 20,
    marginRight: 10,
  },
  unitBlock:{
    position: 'relative',
    bottom: 10
  },
  countdownNumber: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  countdownUnit: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff'
  },
  retireDate: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

const unsetConfigStyle = StyleSheet.create({
  wrapper: {
    height: 30
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

const configStyle = StyleSheet.create({
  item: {
    backgroundColor: '#EDB413',
    marginBottom: 32,
    borderRadius: 10,
    height: 48,
    width: 310,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold'
  }
})

const footerStyle = StyleSheet.create({
  wrapper: {
    width: 310,
    position: 'absolute',
    bottom:40,
    alignItems: 'flex-end'
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

export default HomeScreen;
