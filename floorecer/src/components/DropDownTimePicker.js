import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, Component, useEffect} from "react";
import { View,  TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from "react-native";

const DropDownTimePicker= (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(props.time);
  const [items, setItems] = useState([
    {label: '00:00', value: '00:00'},
    {label: '00:30', value: '00:30'},
    {label: '01:00', value: '01:00'},
    {label: '01:30', value: '01:30'},
    {label: '02:00', value: '02:00'},
    {label: '02:30', value: '02:30'},
    {label: '03:00', value: '03:00'},
    {label: '03:30', value: '03:30'},
    {label: '04:00', value: '04:00'},
    {label: '04:30', value: '04:30'},
    {label: '05:00', value: '05:00'},
    {label: '05:30', value: '05:30'},
    {label: '06:00', value: '06:00'},
    {label: '06:30', value: '06:30'},
    {label: '07:00', value: '07:00'},
    {label: '07:30', value: '07:30'},
    {label: '08:00', value: '08:00'},
    {label: '08:30', value: '08:30'},
    {label: '09:00', value: '09:00'},
    {label: '09:30', value: '09:30'},
    {label: '10:00', value: '10:00'},
    {label: '10:30', value: '10:30'},
    {label: '11:00', value: '11:00'},
    {label: '11:30', value: '11:30'},
    {label: '12:00', value: '12:00'},
    {label: '12:30', value: '12:30'},
    {label: '13:00', value: '13:00'},
    {label: '13:30', value: '13:30'},
    {label: '14:00', value: '14:00'},
    {label: '14:30', value: '14:30'},
    {label: '15:00', value: '15:00'},
    {label: '15:30', value: '15:30'},
    {label: '16:00', value: '16:00'},
    {label: '16:30', value: '16:30'},
    {label: '17:00', value: '17:00'},
    {label: '17:30', value: '17:30'},
    {label: '18:00', value: '18:00'},
    {label: '18:30', value: '18:30'},
    {label: '19:00', value: '19:00'},
    {label: '19:30', value: '19:30'},
    {label: '20:00', value: '20:00'},
    {label: '20:30', value: '20:30'},
    {label: '21:00', value: '21:00'},
    {label: '21:30', value: '21:30'},
    {label: '22:00', value: '22:00'},
    {label: '22:30', value: '22:30'},
    {label: '23:00', value: '23:00'},
    {label: '23:30', value: '23:30'},
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
                color: "#959494",
                fontSize:12,
                fontFamily:'PoppinsRegular',
              }}
            dropDownContainerStyle = {styles.dropDownContainer}
            open={open}
            value={value}
            items={items}
            onChangeValue = {(value) => {props.setTime(props.index,value)}}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            selectedItemLabelStyle={{
              fontWeight: "bold"
            }}
            listItemLabelStyle={{color:'grey',fontFamily:'PoppinsRegular', fontSize:12}}
        />
    
    
  );
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
    },
    dropdown:{
        backgroundColor: '#7D7ACD33',
        borderWidth: 0,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 6,
        fontSize: 16,
        borderRadius: 10,
        marginTop: 0,
        marginBottom: 22,
        zIndex:100,
        height:37,
        width:123,
    },
   /*  dropDown:{
      backgroundColor: 'rgb(229,226,243)',
      borderRadius:10,
      borderWidth:0,
      marginTop:10,
      width:'80%',
      alignSelf:'center',
    }, */
    dropDownContainer:{
      backgroundColor:'rgb(229,226,243)',
      borderWidth:0, 
      width:123,
      zIndex:200,
      elevation:2,
      direction:'ltr',
    }
});

export default DropDownTimePicker;