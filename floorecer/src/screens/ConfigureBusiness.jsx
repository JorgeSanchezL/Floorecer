import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, useWindowDimensions, Dimensions } from "react-native";
import FinalButton from '../components/FinalButton';
import DropDownTimePicker from "../components/DropDownTimePicker";
import SelectionButton from "../components/SelectionButton";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { Image, TouchableOpacity, Modal, Icon} from "react-native";
import MapView from 'react-native-maps'
import { useNavigation } from '@react-navigation/native';
import FinalCustomDropDowPicker from '../components/FinalCustomDropDownPiker';
import { useFonts } from 'expo-font';
import FinalTextInput from '../components/FinalTextInput';
import { BACKEND_URL } from '@env';
import * as ImagePicker from 'expo-image-picker';
import { MaterialIcons } from '@expo/vector-icons';

const diasDeLaSemana = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]
const {width} = Dimensions.get("window");
const height = width * 0.6;

const ConfigureBusiness = ({ route }) => {
  const [fontLoaded] = useFonts({
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
  })
  const navigation=useNavigation();

  const [shopName, setShopName] = useState(route.params.name);
  const [description, setDescription] = useState(route.params.description);
  const [nif, setNif] = useState(route.params.NIF);
  const [address, setAddress] = useState(route.params.address);
  const [openingHours, setOpeningHours] = useState(route.params.openingHours);
  const [isVisibleMap, setIsVisibleMap] = useState(false)
  const [category, setCategory] = useState(route.params.category)
  const [location, setLocation] = useState(route.params.location)
  const {height}= useWindowDimensions();
  const {width} = Dimensions.get("window");
  const [image, setImage] = useState(route.params.imageURL)
  const [newImage, setNewImage] = useState(null)

  const updateBusiness = async () => {
      const formData = new FormData();

      formData.append('name', shopName);
      formData.append('description', description);
      formData.append('nif', nif);
      formData.append('address', address);
      formData.append('location', JSON.stringify(location));
      formData.append('openingHours',
        JSON.stringify(openingHours));
      formData.append('category', category);
      if(newImage){
        const imgName = image.split('/').pop();
        const imgType = imgName.split('.').pop();
        formData.append('image', {
          uri: image,
          type: `image/${imgType}`,
          name: imgName
        });
      }else{
        formData.append('imageURL',image)
      }

      formData.append('uid', route.params.uid)
    try {
      console.log(route.params)
      const api_call = await fetch(`${BACKEND_URL}/business/updateBusiness`, {
                method: 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                body: formData
            });
            const response = await api_call.json();

            if (response.saved) {
                navigation.navigate('myShops');
            } else { throw -1; }
    } catch (error) {
      Alert.alert(error)
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
      updateBusiness();
    }
    
  };
  const onCancelPressed = () =>{
    navigation.navigate('myShops');
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
        setNewImage(result.uri)
    }
  };
  if(!fontLoaded) { return null; }
  return(
  <View style={[styles.mainContainer]}>


    <ScrollView 
      nestedScrollEnabled={true}
      style={{width,height: height * 0.79, paddingHorizontal:0}}>

      <Text style={[styles.title,{marginTop:height * 0.05}]}>{shopName}</Text>
      <MyTextInput name = 'Nombre' value={shopName} setValue={setShopName}/>
      <MyTextInput name = 'Descripción' value={description} setValue={setDescription}/>
      <MyTextInput name = 'NIF' value={nif} setValue={setNif}/>

      <MyTextInput 
            name = 'Dirección' 
            value={address} 
            setValue={setAddress}
            isLocation
            setIsVisibleMap={setIsVisibleMap}
        />
      {location && <Mapa 
        isVisibleMap={isVisibleMap} 
        setIsVisibleMap={setIsVisibleMap} 
        location={location} 
        setLocation={setLocation}
      />}
      <Text style={styles.header1}>Categoría</Text>
      <FinalCustomDropDowPicker value={category} setValue={setCategory} ></FinalCustomDropDowPicker>

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
      <Image source = {{uri: image}} style={styles.image}/>
      <View style={styles.container}>
        
            <TouchableOpacity
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
                <Text style={{ color: '#000',paddingVertical: 10}}>
                  Pulsa para seleccionar una imagen
                </Text>
            </TouchableOpacity>
        
      </View>
      <View style = {{flex:0, flexDirection:'row', justifyContent:"center"}}>
      
      <FinalButton 
          text="Cancelar" 
          type = 'Mapa2'
          onPress={onCancelPressed}
          />
      <FinalButton 
          text="Guardar" 
          type = 'Mapa'
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

export const DayTimeSlots = (props) => {
    const [isEnabled, setIsEnabled] = useState(props.slots.length!=0);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const [slots, setSlots] = useState([...props.slots])

    const deleteSlot = (slot) => {
        var index = slots.indexOf(slot)
        setSlots([...slots.slice(0,index), ...slots.slice(index+1)])
    }

    const addSlot = () =>{
        setSlots([...slots,{from:null,to:null}])
    }
    const setValueFrom = (index,value) => {
        var newSlots = [...slots]
        newSlots=[...newSlots.slice(0,index), {from:value, to:newSlots[index].to}, ...newSlots.slice(index+1)]
        setSlots(newSlots)
    }
    const setValueTo = (index,value) => {
        var newSlots = [...slots]
        newSlots=[...newSlots.slice(0,index), {from:newSlots[index].from, to:value}, ...newSlots.slice(index+1)]
        setSlots(newSlots)
    }
    useEffect(()=>{
      var day = props.day
      props.setOpeningHours(currValue => ({
        ...currValue,
        [day]:slots
      }))
    },[slots])
    
    return (
      <View
        style={{width:'100%',}}
      >
        
        <View style = {{flex:0, flexDirection:'row', alignItems: "center"}}>
            {/* <Text style={styles.header3}>
                {props.day}
            </Text>
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{marginRight:10}}
            /> */}
            <SelectionButton 
              label = {props.day}
              onPress = {toggleSwitch}
              value={isEnabled}
            />
            
        </View>
        <View style={{flexDirection:'column',marginLeft:'12%'}}>
            {isEnabled && slots.map((slot,index)=>
                {
                    return(
                        <View style = {{flex:0, flexDirection:'row', alignItems: "center", marginBottom:10}}>
                            <DropDownTimePicker fromTime time={slot.from} setTime={setValueFrom} index={index} ></DropDownTimePicker>
                            <Text style={{marginLeft:0, marginRight:6, fontSize:30, marginBottom:25, color:'#7D7ACD'}}>-</Text>
                            <DropDownTimePicker time={slot.to} setTime={setValueTo} index={index}></DropDownTimePicker>
                            {slots.length>1 && <TouchableOpacity style={styles.closeButtonParent} onPress={()=>deleteSlot(slot)}>
                                <Image style={styles.closeButton} source={require("../../assets/image/Delete-X-Button.png")} />
                            </TouchableOpacity>}
                           
                        </View>
                    )
                })
            }
            {
                isEnabled && slots.length==0 && addSlot()
            }
            {isEnabled && slots.length!=0 && slots[slots.length-1].from!=null && slots[slots.length-1].to!=null &&
            <TouchableOpacity style={styles.closeButtonParent} onPress={addSlot}>
                <Image style={styles.addButton} source={require("../../assets/image/AddButton.png")} />
            </TouchableOpacity>
            }
        </View>
      </View>
    );
  
  };

function Mapa ({isVisibleMap, setIsVisibleMap, location,setLocation}){
    const [newRegion, setNewRegion] = useState( location)
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
                    setNewRegion(location)
                  }}
                style={{height:300,width:300}}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        
                            <MapView 
                                style={styles.mapStyle}
                                initialRegion={location}
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
                                        setNewRegion(location)
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

const styles = StyleSheet.create({
    mainContainer:{
      alignItems:'center',
      height:'100%',
      backgroundColor:'white'
    },
    container:{
      backgroundColor: '#fff',
      borderRadius: 8,
      marginVertical: 20
    },
    title: {
      textAlign:'center',
      fontFamily:'MuseoModernoBold',
      fontSize:27,
      marginBottom:10,
    },
    sectionStyle:{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 40,
        borderRadius: 5,
    },
    image:{
      width,height,
      resizeMode: 'contain',
      alignItems: 'center',
    },
    imageStyle: {
      padding: 15,
      margin: 10,
      height: 25,
      width: 25,
      resizeMode: 'stretch',
      alignItems: 'center',
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
    header3:{
      fontSize:15, 
      fontWeight:"bold" 
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
    closeButton: {
        height: 30,
        width: 30,
        marginBottom:23,
     },
    closeButtonParent: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft:5,
        width:20
    },
    closeButtonView:{
        flexDirection:'column', position:'absolute', top: 35, alignSelf:'flex-end'
    },
    dropDown:{
      marginLeft:36,

    },
    addButton:{
        height: 35,
        width: 35,
        marginBottom:23,
        marginTop:-10,
        alignSelf:'flex-start'
    }
  });

export default ConfigureBusiness;