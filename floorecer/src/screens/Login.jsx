import React ,{useState} from 'react';
import { Alert,StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import Logo from '../../assets/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

import {BACKEND_URL} from '@env';

import AuthContext from '../context/AuthContext';

const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {height}=useWindowDimensions();

    const { signIn } = React.useContext(AuthContext);

    const navigation = useNavigation();
    const onInicioPressed=()=>{ log(); };
    const onOlvidadoPressed=()=>{
        console.warn('Recuperar');
    };
    const log = async () => { 
      const response = await signIn(email, password);
      if (response) {
        Alert.alert('Alerta',
          response.signInError);
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
        <Text style={{color :'gray',fontWeight : 'bold'}}
      onPress={() => navigation.navigate('register')}>
  ¿No tienes cuenta aún? 
  <Text style={{color :'blue',fontWeight : 'bold'}}
  >
    Regístrate
  </Text>
</Text>
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