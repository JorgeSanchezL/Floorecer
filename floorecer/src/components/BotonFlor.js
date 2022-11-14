import React from 'react'
import { TouchableOpacity, Alert, Image, StyleSheet } from 'react-native'

export default class BotonFlor extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onClick}>
        {
          {
            true: <Image source={this.props.image} style={styles.roundedImage} />,
            false: <Image resizeMode='contain' source={this.props.image} style={styles.image} />
          }[this.props.rounded]
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125
  },
  roundedImage: {
    borderRadius: 62.5,
    height: 125,
    width: 125
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})