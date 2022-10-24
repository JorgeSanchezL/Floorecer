import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { CustomButton } from './CustomButton'
import { useNavigation } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store'

export const NavegacionProvisionalUsuario = () => {

  const navigation=useNavigation();

  return (
    <View style={styles.container}>
        <CustomButton 
            onPress={navigation.navigate('map')}
            text="Mapa"
            type="cuaterciario"
        />
        <CustomButton 
            onPress={navigation.navigate('userProfile')}
            text="Mi perfil"
            type="cuaterciario"
        />
        <CustomButton 
            onPress={navigation.navigate('userSearch')}
            text="Buscar usuarios"
            type="cuaterciario"
        />
    </View>
  );
}

export const NavegacionProvisionalComercio = () => {

    const navigation=useNavigation();
    const [user, setUser] = useState(null)
    SecureStore.getItemAsync('userToken').then((value) => setUser(value))
  
    return (
      <View style={styles.container}>
          <CustomButton 
              onPress={navigation.navigate('map')}
              text="Mapa"
              type="cuaterciario"
          />
          <CustomButton 
              onPress={navigation.navigate('configureBusiness')}
              text="Configurar comercio"
              type="cuaterciario"
          />
          <CustomButton 
              onPress={navigation.navigate('myShops')}
              text="Mis tiendas"
              type="cuaterciario"
          />
          <CustomButton 
              onPress={navigation.navigate('newBusiness')}
              text="Nuevo comercio"
              type="cuaterciario"
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
});

