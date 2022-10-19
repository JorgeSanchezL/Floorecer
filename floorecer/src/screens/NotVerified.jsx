import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Home = (userMail) => {

  const [value, setValue] = useState(null)

  const checkVerified = async () => { 
    try {
      const response = await fetch('http://TUIP:5000/user-verification/user', {
        method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization-Header': ''
        }
      });
      return (await response.json()).verified;
    } catch (err) {
      console.log(err)
    }
  }
  
  const verify = async () => {
    try {
      const response = await fetch('http://TUIP:5000/user-verification/verify', {
        method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization-Header': ''
        },
        body: {
          'code': value
        }
      });
      return (await response.json()).verified;
    } catch (err) {
      console.log(err)
    }
  }

  const updateCode = async () => {
    try {
      const response = await fetch('http://TUIP:5000/user-verification/code', {
        method: 'UPDATE',
          headers: {
          'Content-Type': 'application/json',
          'Authorization-Header': ''
        }
      });
    } catch (err) {
      console.log(err)
    }
  }

  const sendEmail = async () => {
    try {
      const response = await fetch('http://TUIP:5000/user-verification/mail', {
        method: 'GET',
          headers: {
          'Content-Type': 'application/json',
          'Authorization-Header': ''
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
        Para continuar debes verificar tu cuenta de correo electrónico. Introduce el código recibido en tu email.
      </Text>
      <CustomInput
        value={value}
        setValue={setValue}
        placeholder={'******'}
      />
      <CustomButton 
        text={'Aceptar'}
        type={'cuaterciario'}
        onClick={null}
      />
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
