import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Modal from 'react-native-modal';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInputComponent from '../components/textInputComponent.js'
import { Translations } from '../locale/i18n.js';
import { Picker } from '@react-native-picker/picker';
import { getJWT } from '../components/jwt.js'

function handlePress(asset_config, props) {
  getJWT().then((token) =>{
    const url = props.rootPath + 'asset_record'
    const data = {
      "asset_record": {
        amount: asset_config.amount,
        date: asset_config.date + '-1',
      }
    }
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(data)
    }).then(res => res.json())
    .then(body => {
      const status = body.data.attributes.status;
      const message = body.data.attributes.message;
      if (status == 'success') {
        alert('設定が完了しました')
        props.navigation.navigate('Home')
        props.changeConfig()
      } else {
        alert(message.join('\n'));
      }
    })  
  })
}

function AssetRecordScreen (props) {
  const [amount, setAmount] = useState("0")

  const current = new Date
  const [selectedMonth, setMonth] = useState(current.getMonth() + 1);
  const [selectedYear, setYear] = useState(current.getFullYear());
  const [date, setDate] = useState()

  const initYear = current.getFullYear();
  const yearList = [...Array(20)].map((_, i) => initYear - i);
  const monthList = [...Array(12)].map((_, i) => i + 1)

  const [show, setShow] = useState(false);

  const assetRecordInput = {
    amount: amount,
    date: date,
  }

  useEffect(() => {
    setDate(selectedYear + '-' + selectedMonth)
  }, [selectedMonth, selectedYear])

  return (
    <View style={styles.wrapper}>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>{Translations.t('asset_record.amount')}</Text>
        </View>
        <TextInputComponent
          value={ amount }
          onChangeText={(text) => setAmount(text)}
          type='number'
        />
      </View>
      <View style={ textStyle.wrapper }>
        <View style={textStyle.labelBlock}>
          <Text style={ textStyle.label }>{Translations.t('asset_record.date')}</Text>
        </View>
        <TouchableOpacity style={formStyles.textForm} onPress={() => {setShow(!show)}}>
          <Text style={formStyles.text}>{date}</Text>
        </TouchableOpacity>
      </View>
      <View style={pickerStyle.wrapper}>
        <Modal
          style={pickerStyle.modal}
          animationType="slide"
          transparent={true}
          visible={show}
          coverScreen={false}
        >
          <View style={pickerStyle.modalSize}>
            <View style={pickerStyle.flexBox}>
              <Picker 
                style={pickerStyle.form}
                itemStyle={pickerStyle.item} 
                selectedValue={selectedMonth}
                onValueChange={(itemValue, itemIndex) =>
                  setMonth(itemValue)
                }>
                {monthList.map(v => <Picker.Item key={v} label={Translations.t('common.month.'+v)} value={v} />)}
              </Picker>
              <Picker
                style={pickerStyle.form}
                itemStyle={pickerStyle.item} 
                selectedValue={selectedYear}
                onValueChange={(itemValue, itemIndex) =>
                  setYear(itemValue)
                }>
                {yearList.map(v => <Picker.Item key={v} label={v+Translations.t('common.year')} value={v} />)}
              </Picker>
            </View>
            <TouchableOpacity style={pickerStyle.btn} onPress={() => {setShow(!show)}}>
              <Text style={pickerStyle.btnText}>{Translations.t('common.ok')}</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
      <View style={ btnStyle.wrapper }>
        <TouchableOpacity style={ btnStyle.btn } onPress={() => {handlePress(assetRecordInput, props)}}>
          <Text style={ btnStyle.text }>{Translations.t('common.setting')}</Text>
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
  },
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
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff'
  }
})

const pickerStyle = StyleSheet.create({
  wrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  modal: {
    alignItems: 'center',
  },
  modalSize: {
    padding: 10,
    height: 260,
    width: 240,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.6)',
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 2
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 100,
    height: 210,
  },
  item: {
    fontSize: 14
  },
  btn: {
    width: 80,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#134CED',
  },
  btnText: {
    fontSize: 20,
    color: '#ffffff'
  }
})


const formStyles = StyleSheet.create({
  textForm: {
    padding: 12,
    height: 42,
    width: 310,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  text: {
    fontSize: 16,
  }
})

export default AssetRecordScreen;
