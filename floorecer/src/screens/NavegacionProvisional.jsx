import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavegacionProvisionalUsuario, NavegacionProvisionalComercio } from './../components/BotonesNavegacion'

const NavegacionProvisional = () => {


    const [user, setUser] = useState(null)
    const [isBusiness, setIsBusiness] = useState(false)
    SecureStore.getItemAsync('userToken').then((value) => setUser(value))

    const getIsBusiness = async () => {
        const api_call = await fetch(`http://13.39.87.231:5000/users/${user.user.uid}`);
        const response = await api_call.json();
        setIsBusiness(response.isBusinessOwner);
    }

    if (isBusinessOwner) {
        return <NavegacionProvisionalComercio />
    } else {
        return <NavegacionProvisionalUsuario />
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7FFE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default NavegacionProvisional;
