import React ,{useState} from 'react';
import { StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import Logo from '../../assets/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import Home from './Home';
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {height}=useWindowDimensions();

    const navigation=useNavigation();
    const onInicioPressed=()=>{
        console.warn('MAPA');

        navigation.navigate('home');
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
        <CustomButton text="Iniciar Sesión" onPress={onInicioPressed}/>
        <CustomButton 
            text="He olvidado la contraseña"
            onPress={onOlvidadoPressed}
            type="terciario"
        />
        <CustomButton 
            text="No tienes cuenta aún? Regístrate"
            onPress={onRegistrarPressed}
            type="terciario"
        />
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
  
  export default Login;