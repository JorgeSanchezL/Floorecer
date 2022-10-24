import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavegacionProvisionalUsuario = () => {

    const navigation=useNavigation();

    return (
        <View style={styles.container}>
        <Button 
            onPress={() => navigation.navigate('map')}
            title="Mapa"
        />
        <Button 
            onPress={() => navigation.navigate('userProfile')}
            title="Mi perfil"
        />
        <Button 
            onPress={() => navigation.navigate('userSearch')}
            title="Buscar usuarios"
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

export default NavegacionProvisionalUsuario;
