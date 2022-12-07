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

    
    const onRegisterPressedCliente=()=>{
      if(numerodetelefono!='' && password!='') {
        SignUpNowCliente();
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
        const response = await fetch(`${BACKEND_URL}/user-authe/userRegister`, {
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
            numberphone : numerodetelefono,
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