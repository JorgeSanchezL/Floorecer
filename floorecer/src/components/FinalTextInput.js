import React, { useState, useEffect } from "react";
import {StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { useFonts } from 'expo-font';



const FinalTextInput = (props) => {
    const [fontLoaded] = useFonts({
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    })
  

    if(!fontLoaded) { return null; }  
    return (
        <TextInput
            style={styles.input}
            placeholder={props.info}
            placeholderTextColor='#959494'
            onChangeText=  {props.setValue}
            value ={props.value}
      />
    );
        
      
        
      };
      
      const styles = StyleSheet.create({
          input:{
            backgroundColor : 'rgb(229,226,243)',
            height: 39,
            width : 321,
            marginLeft:20,
            borderRadius:10,
            padding: 10,
           /*  alignSelf : 'center', */
            textAlign : "auto",
          },
      });

export default FinalTextInput;