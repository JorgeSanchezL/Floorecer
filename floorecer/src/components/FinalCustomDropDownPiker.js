import DropDownPicker from 'react-native-dropdown-picker';
import React, { useState, useEffect } from "react";
import {  TextInput, StyleSheet ,Alert, useWindowDimensions, Dimensions } from "react-native";
import { getCategories } from '../../utils/actions';


const FinalCustomDropDownPicker= (props) => {
  
  const [open, setOpen] = useState(false);
 
  const [items, setItems] = useState([]);

  const changeData = async ()=>{
    setItems(await getCategories())
  }
  useEffect(() => {changeData()}, [])

 

  return (
    
        <DropDownPicker
            style={styles.dropdown}
            listMode="SCROLLVIEW"
            placeholder='Selecciona la Categoría'
            open={open}
            value={props.value}
            items={items}
            setOpen={setOpen}
            setValue={props.setValue}
            setItems={setItems}
            dropDownContainerStyle = {styles.dropDownContainer}
            placeholderStyle = {styles.placeholder}
            selectedItemLabelStyle={{
              fontWeight: "bold"
            }}

            listItemLabelStyle={{color:'grey',fontFamily:'PoppinsRegular'}}
            scrollViewProps={{showsVerticalScrollIndicator:false}}

        />
    
        
  );
  
}



const styles = StyleSheet.create({
    container:{
        paddingVertical: 10,
        marginLeft:20,
    },
    dropdown:{
        backgroundColor:'rgba(125, 122, 205, 0.2)',
        borderWidth: 0,
        paddingHorizontal: 12,
        paddingVertical: Platform.OS === 'ios' ? 12 : 6,
        fontSize: 16,
        borderRadius: 10,
        marginTop: 0,
        marginBottom: 0,
        zIndex:202,
        width:321,
        minHeight: 39,
        marginLeft:20,
    },
    dropDownContainer:{
     /*  backgroundColor:'rgb(229,226,243)', */
      backgroundColor:'#D8D6E5',
      borderWidth:0, 
      width:321,
      zIndex:200,
      elevation:2,
      marginLeft:20,
      
    },
    placeholder:{
      color:'#959494',
      fontFamily:'PoppinsRegular',
      fontSize:12
    },
});

export default FinalCustomDropDownPicker;