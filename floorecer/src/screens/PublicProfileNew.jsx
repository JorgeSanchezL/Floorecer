import React ,{useEffect, useState} from 'react';
import { useCallback } from 'react';
import { Modal,Image, Text, StyleSheet, StatusBar,View, SafeAreaView,ImageBackground,Dimensions, TouchableOpacity,ScrollView } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import CustomInput from '../components/CustomInput';
import PerfilPublicoNew from '../components/PerfiloPublicoSVG'
import image from '../../assets/image/back2.jpeg'
import frtuatia from '../../assets/image/fruteria1.jpeg'
import claudia from '../../assets/image/fruteria2.jpeg'
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
export default function Prueba() {
  const [modalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState(null);
  const [followers,setFollowers] = useState(14);
  const [estado,setEstado] = useState("follow")
  const navigation=useNavigation();
  const [fontsLoaded] = useFonts({
    MuseoModernoRegular: require("../../assets/fonts/MuseoModerno-Regular.ttf"),
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf"),
    Poppins : Poppins_300Light,
})
  
 const updateState = ()  => {
    if(estado == "follow") {
        setFollowers(followers+1)
        setEstado("unfollow")
    }
   else {
    setFollowers (followers-1)
    setEstado("follow")

   }

 }
 
  return (

    <SafeAreaView  styles = {styles.container}>
      <ScrollView>
      <PerfilPublicoNew/>     
      <Text style = {styles.UserName} >
          @Alexandra
        </Text>
      <Text style = {styles.followers} >
          10
        </Text>
        <Text style = {styles.following} >
        {followers}

        </Text>
         
        <TouchableOpacity  style = {styles.button1}
        onPress={updateState}
>
        <Text style = {styles.seguir}> {estado}</Text>
        </TouchableOpacity>

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
<View style={styles.touchable1} onPress={() =>console.log("jeje")}>
                <Image style={styles.pasos} source={Pasos} />
              </View >
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
  top :"75.8%",
   
  },
pasos : {
  borderRadius :30,
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
    top :"51.99%",
    

    },
    profileimage: {
      position :"absolute",
      "left": windowWidth*0.35,
       "top": windowHeight*0.40,
    },
    followers : {

      position :"absolute",
      "left": "20%",
      "top": windowHeight*0.4,
       fontFamily:'MuseoModernoBold',
       fontSize : 20

    },
    following : {

        position :"absolute",
        "left": "85%",
        "top": windowHeight*0.4,
         fontFamily:'MuseoModernoBold',
         fontSize : 20
  
      },
      button1 : {
        "position": "absolute",
        "width": 116.97,
        "height": 42,
        "left": 138,
        "top": windowHeight*0.40,
        "backgroundColor": "#7D7ACD",
        "borderTopLeftRadius": 25,
        "borderTopRightRadius": 25,
        "borderBottomRightRadius": 25,
        "borderBottomLeftRadius": 25
      },
     seguir : {

            "position": "absolute",
            "height": 21.6,
            "left": "25%",
            "top": windowHeight*0.012,
            "fontFamily": "Poppins",
            "fontStyle": "normal",
            "fontSize": 14,
            "color": "#F3FEFF"
        },
        UserName : {

            position :"absolute",
            "left": "38%",
             "top": windowHeight*0.33,
             fontFamily:'MuseoModernoBold',
             fontSize : 20
      
          }

     
 
});