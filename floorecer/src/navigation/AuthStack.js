import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Map';
import Register from '../screens/RegisterNew';
import NotVerified from '../screens/NotVerified';
import ScanQr from '../screens/ScanQr';
import Prueba from '../screens/Prueba'

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='login'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='login'
                component={Login}
            />
            <Stack.Screen
                name='register'
                component={Register}
            />
            <Stack.Screen
                name='notVerified'
                component={NotVerified}
            />
           
        </Stack.Navigator>
    );
}

export default AuthStack;