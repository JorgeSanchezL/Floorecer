import React, { useState, Component,useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert, useWindowDimensions, Dimensions } from "react-native";
import CustomButton from '../components/CustomButton';
import ImageCarouselPickingImages from '../components/ImageCarouselPickingImages';
import CustomDropDowPiker from '../components/DropDownPiker';
import { Image, TouchableOpacity, Modal, Icon} from "react-native";
import MapView from 'react-native-maps'
import * as Location from 'expo-location';
import { ScrollView } from "react-native-gesture-handler";
import { DayTimeSlots } from "./ConfigureBusiness";

const diasDeLaSemana = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]

const NewBusiness = () => {
  const [shopName, setShopName] = useState("");
  const [nif, setNif] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [openingHours, setOpeningHours] = useState({Domingo:[],Lunes:[],Martes:[], Miércoles:[],Jueves:[],Viernes:[],Sábado:[]});
  const images =[];
  const[category, setCategory] =useState("");

  const {height}= useWindowDimensions();
  const {width} = Dimensions.get("window");
  const [isVisibleMap, setIsVisibleMap] = useState(false)
  const [location, setLocation] = useState(null)

  const SaveBusiness = async () => {
    try {
      const response = await fetch('http://192.168.43.205:5000/business/newBusiness', {
        method: 'POST',
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },
        body:JSON.stringify({
          owner:'XiwTNPIGkAT2txAIRwUUMeBUVvH2', //uid from the business owner
          name: shopName,
          nif: nif,
          Address: address,
          location: location,
          openingHours: openingHours,
          category: category,

        }),
      });
      

    } catch (err) {
      console.log(err)
    }
  }

  const onSavePressed = () =>{
    if(location == null){
      
      Alert.alert(
        "Tiene que seleccionar una ubicación en el mapa",
        "",
        [
          {
            text: "Seleccionar",
            onPress: () => { setIsVisibleMap(true)}
          },
          
        ]
      )
    }else{
      SaveBusiness();
    }
    
  };
  const onCancelPressed = () =>{
    console.warn("cancel");

  }
  return(
  <View style={[styles.mainContainer]}>

    <Text style={[styles.title,{marginTop:height * 0.05}]}>New Business</Text>

    <ScrollView 
      nestedScrollEnabled={true}
      style={{width,height: height * 0.79, paddingHorizontal:10}}>
        
      <MyTextInput name = 'Shop Name' value={shopName} setValue={setShopName}/>
      <MyTextInput name = 'NIF' value={nif} setValue={setNif}/>
      <MyTextInput 
            name = 'Dirección' 
            value={address} 
            setValue={setAddress}
            isLocation
            setIsVisibleMap={setIsVisibleMap}
        />
      <Mapa 
        isVisibleMap={isVisibleMap} 
        setIsVisibleMap={setIsVisibleMap} 
        location={location} 
        setLocation={setLocation}
      />
      
      <Text
        style={styles.header2}
      >Categoria</Text>
      <CustomDropDowPiker 
        value={category}
        setValue={setCategory}
        
        ></CustomDropDowPiker>

      
      <Text style={styles.header2}>Horario de apertura</Text>
      {
        openingHours!=null && diasDeLaSemana.map((day)=>{
            return(
                <DayTimeSlots 
                  day={day} 
                  slots={openingHours[day]} 
                  openingHours={openingHours} 
                  setOpeningHours={setOpeningHours}
                />
            )
    
        })
      }
      <ImageCarouselPickingImages images = {images}/>

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
    </ScrollView>
  </View>
  
);}

export const MyTextInput = (props) => {

  return (
    <View
      style={{width:'100%',}}
    >
      <Text style={styles.header2}>
        {props.name}
      </Text>
      <View style={styles.sectionStyle}>
        <TextInput
            style = {{flex:1, padding:10}}
            placeholder={props.info}
            value={props.value}
            onChangeText={props.setValue}
        />
        { props.isLocation && 
            <TouchableOpacity onPress={()=>props.setIsVisibleMap(true)}>
                <Image style={styles.imageStyle} source={require(`../../assets/location.png`)} />
            </TouchableOpacity>
        }
        
      </View>
    </View>
  );

};


function Mapa ({isVisibleMap, setIsVisibleMap, setLocation}){
  const [newRegion, setNewRegion] = useState(null)
   useEffect(()=>{
      (async()=>{
          const response = await getCurrentLocation()
          if(response.status){
              setNewRegion(response.location)
              console.log(response.location)
          }
      })()
      },[])
  

  const confirmLocation = () => {
      setLocation(newRegion)
      setIsVisibleMap(false)
  }

  return (
      <View style={{flex:1, justifyContent:"center", alignItems:"center",marginTop:10}}>
          <Modal 
              animationType="fade"
              transparent={true}
              visible={isVisibleMap}
              onRequestClose={() => {
                  setIsVisibleMap(false);
                }}
              style={{height:300,width:300}}
          >
              <View style={styles.centeredView}>
                  <View style={styles.modalView}>
                      
                          <MapView 
                              style={styles.mapStyle}
                              initialRegion={newRegion}
                              onRegionChange={(region) => setNewRegion(region)}
                              showsUserLocation={false}
                          >
                              {newRegion && <MapView.Marker
                                      coordinate={{
                                          latitude: newRegion.latitude, 
                                          longitude: newRegion.longitude
                                      }}
                                      draggable
                                  />
                              }   
                          </MapView>
                          <View style = {{flex:0, flexDirection:'row', justifyContent:"center"}}>
                              <CustomButton 
                                  text="Cancelar" 
                                  type = 'cuaterciario'
                                  onPress={() => {
                                      setIsVisibleMap(false);
                                    }}
                                  />
                              <CustomButton 
                                  text="Guardar ubicación" 
                                  type = 'cuaterciario'
                                  onPress={confirmLocation}
                                  />
                          </View>
                  </View>
              </View>
              
          </Modal>
      </View>
  )
}
const getCurrentLocation = async () => {
  const response = {status:false, location:null}
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
    return response
  }
  const position = await Location.getCurrentPositionAsync({})
  const location = {
      latitude:position.coords.latitude,
      longitude:position.coords.longitude,
      latitudeDelta: 0.001,
      longitudeDelta: 0.0001
  }
  response.status=true
  response.location=location
  return response
}

const styles = StyleSheet.create({
    mainContainer:{
      alignItems:'center',
      height:'100%'
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
    sectionStyle:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      height: 40,
      borderRadius: 5,
      marginTop:10
    },
    imageStyle: {
      padding: 15,
      margin: 10,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
      
    },
    mapStyle:{
      width:"100%",
      height:550,
    },
    icon:{
        size:20,
        padding:10
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
    },
    modalView: {
        margin: 10,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    header2:{
      marginTop:10, 
      fontSize:20, 
      fontWeight:"bold" 
    },
  });

export default NewBusiness;