import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Alert,
  useWindowDimensions, Dimensions, Image, TouchableOpacity,
  Modal } from "react-native";
import FinalButton from '../components/FinalButton';
import FinalCustomDropDowPicker from '../components/FinalCustomDropDownPiker';
import FinalTextInput from '../components/FinalTextInput';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import { ScrollView } from "react-native-gesture-handler";
import { DayTimeSlots } from "./ConfigureBusiness";
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { BACKEND_URL } from '@env';
import dots from '../../assets/dotsNewBusiness.png';

const diasDeLaSemana = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]

const NewBusiness = () => {
  const [fontLoaded] = useFonts({
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
  })
  

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
      formData.append('owner', auth0.uid)
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
        const api_request = await fetch(`${BACKEND_URL}/business/newBusiness`, {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: formData
        });
        if(api_request.status == 401){
          Alert.alert("¡No se puede crear comercio!", "Comprueba tu subscripción.",[{text: "OK",},])
        }else if(api_request.status == 200){
          Alert.alert("¡Comercio Creado con éxito!", "",[{text: "OK",},])
        }
      } catch (err) {
        Alert.alert(err)
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
  
  if(!fontLoaded) { return null; }
  return(
  <View style={[styles.mainContainer]}>

    

    <ScrollView 
      nestedScrollEnabled={true}
      style={{width,height: height * 0.79, paddingHorizontal:0}}
      showsVerticalScrollIndicator={false}>
      
      <Text style={[styles.title,{marginTop:height * 0.05}]}>Nuevo Comercio</Text>  
      <Image source = {dots} style={{alignSelf:'center'}}/>
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
        style={styles.header1}
      >Categoria</Text>
      <FinalCustomDropDowPicker 
        value={category}
        setValue={setCategory}
      ></FinalCustomDropDowPicker>

      
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
                style={{alignItems: 'center' ,backgroundColor:'rgb(229,226,243)', borderRadius:10, width:350,alignSelf:'center'}}
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
        <FinalButton 
          text="Publicar comercio" 
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
      <Text style={styles.header1}>
        {props.name}
      </Text>
      <View style={styles.sectionStyle}>
        {/* <TextInput
            style = {{flex:1, padding:10}}
            placeholder={props.info}
            value={props.value}
            onChangeText={props.setValue}
        /> */}
        <FinalTextInput
          info ={props.info}
          value = {props.value}
          setValue = {props.setValue}
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
                              <FinalButton 
                                  text="Cancelar" 
                                  type = 'Mapa2'
                                  onPress={() => {
                                      setIsVisibleMap(false);
                                    }}
                                  />
                              <FinalButton 
                                  text="Guardar ubicación" 
                                  type = 'Mapa'
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
    Alert.alert('Permission to access location was denied');
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
      height:'100%',
      backgroundColor:'white',
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
    title:{
      textAlign:'center',
      fontFamily:'MuseoModernoBold',
      fontSize:22,
      marginBottom:10,
    },
    sectionStyle:{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      height: 40,
      borderRadius: 5,
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
    header1:{
      marginTop:10, 
      fontSize:20,
      marginBottom:3,
      marginLeft:20,
      fontFamily:'PoppinsRegular',
      fontSize:12,
    },
    header2:{
      marginTop:25, 
      fontSize:20,
      marginBottom:10,
      marginLeft:20,
      fontFamily:'PoppinsRegular',
      fontSize:12,
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