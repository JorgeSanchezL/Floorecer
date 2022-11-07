import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HyperLink from '../components/Hyperlink';
import * as SecureStore from 'expo-secure-store';
import {BACKEND_URL} from '@env'

const Home = () => {


  

  const sendEmail = async () => {
    try {
      console.log(`${BACKEND_URL}/user-authe/userRegister2`)
      var userToken = await SecureStore.getItemAsync('userToken')
      const response = await fetch(`http://192.168.0.72:5000/user-verification/mail`, {
        method: 'POST',
        body: userToken,
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },
        
      }
      
      
      );
      //console.log(Object.getOwnPropertyNames(response));
      console.log(JSON.stringify({
        email: email,
        username: username,
        usernameForSearch: getUsernameForSearch(),
        password: password,
        numberphone : numerodetelefono,
        isBusinessOwner : false,

    }))
      if(response.status==200){
        const res=await response.json()
        await SecureStore.setItemAsync('userToken', JSON.stringify(res))
        Alert.alert('Bravo', '¡ se ha creado la cuenta con exito !', [
          
          { text: 'OK', onPress: () => { navigation.navigate("notVerified") } }, //Cambiado para la UT de verificar usuario :)
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Floorecer
      </Text>
      <Text style={styles.subtitle}>
        Para continuar debes verificar tu cuenta a través del enlace recibido por correo electrónico.
      </Text>
      <HyperLink text="Volver a enviar el correo" onClick={sendEmail} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7FFE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#00996D'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00996D'
  }
});

export default Home;
