import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";




const SelectionButton = (props) => {

    const Item = ({ label, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{label}</Text>
        </TouchableOpacity>
      );
      
        const backgroundColor = props.value ?'#7D7ACD':'white' ;
        const color =  props.value ? '#FFFFFF' :'#7D7ACD';
      
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
          fontSize: 17,
          fontWeight:'400',
          
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