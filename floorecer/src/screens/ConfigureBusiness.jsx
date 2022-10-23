import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, useWindowDimensions, Dimensions } from "react-native";
import CustomButton from '../components/CustomButton';
import ImageCarouselPickingImages from '../components/ImageCarouselPickingImages';
import CustomDropDownPiker from '../components/DropDownPiker';
import DropDownTimePicker from "../components/DropDownTimePicker";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { Image, TouchableOpacity, Modal, Icon} from "react-native";
import MapView from 'react-native-maps'


const diasDeLaSemana = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]


const ConfigureBusiness = () => {

  const getBusiness = async () => {
    try {
      const response = await fetch('http://192.168.1.143:5000/business/getBusiness', {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const body = await response.json();
      setResponse(body)
    } catch (error) {
      console.log(err)
      return {}
    }
  }
  useEffect(() => {getBusiness()}, [])


  const [shopName, setShopName] = useState("");
  const [nif, setNif] = useState("");
  const [address, setAddress] = useState("");
  const [openingHours, setOpeningHours] = useState(null);
  const [isVisibleMap, setIsVisibleMap] = useState(false)
  const [location, setLocation] = useState(null)
  const {height}= useWindowDimensions();
  const {width} = Dimensions.get("window");

  const images =[]
  
  const setResponse = (body) => {
    setShopName(body.name)
    setNif(body.NIF)
    setAddress(body.address)
    setOpeningHours(body.openingHours)
    setLocation(body.location)
  }

  const updateBusiness = async () => {
    try {
      const api_call = await fetch('http://192.168.1.143:5000/business/updateBusiness', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    uid: 'VWFVMwQ5Q2gxpRENlPbS',
                    body: {
                      name:shopName,
                      NIF:nif,
                      address:address,
                      openingHours:openingHours,
                      location:location
                    }
                })
            });
            const response = await api_call.json();

            if (response.saved) {
                navigation.navigate('newBusiness');
            } else { throw -1; }
    } catch (error) {
      console.log(err)
    }
  }
  const onSavePressed = () =>{
    console.log("save pressed")
    updateBusiness()
    // ir a "Ver mis comercios"
  };
  const onCancelPressed = () =>{
    // ir a "Ver mis comercios"
  }

  return(
  <View style={[styles.mainContainer]}>

    <Text style={[styles.title,{marginTop:height * 0.05}]}>{shopName}</Text>

    <ScrollView 
      nestedScrollEnabled={true}
      style={{width,height: height * 0.79, paddingHorizontal:10}}>
        
      <MyTextInput name = 'Nombre' value={shopName} setValue={setShopName}/>
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
      <Text style={styles.header2}>Categoría</Text>
      <CustomDropDownPiker></CustomDropDownPiker>

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
    
      <View style = {{flex:0, flexDirection:'row', justifyContent:"center"}}>
      
        <CustomButton 
            text="Cancelar" 
            type = 'cuaterciario'
            onPress={onCancelPressed}
            />
        <CustomButton 
            text="Guardar" 
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
      <Text style={{ marginTop: props.name ? 10 : 0 ,height: !props.name ? 10 : null, fontSize:20, fontWeight:"bold" }}>
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
      console.log(JSON.stringify(props.openingHours))
    },[slots])
    
    return (
      <View
        style={{width:'100%',}}
      >
        
        <View style = {{flex:0, flexDirection:'row', alignItems: "center"}}>
            <Text style={styles.header3}>
                {props.day}
            </Text>
            <Switch
                onValueChange={toggleSwitch}
                value={isEnabled}
                style={{marginRight:10}}
            />
            <Text style={styles.header3}>{isEnabled?"Abierto":"Cerrado"}</Text>
        </View>
        <View >
            {isEnabled && slots.map((slot,index)=>
                {
                    return(
                        <View style = {{flex:0, flexDirection:'row', alignItems: "center", marginBottom:10}}>
                            <DropDownTimePicker fromTime time={slot.from} setTime={setValueFrom} index={index}></DropDownTimePicker>
                            <Text style={{marginLeft:10, marginRight:10}}>to</Text>
                            <DropDownTimePicker time={slot.to} setTime={setValueTo} index={index}></DropDownTimePicker>
                            {slots.length>1 && <TouchableOpacity style={styles.closeButtonParent} onPress={()=>deleteSlot(slot)}>
                                <Image style={styles.closeButton} source={require("../../assets/Delete-Red-X-Button.png")} />
                            </TouchableOpacity>}
                           
                        </View>
                    )
                })
            }
            {
                isEnabled && slots.length==0 && addSlot()
            }
            {isEnabled && slots.length!=0 && slots[slots.length-1].from!=null && slots[slots.length-1].to!=null &&
            <CustomButton text="Añadir horario" type="secundario" onPress={addSlot}></CustomButton>}
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
                                <CustomButton 
                                    text="Cancelar" 
                                    type = 'cuaterciario'
                                    onPress={() => {
                                        setIsVisibleMap(false);
                                        setNewRegion(location)
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

const styles = StyleSheet.create({
    mainContainer:{
      alignItems:'center',
      height:'100%'
    },
    title: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'black',
      textAlign:'center',
      textTransform:"uppercase"
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
    header2:{
      marginTop:10, 
      fontSize:20, 
      fontWeight:"bold" 
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
     },
    closeButtonParent: {
        justifyContent: "center",
        alignItems: "center",
        marginLeft:5,
    },
    closeButtonView:{
        flexDirection:'column', position:'absolute', top: 35, alignSelf:'flex-end'
    }
  });

export default ConfigureBusiness;