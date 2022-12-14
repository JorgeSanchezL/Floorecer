import React from 'react';
import { useCallback } from 'react';
import { Image, Text, StyleSheet, View, SafeAreaView,ImageBackground,Dimensions, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import CustomInput from '../components/CustomInput';
import image from '../../assets/image/back2.jpeg'
import Svg from 'react-native-svg';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
export default function Premio() {
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
  });
  
  if (!fontsLoaded) {
    return null;
  }
 
  return (
    <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
    <TextInput style={styles.text}/>
    <TextInput style={styles.text1}/>
    <TextInput style={styles.text2}/>
    </ImageBackground>
    <Text style = {styles.direccion}> Dirección </Text>
    <Text style = {styles.cuidad}> Cuidad </Text>
    <Text style = {styles.codpostal}> Cod. postal </Text>
<TouchableOpacity  style = {styles.button}>
<Text style = {styles.completar}> Completar</Text>
</TouchableOpacity>
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : 'white'
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1
  },
  text: {
    fontSize : 20,
    color: "white",
    lineHeight: 84,
    backgroundColor: "#000000c0",
    "position": "absolute",
    "width": 320,
    "height": 37,
    "left": 33,
    "top": 270,
    "backgroundColor": "rgba(253, 178, 109, 0.4)",
    "backdropFilter": "blur(32.5px)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomRightRadius": 10,
    "borderBottomLeftRadius": 10
  },
  text1: {
    "position": "absolute",
    "width":150,
    "height": 37,
    "left": 33,
    "top": 370,
    "backgroundColor": "rgba(253, 178, 109, 0.4)",
    "backdropFilter": "blur(32.5px)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomRightRadius": 10,
    "borderBottomLeftRadius": 10
  },
  text2: {
    "position": "absolute",
    "width":150,
    "height": 37,
    "left": 200,
    "top": 370,
    "backgroundColor": "rgba(253, 178, 109, 0.4)",
    "backdropFilter": "blur(32.5px)",
    "borderTopLeftRadius": 10,
    "borderTopRightRadius": 10,
    "borderBottomRightRadius": 10,
    "borderBottomLeftRadius": 10
  },
  button : {
    backgroundColor: '#FC993D',
    padding: 10,
    "position": "absolute",
    "width": 316,
    "height": 57,
    "left": 20,
    "top": 483,
  "borderTopLeftRadius": 10,
  "borderTopRightRadius": 10,
  "borderBottomRightRadius": 10,
  "borderBottomLeftRadius": 10 
  },direccion : {
    "position": "absolute",
    "width": 71,
    "height": 18,
    "left": 29,
    "top": 250,
    "fontFamily": "Poppins_300Light",
    "fontStyle": "normal",
    "fontWeight": "300",
    "fontSize": 12,
    "lineHeight": 15,
    "textAlign": "center",
    "color": "#000000"
  },
  cuidad : {
    "position": "absolute",
    "width": 71,
    "height": 18,
    "left": 25,
    "top": 350,
    "fontFamily": "Poppins_300Light",
    "fontStyle": "normal",
    "fontWeight": "300",
    "fontSize": 12,
    "lineHeight": 15,
    "textAlign": "center",
    "color": "#000000"
  },
  codpostal : {
    "position": "absolute",
    "width": 71,
    "height": 18,
    "left": 200,
    "top": 350,
    "fontFamily": "Poppins_300Light",
    "fontStyle": "normal",
    "fontWeight": "300",
    "fontSize": 12,
    "lineHeight": 15,
    "textAlign": "center",
    "color": "#000000"
  },
  completar : {
    "fontFamily": "Poppins_300Light",
    "fontStyle": "normal",
    "fontWeight": "600",
    "fontSize": 16,
    "lineHeight": 35,
    "textAlign": "center",
    "color": "#FFFFFF"
 }
});