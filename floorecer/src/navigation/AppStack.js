import React from 'react';
import { View, Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import SignUp from '../screens/Signup';

const Stack = createNativeStackNavigator();
  
const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='home'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='home'
                component={Home}
            />
            <Stack.Screen
                name='signUp'
                component={SignUp}
            />
        </Stack.Navigator>
    );
}

export default AppStack;