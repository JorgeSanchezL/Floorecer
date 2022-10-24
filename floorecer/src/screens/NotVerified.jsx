import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import HyperLink from '../components/Hyperlink';

const Home = () => {

  const [value, setValue] = useState(null)

  const sendEmail = async () => {
    try {
      var userToken = await SecureStore.getItemAsync('userToken')
      const response = await fetch('http://192.168.0.72:5000/user-verification/mail', {
        method: 'POST',
          headers: {
          'Content-Type': 'application/json'
        },
        body: {
          user: userToken
        }
      });
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
