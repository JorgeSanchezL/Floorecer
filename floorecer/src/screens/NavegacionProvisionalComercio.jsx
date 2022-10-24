import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useNavigation } from '@react-navigation/native';

const NavegacionProvisionalComercio = () => {

    const navigation=useNavigation();

    return (
        <View style={styles.container}>
        <Button 
            onPress={() => navigation.navigate('map')}
            title="Mapa"
        />
        <Button 
            onPress={() => navigation.navigate('configureBusiness')}
            title="Configurar comercio"
        />
        <Button 
            onPress={() => navigation.navigate('myshops')}
            title="Mis tiendas"
        />
        <Button 
            onPress={() => navigation.navigate('newBusiness')}
            title="Nuevo comercio"
        />
    </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7FFE7',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
});

export default NavegacionProvisionalComercio;
