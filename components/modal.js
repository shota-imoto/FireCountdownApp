import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

function CloseButton(props) {
  return (
    <View style={styles.closeButtonView}>
      <Button
        title='閉じる'
        onPress={() => {props.onPress()}}
      />
    </View>
  )
}

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    }
  }

  toggleVisible () {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    if (this.state.isOpen) {
      return(
        <View style={styles.position}>
          <View style={styles.main}>
            <CloseButton onPress={() => {this.toggleVisible()}}/>
            {this.props.content}
          </View>
        </View>
      )
    } else {
      return (null)
    }
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    width: 300,
    height: 400,
    padding: 20,
    borderRadius: 5,
  },
  position: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)'
  },
  closeButtonView: {
    alignItems: 'flex-end'
  }
})

export default Modal;
