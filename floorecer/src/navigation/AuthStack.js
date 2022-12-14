import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/PublicProfileNew';
import Register from '../screens/RegisterNew';
import NotVerified from '../screens/NotVerified';
import ScanQr from '../screens/ScanQr';
import Prueba from '../screens/UserPorfileNew'

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