import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity, StyleSheet } from 'react-native'


import { Elixir,Suplemento,Abono,Semilla1,Semilla2,Semilla3,Semilla4 ,Descuento10,Descuento30,Promocion2x1} from './items'

const getImage = (imageName) => {
  switch (imageName) {
    case "Elixir":
         return <Elixir />
        break
    case "Suplemento":
       return <Suplemento />
       break
    case "Abono":
        return <Abono />
        break;
    case "Semilla verde":
        return <Semilla1 />
        break;
    case "Semilla naranja":
        return <Semilla2 />
        break;   
    case "Semilla morada":
        return <Semilla3 />
        break;   
    case "Semilla rosa":
        return <Semilla4 />
        break;  
    case "Descuento":
        return <Descuento10 />
        break;     
    case "Descuento ":
        return <Descuento30 />
        break;   
    case "Promocion":
        return <Promocion2x1 />
        break;           
    default:
      break;
  }
}

export default class ItemsImage extends React.Component {
  render() {
    return (
      <View>
        {
        getImage(this.props.name)}
        
      </View>
    )
  }
}