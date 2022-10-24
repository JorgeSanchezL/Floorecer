import React ,{useState} from 'react';
import { Alert,StyleSheet, View, Text, Image, useWindowDimensions } from 'react-native';
import * as SecureStore from 'expo-secure-store'
import Logo from '../../assets/logo.png';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';
const Login = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const {height}=useWindowDimensions();

    const navigation=useNavigation();
    const onInicioPressed=()=>{
      log();
       // 
    };
    const onOlvidadoPressed=()=>{
        console.warn('Recuperar');
    };
    const log = async () => { 
      try {
        const response = await fetch(`http://192.168.1.161:5000/user-authe/userSign/${email}&${password}`, {
          method: 'GET',
            headers: {
            'Content-Type': 'application/json'
          },
            
        });
        
        if(response.status==200){
          const body = await response.json();
          await SecureStore.setItemAsync('userToken', response)
          navigation.navigate('map')
        }
      } catch (err) {
        Alert.alert(':(', err, [
            
          { text: 'OK'},
        ]);
        console.log(err)
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