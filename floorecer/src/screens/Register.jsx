import React ,{useState} from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import Logo from '../../assets/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
const Register = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [numerodetelefono,setNumber]=useState('');

    const {height}=useWindowDimensions();
    const onInicioPressed=()=>{
        console.warn('MAPA');
    };
    const onOlvidadoPressed=()=>{
        console.warn('Recuperar');
    };
    const onRegistrarPressed=()=>{
      console.warn('Registro');
    };
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
            value={email} 
            setValue={setPassword}
        />
        <CustomInput 
            placeholder = "Numero De telefono" 
            value={password} 
            setValue={setNumber}
            secureTextEntry={true}
        />
        <CustomButton text="Registrar Como Cliente" onPress={onInicioPressed}/>
        
         <CustomButton text="Registrar Como Comercio" onPress={onInicioPressed}/>
        
       
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