import React ,{useState} from 'react';
import { Alert,StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import { HelperText } from 'react-native-paper';
import Logo from '../../assets/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';
import {BACKEND_URL} from '@env'

//import { response } from 'express';
const Register = () => {
    const [email,setEmail]=useState('');
    const [username, setUsername]=useState('')
    const [password,setPassword]=useState('');
    const [numerodetelefono,setNumber]=useState('');
    const navigation = useNavigation();


    const {height}=useWindowDimensions();

    const getUsernameForSearch = () => {
      let result = []
      for (let index = 0; index < username.length; index++) {
        result[index] = username.substring(0, index+1)
      }
      return result
    }

    const sendEmail = async (user) => {
      try {
        const response = await fetch(`http://${BACKEND_URL}/user-verification/mail`, { 
          method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Authorization-Header': ''
          },
          body: JSON.stringify({
            user: user
          })
        });
        console.log(user)
      } catch (err) {
        console.log(err)
      }
    }
    const onRegisterPressedCliente=()=>{
      if(numerodetelefono!='' && password!='' && checkPassword() && checkPhoneNumber()) {
      console.log(checkInputs());
      if(checkInputs()) {
        if(isValidEmail(email))
                SignUpNowCliente();
      }
    }
    };
    const onRegisterPressedComercio = () => {
      if(numerodetelefono!='' && password!='' && checkPassword() && checkPhoneNumber()) {
      if(checkInputs()) {
        if(isValidEmail(email))
        SignUpComercio();
      }
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
        console.log(`http://${BACKEND_URL}/user-authe/userRegister`)
        const response = await fetch(`http://${BACKEND_URL}/user-authe/userRegister`, {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            username: username,
            usernameForSearch: getUsernameForSearch(),
            password: password,
            numberphone : numerodetelefono,
            isBusinessOwner : false,

        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          
        }
        
        
        );
        //console.log(Object.getOwnPropertyNames(response));
        
        if(response.status==200){
          const res=await response.json()
          await SecureStore.setItemAsync('userToken', JSON.stringify(res))
          Alert.alert('Bravo', '¡ se ha creado la cuenta con exito !', [
            
            { text: 'OK', onPress: () => { sendEmail(response);navigation.navigate("notVerified") } }, //Cambiado para la UT de verificar usuario :)
          ]);
        }
        else if(response.status == 401 ) {
          Alert.alert(':(', '¡ Ya existe una cuenta con ese correo !', [
            
            { text: 'OK' },
          ]);
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
        console.log(err)
      }
    }
    const SignUpComercio = async () => { 
      console.log("woow")
      try {
        const response = await fetch(`http://${BACKEND_URL}/user-authe/userRegister`, {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            username: username,
            usernameForSearch: getUsernameForSearch(),
            password: password,
            numberphone : numerodetelefono,
            isBusinessOwner : true,
        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          
        }
        
        
        );
        console.log(Object.getOwnPropertyNames(response.status));
        
        if(response.status==200){
          await SecureStore.setItemAsync('userToken', response)
          Alert.alert('Bravo', '¡ se ha creado la cuenta con exito !', [
            
            { text: 'OK', onPress: () => { sendEmail(response); navigation.navigate("notVerified") } }, //Cambiado para la UT de verificar usuario :)
          ]);
        }
        else if(response.status == 401 ) {
          Alert.alert(':(', '¡ Ya existe una cuenta con ese correo !', [
            
            { text: 'OK' },
          ]);
        }
        else {
          Alert.alert(':(', '¡ Hay un problema de conexion !', [
            
            { text: 'OK'},
          ]);
        }

          
      } catch (err) {
        console.log(err)
      }
    }
 function isValidEmail(email) {
  if( !(/\S+@\S+\.\S+/.test(email))) {

    Alert.alert(':(', '¡email no valido !', [
            
      { text: 'OK'},
    ]);

  }
    return /\S+@\S+\.\S+/.test(email);
  }

  function checkInputs () {
    console.log(email)
      if(email == '' || password == '' || numerodetelefono == '') {
        Alert.alert(':(', '¡ Hay que rellenar todos los campos para continuar !', [
            
          { text: 'OK'},
        ]);
return false;;
      }

return true;

  }
  function checkPhoneNumber()  {
        return numerodetelefono.length == 9 ;
            }
 function checkPassword()
{
    var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return re.test(password)  ;
}

    return (
      <View style={styles.container}>
        <Image source={Logo} style={[styles.logo,{height:height *0.3}]} 
        resizeMode="contain" />

        <CustomInput 
            placeholder = "Correo" 
            value={email} 
            setValue={setEmail}
        />
        <CustomInput 
            placeholder = "Nombre de usuario" 
            value={username} 
            setValue={setUsername}
        />
        <CustomInput 
            placeholder = "Contraseña" 
            value={password} 
            setValue={setPassword}
            secureTextEntry={true}            
        />
        {!checkPassword() && password != '' ? <HelperText type="error" visible={true}>
          La contraseña debe contener al menos 6 carácteres, un símbolo, un número, una mayúscula y una minúscula.
        </HelperText> : null}
        
        <CustomInput 
            placeholder = "Confirmar Contraseña" 
            value={password} 
           // setValue={setPassword}
        />
        <CustomInput 
            placeholder = "Numero De telefono" 
            value={numerodetelefono} 
            setValue={setNumber}
            keyboardType = 'numeric'
        />
        {!checkPhoneNumber() && numerodetelefono!=''? <HelperText type="error" visible={true}>
             El número de teléfono debe contener 9 carácteres.
        </HelperText> : null}
                       
        <CustomButton text="Registrar Como Cliente" onPress={
          
          onRegisterPressedCliente}/>
        
        <CustomButton text="Registrar Como Comercio" onPress={onRegisterPressedComercio}/>
        
       
      </View>

    );
  }
  
  const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        padding:20,
    },
    logo: {
      width:'70%',
      maxWidth: 300,
      maxHeight: 200,
    },
  });
  
  export default Register;