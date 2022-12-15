import React ,{useEffect, useState} from 'react';
import { useCallback } from 'react';
import { Modal,Image, Text, StyleSheet, StatusBar,View, SafeAreaView,ImageBackground,Dimensions, TouchableOpacity,ScrollView,LogBox } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import CustomInput from '../components/CustomInput';
import PerfilPublico from '../components/PerfiloSVG'
import image from '../../assets/image/back2.jpeg'
import frtuatia from '../../assets/image/frutaria.jpeg'
import claudia from '../../assets/image/fruteriaclaudia.jpeg'
import Pasos from '../../assets/image/pasos.jpeg'
import Svg from 'react-native-svg';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import * as SplashScreen from 'expo-splash-screen';
import IconQR from '../../assets/image/IconQR.png';
import SvgQRCode from 'react-native-qrcode-svg';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import ProfileButton from '../components/ProfileButton';
import { ImageSlider } from "react-native-image-slider-banner";
import gardenbackground from '../../assets/image/gardenbackground.jpeg'
import Profileimage from '../components/profile/Profileimage'
import { useNavigation } from '@react-navigation/native';
import { getItemAsync } from 'expo-secure-store'; 
LogBox.ignoreAllLogs();

export default function Prueba() {
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [auth0,setAuth0] = useState([]);
  const navigation=useNavigation();
  const [fontsLoaded] = useFonts({
    MuseoModernoRegular: require("../../assets/fonts/MuseoModerno-Regular.ttf"),
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
})
  
  const openGarden = () => {
    navigation.navigate('garden')
  }
  useEffect(()=> {
   const loadAuth = async () => {
    const auth =  JSON.parse( await getItemAsync('auth0'));
     setAuth0(auth);
   }

     loadAuth();
  }
  
  , []);
  return (

    <SafeAreaView  styles = {styles.container}>
      <ScrollView>
      <TouchableOpacity  onPress={openGarden}>
      <Image   style = {styles.gardenbackground }source={gardenbackground} />
            </TouchableOpacity>
      <PerfilPublico/>     
        <Profileimage style = {styles.profileimage}/>
        <Text style = {styles.UserName} >
          @{auth0.name}
        </Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            { auth0 != null &&
              <SvgQRCode
                style = {{width: '100%'}} 
                value={auth0.uid}
              /> 
            }
            <View style={{marginTop:20, marginBottom:-25}}><ProfileButton
           text = 'Cerrar'
           onPress ={() => setModalVisible(!modalVisible)} /></View>
           

          </View>
        </View>
      </Modal>
      <TouchableOpacity style={styles.touchable} onPress={() =>setModalVisible(true)}>
                <Image style={styles.qrCode} source={IconQR} />
              </TouchableOpacity >
              <View style = {styles.slider}>
    <ImageSlider
    data={[
        {img: `${frtuatia}`},
        {img : `${claudia}`},
       
    ]}
    localImg  ={true}
    autoPlay={false}
    onItemChanged={(item) => console.log("item", item)}
    closeIconColor="#fff"
/>
</View>
<TouchableOpacity style={styles.touchable1} onPress={() =>console.log("jeje")}>
                <Image style={styles.pasos} source={Pasos} />
              </TouchableOpacity >
      </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,

  }, garden: {
    height: 150,
    backgroundColor: 'green'
},
  
 
 touchable :{
 position :"absolute",
 "left": windowWidth*0.44,
  "top": windowHeight*0.65,
  
 },
 touchable1 :{
  position : "absolute",
  "left": windowWidth*0.17,
  top :"77.8%",
   
  },
pasos : {
  borderRadius :20,
  height:250,
  width:250,

},

  centeredView: {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
},
 modalView: {
  margin: 60,
 backgroundColor: "white",
 borderRadius: 20,
 padding: 60,
 alignItems: "center",
 shadowColor: "#000",
 
},
  qrCode:{
    height:73,
    width:73,
  },
    slider: {
    position : "absolute",
    top :"55.99%",
    

    },
    profileimage: {
      position :"absolute",
      "left": windowWidth*0.35,
       "top": windowHeight*0.40,
    },
    UserName : {

      position :"absolute",
      "left": "38%",
       "top": windowHeight*0.59,
       fontFamily:'MuseoModernoBold',
       fontSize : 20

    }

 
});