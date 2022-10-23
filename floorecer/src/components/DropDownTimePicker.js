import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, Component, useEffect} from "react";
import { View,  TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from "react-native";

const DropDownTimePicker= (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.time);
  const [items, setItems] = useState([
    {label: '0:00', value: '0:00'},
    {label: '0:30', value: '0:30'},
    {label: '1:00', value: '1:00'},
    {label: '1:30', value: '1:30'},
  ]);
  useEffect(()=>{
    setValue(props.time)
  },[props.time])
  return (
    
        <DropDownPicker
            style={styles.dropdown}
            containerStyle={{width:130}}
            listMode="SCROLLVIEW"
            placeholder={props.fromTime?"Abre a las" : "Cierra a las"}
            placeholderStyle={{
                color: "grey",
                
              }}
            open={open}
            value={value}
            items={items}
            onChangeValue = {(value) => {props.setTime(props.index,value)}}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    
    
  );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
    },
    dropdown:{
        borderColor: 'white',
        backgroundColor: '#fff',
        borderWidth: 1,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 6,
        fontSize: 16,
        borderRadius: 5,
        marginTop: 0,
        marginBottom: 0,
        zIndex:100
    }
});

export default DropDownTimePicker;