import React, { useState, Component } from "react";
import { View, Text, TextInput, Image, StyleSheet, Alert, useWindowDimensions, Dimensions } from "react-native";
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import ImageCarousel from '../components/ImageCarousel';

const NewBusiness = () => {
  const [shopName, setShopName] = useState("");
  const [nif, setNif] = useState("");
  const [direction, setDirection] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");

  const {height}=useWindowDimensions();

  const images =[
    'https://www.larazon.es/resizer/rq4rbnMC9g_5NTEuTH25LhXXcMg=/600x400/smart/filters:format(jpg)/cloudfront-eu-central-1.images.arcpublishing.com/larazon/7IGMFSY4XRG3RJ54HLFULH5VP4.JPG',
    'https://frutasmontijo.com/wp-content/uploads/2018/10/fruterias.jpg',
    'https://frutasmontijo.com/wp-content/uploads/2018/10/fruterias.jpg'
  ]
  
  const onSavePressed = () =>{
    //console.warn(shopName+nif+direction+longitude+latitude)
    console.warn("save")
  };
  const onCancelPressed = () =>{
    console.warn("cancel");

  }
  return(
  <View style={styles.mainContainer}>
    <Text style={[styles.title,{marginTop:height * 0.05}]}>New Business</Text>
    <MyTextInput name = 'Shop Name' value={shopName} setValue={setShopName}/>
    <MyTextInput name = 'NIF' value={nif} setValue={setNif}/>
    <MyTextInput name = 'Direction' value={direction} setValue={setDirection}/>
    <MyTextInput name = 'Position' info = 'Longitude' value={longitude} setValue={setLongitude}/>
    <MyTextInput info = 'Latitude' value={latitude} setValue={setLatitude}/>
    
    <ImageCarousel images = {images}/>

    <View style = {{flex:0, flexDirection:'row'}}>
      
        <CustomButton 
          text="Cancel" 
          type = 'cuaterciario'
          onPress={onCancelPressed}
          />
        <CustomButton 
          text="Save" 
          type = 'cuaterciario'
          onPress={onSavePressed}
          />
    
    </View>
    

  </View>
  
);}

export const MyTextInput = (props) => {

  return (
    <View
      style={{width:'100%',}}
    >
      <Text style={{ marginTop: props.name ? 14 : 0 ,height: !props.name ? 10 : null }}>
        {props.name}
      </Text>

      <TextInput
        //style={{ padding: 0, marginHorizontal: 12, borderWidth: 1, backgroundColor: "white" }}
        style = {styles.InputContainer}
        placeholder={props.info}
        value={props.value}
        onChangeText={props.setValue}
      />
    </View>
  );

};



const styles = StyleSheet.create({
    mainContainer:{
      alignItems:'center',
      paddingHorizontal:20,
    },
    InputContainer:{
      backgroundColor:'white',
        width:'100%',
        borderColor:'transparent',
        //borderWidth:15,
        borderRadius:5,

        paddingHorizontal:10,
        //marginVertical:5,
    },
    title: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'black',
      //width:'70%',
      maxWidth: 300,
      maxHeight: 200,
      
      //justifyContent:'center',
      //margin: 10,
      textAlign:'center'
    },
  });

export default NewBusiness;