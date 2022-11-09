import React from 'react'
import { TouchableOpacity, Alert, Image, StyleSheet } from 'react-native'
import dirt from './../../assets/garden/dirt.jpg'

export default class BotonFlor extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onClick}>
        <Image
          source={dirt}
          style={styles.image} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 62.5,
    height: 125,
    width: 125
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})