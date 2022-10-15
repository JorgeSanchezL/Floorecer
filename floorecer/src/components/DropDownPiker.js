import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, Component } from "react";
import { View,  TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from "react-native";


const CustomDropDownPicker= (props) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: 'fruit store', value: 'fruiStore'},
    {label: 'supermarket', value: 'Supermarket'},
    {label: 'Banana', value: 'banana3'},
    {label: 'Banana', value: 'banana4'},
    {label: 'Banana', value: 'banana5'},
    
  ]);

  return (
    
        <DropDownPicker
            style={styles.dropdown}
            listMode="SCROLLVIEW"
            placeholder='Select up to 5 categories'
            placeholderStyle={{
                color: "grey",
                
              }}
            multiple={true}
            min={0}
            max={4}
            open={open}
            value={value}
            items={items}
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
    }
});

export default CustomDropDownPicker;