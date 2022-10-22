import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, Component } from "react";
import { View,  TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from "react-native";


const CustomDropDownPicker= (props) => {
  const [open, setOpen] = useState(false);

  const [items, setItems] = useState([
    {label: 'Fruit store', value: 'fruiStore'},
    {label: 'Supermarket', value: 'supermarket'},
    {label: 'Ropa', value: 'ropa'},
    {label: 'Rastro', value: 'rastro'},
    
  ]);

  return (
    
        <DropDownPicker
            style={styles.dropdown}
            listMode="SCROLLVIEW"
            placeholder='Selecciona la Categoría'
            placeholderStyle={{
                color: "grey",
                
              }}
            open={open}
            value={props.value}
            items={items}
            setOpen={setOpen}
            setValue={props.setValue}
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