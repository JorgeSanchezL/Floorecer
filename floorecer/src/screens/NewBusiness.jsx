import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert,
  useWindowDimensions, Dimensions, Image, TouchableOpacity,
  Modal } from "react-native";
import CustomButton from '../components/CustomButton';
import CustomDropDowPiker from '../components/DropDownPiker';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { ScrollView } from "react-native-gesture-handler";
import { DayTimeSlots } from "./ConfigureBusiness";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

import { BACKEND_URL } from '@env';

const diasDeLaSemana = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]

const NewBusiness = () => {
  const [shopName, setShopName] = useState("");
  const [nif, setNif] = useState("");
  const [address, setAddress] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [openingHours, setOpeningHours] = useState({Domingo:[],Lunes:[],Martes:[], Miércoles:[],Jueves:[],Viernes:[],Sábado:[]});
  const [image, setImage] = useState(null);
  const[category, setCategory] =useState("");

  const {height}= useWindowDimensions();
  const {width} = Dimensions.get("window");
  const [isVisibleMap, setIsVisibleMap] = useState(false);
  const [location, setLocation] = useState(null);

  const SaveBusiness = async () => {

    if (image == null) { Alert.alert('Atención',
      'Debe seleccionar al menos una imagen para su comercio'); }
    else {
      const formData = new FormData();

      // uid from the business owner
      formData.append('owner', 'XiwTNPIGkAT2txAIRwUUMeBUVvH2')
      formData.append('name', shopName);
      formData.append('nif', nif);
      formData.append('address', address);
      formData.append('location', JSON.stringify(location));
      formData.append('openingHours',
        JSON.stringify(openingHours));
      formData.append('category', category);

      const imgName = image.split('/').pop();
      const imgType = imgName.split('.').pop();
      formData.append('image', {
        uri: image,
        type: `image/${imgType}`,
        name: imgName
      });

      try {
        const api_request = await fetch(`http://${BACKEND_URL}:5000/business/newBusiness`, {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: formData
        });
        Alert.alert("¡Comercio Creado con éxito!", "",[{text: "OK",},])
      } catch (err) {
        console.log(err)
      }
    }
  }
  function checkInputs () {
    
      if(shopName == '' || nif == '' || category == ''|| address == '') {
        Alert.alert('', '¡Hay que rellenar todos los campos para continuar!', [
            
          { text: 'OK'},
        ]);
        return false;
      }
      /* var CIF_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,}$/
      if(CIF_REGEX.test(nif)){
        Alert.alert('', 'Formato erróneo para el NIF', [
            
          { text: 'OK'},
        ]);
        return false;
      } */
      return true;

  }
  const onSavePressed = () =>{
    if(checkInputs())
    {
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
    }
    
  };
  const onCancelPressed = () =>{
    console.warn("cancel");

  }

  const pickImage = async () => {
    let permission = await ImagePicker.getMediaLibraryPermissionsAsync(true);
    if (!permission.granted) {
        permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) { return; }
    }
    
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
    });
    
    if (!result.cancelled && result.type === 'image') {
        setImage(result.uri);
    }
  };

  return(
  <View style={[styles.mainContainer]}>

    <Text style={[styles.title,{marginTop:height * 0.05}]}>New Business</Text>

    <ScrollView 
      nestedScrollEnabled={true}
      style={{width,height: height * 0.79, paddingHorizontal:10}}>
        
      <MyTextInput name = 'Shop Name' value={shopName} setValue={setShopName}/>
      <MyTextInput name = 'NIF' value={nif} setValue={setNif} info ={'Ejemplo: B–76365789'}/>
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

      <View style={styles.container}>
        { image
            ? <View>
                <TouchableOpacity
                    onPress={pickImage}
                    activeOpacity={0.8}
                >
                    <Image
                        source={{ uri: image }}
                        style={styles.imgPicker}
                    />
                </TouchableOpacity>
            </View>
            : <TouchableOpacity
                onPress={pickImage}
                activeOpacity={0.8}
                style={{alignItems: 'center'}}
            >
                <MaterialIcons
                    name='image-search'
                    size={35}
                    color={'#606060'}
                    style={{paddingTop: 10}}
                />
                <Text style={{ 
                    color: '#000',
                    paddingVertical: 10
                }}>
                  Pulsa para seleccionar una imagen
                </Text>
            </TouchableOpacity>
        }
      </View>

      <View style = {{flex:0, alignItems:'center'}}>
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
              setNewRegion(response.location);
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
    container: {
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 20
    },
    imgPicker: {
      width: '100%',
      height: 200,
      borderRadius: 4
    },
  });

export default NewBusiness;