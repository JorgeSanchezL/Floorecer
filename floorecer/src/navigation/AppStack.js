import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import SignUp from '../screens/Signup';
import NewBusiness from '../screens/NewBusiness';

const Stack = createStackNavigator();
  
const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='newBusiness'
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
            <Stack.Screen
                name='newBusiness'
                component={NewBusiness}
            />
        </Stack.Navigator>
    );
}

export default AppStack;