import React ,{useState} from 'react';
import { Alert,StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import Logo from '../../assets/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';

//import { response } from 'express';
const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [numerodetelefono,setNumber]=useState('');
    const navigation = useNavigation();


    const {height}=useWindowDimensions();
    const onRegisterPressedCliente=()=>{
      console.log(checkInputs());
      if(checkInputs()) {
        if(isValidEmail(email))
                SignUpNowCliente();
      }
    };
    const onRegisterPressedComercio = () => {
      if(checkInputs()) {
        if(isValidEmail(email))
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
      console.log("wow")
      try {
        const response = await fetch("http://192.168.1.143:5000/user-authe/userRegister", {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            numberphone : numerodetelefono,
            isBusinessOwner : false,

        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          
        }
        
        
        );
        console.log(response.status);
        
        if(response.status==200){
          Alert.alert('Bravo', '¡ se ha creado la cuenta con exito !', [
            
            { text: 'OK', onPress: () => navigation.navigate("login") },
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
    const SignUpComercio = async () => { 
      console.log("wow")
      try {
        const response = await fetch("http://192.168.1.143:5000/user-authe/userRegister", {
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password,
            numberphone : numerodetelefono,
            isBusinessOwner : true,
        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
          
        }
        
        
        );
        console.log(response.status);
        
        if(response.status==200){
          Alert.alert('Bravo', '¡ se ha creado la cuenta con exito !', [
            
            { text: 'OK', onPress: () => navigation.navigate("login") },
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
            placeholder = "Contraseña" 
            value={password} 
            setValue={setPassword}
            secureTextEntry={true}
        />
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
        <CustomButton text="Registrar Como Cliente" onPress={onRegisterPressedCliente}/>
        
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