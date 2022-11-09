import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Login from '../screens/Login';
import Register from '../screens/Register';
import NotVerified from '../screens/NotVerified';
import ScanQr from '../screens/ScanQr';
import ItemShop from '../screens/ItemShop';
const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='itemShop'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='itemShop'
                component={ItemShop}
            />
            <Stack.Screen
                name='register'
                component={Register}
            />
            <Stack.Screen
                name='notVerified'
                component={NotVerified}
            />
            <Stack.Screen
                name='scanQr'
                component={ScanQr}
            />
        </Stack.Navigator>
    );
}

export default AuthStack;