import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';



const SelectionButton = (props) => {

  const [fontLoaded] = useFonts({
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
  })
  const Item = ({ label, onPress, backgroundColor, textColor }) => (
      <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, backgroundColor]}>
        <Text style={[styles.title, textColor]}>{label}</Text>
      </TouchableOpacity>
    );
    
  const backgroundColor = props.value ?'#7D7ACD':'white' ;
  const color =  props.value ? '#FFFFFF' :'#7D7ACD';
  
  if(!fontLoaded) { return null; }
  return (
    <Item
      label={props.label}
      onPress={props.onPress}
      backgroundColor={{backgroundColor}}
      textColor={{color}}
    />
  );
    
  
    
  };
    
  const styles = StyleSheet.create({
    title: {
      fontSize: 14,
      fontWeight:'400',
      fontFamily:'PoppinsRegular',
      alignSelf:'center'
    },
    appButtonContainer: {
        height: 42,
        width: 149,
        borderRadius: 20,
        marginHorizontal: 10,
        justifyContent: 'center',
        alignItems:'center',
        paddingHorizontal: 12,
        borderWidth:1,
        borderColor:'#7D7ACD',
        marginBottom:15,
        marginLeft: 20,
      },
  });

export default SelectionButton;