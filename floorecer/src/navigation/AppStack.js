import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import SignUp from '../screens/Signup';
import Login from '../screens/Login';
import Register from '../screens/Register';

const Stack = createNativeStackNavigator();
  
const AppStack = () => {
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
                name='signUp'
                component={SignUp}
            />
            <Stack.Screen
                name='home'
                component={Home}
            />
           
             <Stack.Screen
                name='register'
                component={Register}
            />

            
        </Stack.Navigator>
    );
}

export default AppStack;