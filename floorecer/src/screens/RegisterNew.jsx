import React ,{useState} from 'react';
import { Alert,Image,View,StyleSheet,TextInput ,Dimensions,TouchableOpacity,Text,useWindowDimensions} from 'react-native';
import { HelperText } from 'react-native-paper';
import RegistrarSVG from '../components/RegistrarSVG'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts, Poppins_300Light } from '@expo-google-fonts/poppins';
import { useNavigation } from '@react-navigation/native';

import {BACKEND_URL} from '@env';

import AuthContext from '../context/AuthContext';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function RegisterNew() {  
    const [email,setEmail]=useState('');
    const [username, setUsername]=useState('')
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const navigation = useNavigation();


    const {height}=useWindowDimensions();

    const getUsernameForSearch = () => {
      let result = []
      for (let index = 0; index < username.length; index++) {
        result[index] = username.substring(0, index+1)
      }
      return result
    }

    
    const onRegisterPressedCliente=()=>{
      if( checkInputs() &&  isValidEmail(email)) {
        SignUpNowCliente();
      }
    };
    const onRegisterPressedComercio = () => {
        if( checkInputs() &&  isValidEmail(email)) {
        SignUpComercio();
      }

    };
    const onOlvidadoPressed=()=>{
        console.warn('Recuperar');
    };
    const onRegistrarPressed=()=>{
      console.warn('Registro');
    };
    const SignUpNowCliente = async () => { 
      
      try {
        const response = await fetch(`http:192.168.1.143:5000/user-authe/userRegister`, {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            username: username,
            usernameForSearch: getUsernameForSearch(),
            password: password,
            numberphone : '123456789',
            isBusinessOwner : false,

        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          
        }
        
        
        );
        if(response.status==200){
          //const res=await response.json()
          //await SecureStore.setItemAsync('userToken', JSON.stringify(res))
          Alert.alert('Bravo', '¡ se ha creado la cuenta con exito !', [
            
            { text: 'OK', onPress: () => { navigation.navigate("notVerified") } }, //Cambiado para la UT de verificar usuario :)
          ]);
        }
        else if(response.status == 401 ) {
          Alert.alert(':(', '¡ Ya existe una cuenta con ese correo !', [
            
            { text: 'OK' },
          ]);
        } else if(response.status == 400) {
          Alert.alert(':(', (await response.json()).message)
        }
        else if(response.status == 406 ) {
          Alert.alert(':(', '¡ La contraseña es demasiado débil !', [
            
            { text: 'OK' },
          ]);
        }
        else {
          Alert.alert(':(', '¡ Hay un problema de conexion !', [
            
            { text: 'OK'},
          ]);
        }

          
      } catch (err) {
        Alert.alert(err)
      }
    }
    const SignUpComercio = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/user-authe/userRegister`, {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            username: username,
            usernameForSearch: getUsernameForSearch(),
            password: password,
            numberphone : '123456789',
            isBusinessOwner : true,
        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          
        }
        
        
        );
        if(response.status==200){
          //const res=await response.json()
          //await SecureStore.setItemAsync('userToken', JSON.stringify(res))
          Alert.alert('Bravo', '¡ se ha creado la cuenta con exito !', [
            
            { text: 'OK', onPress: () => { navigation.navigate("notVerified") } }, //Cambiado para la UT de verificar usuario :)
          ]);
        }
        else if(response.status == 401 ) {
          Alert.alert(':(', '¡ Ya existe una cuenta con ese correo !', [
            
            { text: 'OK' },
          ]);
        } else if(response.status == 400) {
          Alert.alert(':(', (await response.json()).message)
        }
        else if(response.status == 406 ) {
          Alert.alert(':(', '¡ La contraseña es demasiado débil !', [
            
            { text: 'OK' },
          ]);
        }
        else {
          Alert.alert(':(', '¡ Hay un problema de conexion !', [
            
            { text: 'OK'},
          ]);
        }

          
      } catch (err) {
        Alert.alert(err)
      }
    }
   
    function checkPassword()
    {
        console.log("merde")
        var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
          
        return re.test(password)  ;
    }
    function checkInputs () {
        console.log(email)
          if(email == '' || password == '' || confirmPassword == '') {
            Alert.alert(':(', '¡ Hay que rellenar todos los campos para continuar !', [
                
              { text: 'OK'},
            ]);
    return false;;
          }
          if(!checkPassword()) {
            Alert.alert(':(', '¡ password must contains 8 letters , a Big Capital , a symbol and a number !', [
                
                { text: 'OK'},
              ]);
      return false;;


          }
    if(password != confirmPassword) {
        Alert.alert(':(', '¡ password mismatch !', [
                
            { text: 'OK'},
          ]);
  return false;;


    }
    return true;
    
      }
      function isValidEmail(email) {
        if( !(/\S+@\S+\.\S+/.test(email))) {
      
          Alert.alert(':(', '¡email no valido !', [
                  
            { text: 'OK'},
          ]);
      
        }
          return /\S+@\S+\.\S+/.test(email);
        }




        const [fontsLoaded] = useFonts({
          Poppins_300Light,
        });
        
        if (!fontsLoaded) {
          return null;
        }
return (
<SafeAreaView style={styles.container}>
<RegistrarSVG/>
<TextInput style = {styles.text}
value={email} 
onChangeText={setEmail}
/>
<TextInput style = {styles.text1}
value={username} 
onChangeText={setUsername}
/>
<TextInput style = {styles.text2}
value={password} 
onChangeText={setPassword}
 secureTextEntry={true}
/>
<TextInput style = {styles.text3}
value={confirmPassword} 
onChangeText={setConfirmPassword}
 secureTextEntry={true}
/>
<TouchableOpacity  style = {styles.button}
onPress = {onRegisterPressedCliente}
>
<Text style = {styles.completar}> Registrar como cliente</Text>
</TouchableOpacity>
<TouchableOpacity  style = {styles.button1}
onPress = {onRegisterPressedComercio}

>
<Text style = {styles.Registrate}> Registrar como comercio</Text>
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
      "top": windowHeight*0.39,
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
        "width": 250,
        "height": 37,
        "left": windowWidth*0.10,
        "top": windowHeight*0.48,
        "backgroundColor": "rgba(253, 178, 109, 0.4)",
        "backdropFilter": "blur(32.5px)",
        "borderTopLeftRadius": 10,
        "borderTopRightRadius": 10,
        "borderBottomRightRadius": 10,
        "borderBottomLeftRadius": 10
      },
      text2: {
        fontSize : 15,
        color: "black",
        lineHeight: 20,
        backgroundColor: "#000000c0",
        "position": "absolute",
        "width": 170,
        "height": 37,
        "left": windowWidth*0.10,
        "top": windowHeight*0.57,
        "backgroundColor": "rgba(253, 178, 109, 0.4)",
        "backdropFilter": "blur(32.5px)",
        "borderTopLeftRadius": 10,
        "borderTopRightRadius": 10,
        "borderBottomRightRadius": 10,
        "borderBottomLeftRadius": 10
      },
      text3: {
        fontSize : 15,
        color: "black",
        lineHeight: 20,
        backgroundColor: "#000000c0",
        "position": "absolute",
        "width": 170,
        "height": 37,
        "left": windowWidth*0.10,
        "top": windowHeight*0.665,
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
        "top": windowHeight*0.77,
      "borderTopLeftRadius": 10,
      "borderTopRightRadius": 10,
      "borderBottomRightRadius": 10,
      "borderBottomLeftRadius": 10 
      },
      button1 : {
        backgroundColor: '#7D7ACD',
        "boxSizing": "border-box",
        "position": "absolute",
        "width": 300,
        "height": 57,
        "left": windowWidth*0.1,
        "top": windowHeight*0.87,
        "borderWidth": 2,
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
        "color": "#FFFFFF"

          }

      

    });


