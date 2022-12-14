import React ,{useState} from 'react';
import { Alert,Image,View,StyleSheet,TextInput ,Dimensions,TouchableOpacity,Text,useWindowDimensions} from 'react-native';
import IniciarSVG from '../components/IniciarSVG'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

import {BACKEND_URL} from '@env';

import AuthContext from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function LoginNew() {   
const [email,setEmail]=useState('');
const [password,setPassword]=useState('');
const {height}=useWindowDimensions();
const [coordinations , setCoordinations] =useState("")

const { signIn } = React.useContext(AuthContext);

const navigation = useNavigation();
const onInicioPressed=()=>{ log(); };
const onOlvidadoPressed=()=>{
    console.warn('Recuperar');
};
const log = async () => { 
  const response = await signIn(email, password);
  if (response && response.signInError) {
    Alert.alert('Alerta',
      response.signInError);
  }

}
    console.log(windowWidth)
    console.log(windowHeight)
        const [fontsLoaded] = useFonts({
          Poppins_300Light,
        });
        
        if (!fontsLoaded) {
          return null;
        }
return (
<SafeAreaView style={styles.container}>
<IniciarSVG/>
<TextInput style = {styles.text}
value={email} 
onChangeText={setEmail}
/>
<TextInput style = {styles.text1}
 value={password} 
 onChangeText={setPassword}
 secureTextEntry={true}
/>
<TouchableOpacity  style = {styles.button}
onPress = {onInicioPressed}
>
<Text style = {styles.completar}> Completar</Text>
</TouchableOpacity>
<TouchableOpacity  style = {styles.button1}
onPress={() => navigation.navigate('register')}
>
<Text style = {styles.Registrate}> Registrate</Text>
</TouchableOpacity>
</SafeAreaView>
);


}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    
      backgroundColor : 'white'
    },
    text: {
      fontSize : 15,
      color: "black",
      lineHeight: 20,
      backgroundColor: "#000000c0",
      "position": "absolute",
      "width": 300,
      "height": 37,
      "left": windowWidth*0.10,
      "top": windowHeight*0.415,
      "backgroundColor": "rgba(253, 178, 109, 0.4)",
      "backdropFilter": "blur(32.5px)",
      "borderTopLeftRadius": 10,
      "borderTopRightRadius": 10,
      "borderBottomRightRadius": 10,
      "borderBottomLeftRadius": 10
    },
    text1: {
        fontSize : 15,
        color: "black",
        lineHeight: 20,
        backgroundColor: "#000000c0",
        "position": "absolute",
        "width": 200,
        "height": 37,
        "left": windowWidth*0.11,
        "top": windowHeight*0.51,
        "backgroundColor": "rgba(253, 178, 109, 0.4)",
        "backdropFilter": "blur(32.5px)",
        "borderTopLeftRadius": 10,
        "borderTopRightRadius": 10,
        "borderBottomRightRadius": 10,
        "borderBottomLeftRadius": 10
      },
      completar : {
        "fontFamily": "Poppins_300Light",
        "fontStyle": "normal",
        "fontWeight": "600",
        "fontSize": 16,
        "lineHeight": 35,
        "textAlign": "center",
        "color": "#FFFFFF"
     },
     button : {
        backgroundColor: '#FC993D',
        padding: 10,
        "position": "absolute",
        "width": 300,
        "height": 57,
        "left": windowWidth*0.1,
        "top": windowHeight*0.6,
      "borderTopLeftRadius": 10,
      "borderTopRightRadius": 10,
      "borderBottomRightRadius": 10,
      "borderBottomLeftRadius": 10 
      },
      button1 : {
        "boxSizing": "border-box",
        "position": "absolute",
        "width": 300,
        "height": 57,
        "left": windowWidth*0.1,
        "top": windowHeight*0.8,
        "borderWidth": 2,
        "borderColor": "#FDB471",
        "borderStyle": "solid",
        "borderTopLeftRadius": 10,
        "borderTopRightRadius": 10,
        "borderBottomRightRadius": 10,
        "borderBottomLeftRadius": 10
      },
      Registrate : {
        
        "fontFamily": "Poppins_300Light",
        "fontStyle": "normal",
        "fontWeight": "600",
        "fontSize": 16,
        "lineHeight": 50,
        "textAlign": "center",
        "color": "#FDB572"

          }

      

    });


