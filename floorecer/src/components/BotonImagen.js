import React from 'react'
import { TouchableOpacity, Alert, Image, StyleSheet } from 'react-native'

export default class BotonImagen extends React.Component {
  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onClick}>
        {
          {
            'big': <Image source={this.props.image} style={styles.imageBig} />,
            'medium': <Image source={this.props.image} style={styles.imageMedium} />,
            'small': <Image source={this.props.image} style={styles.imageSmall} />
          }[this.props.size]
        }
        
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  imageBig: {
    height: 200,
    width: 200
  },
  imageMedium: {
    height: 100,
    width: 100
  },
  imageSmall: {
    height: 50,
    width: 50
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})