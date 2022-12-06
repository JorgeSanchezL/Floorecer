import React, { useState, useEffect } from "react";
import {StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";




const FinalTextInput = (props) => {

  

      
    return (
        <TextInput
            style={styles.input}
            placeholder={props.info}
            placeholderTextColor='#959494'
            onChangeText=  {props.setValue}
            value ={props.value}
            placeholderStyle = {{fontFamily:'Poppins_300Light'}}
            
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
            textAlign : "auto"
          },
      });

export default FinalTextInput;