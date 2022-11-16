import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PublicProfile from '../screens/PublicProfile';
import UserProfile from '../screens/UserProfile';
import Garden from '../screens/Garden'

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='publicProfile'
        >
            <Stack.Screen name='publicProfile' component={UserProfile} />
            <Stack.Screen name='userProfile' component={UserProfile} />
            <Stack.Screen name='garden' component={Garden} />
        </Stack.Navigator>
    );
}

export default ProfileStack;