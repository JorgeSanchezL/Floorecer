import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import UserProfile from '../screens/UserPorfileNew';
import Garden from '../screens/Garden'
import Inventory from '../screens/Inventory';
import Premio from '../screens/Premio';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='userProfile'
        >
            <Stack.Screen name='userProfile' component={UserProfile} />
            <Stack.Screen name='garden' component={Garden} />
            <Stack.Screen name='inventory' component={Inventory} />
            <Stack.Screen name='premio' component={Premio} />
        </Stack.Navigator>
    );
}

export default ProfileStack;