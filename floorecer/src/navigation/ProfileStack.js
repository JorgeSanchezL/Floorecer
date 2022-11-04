import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PublicProfile from '../screens/PublicProfile';
import UserProfile from '../screens/UserProfile';

const Stack = createStackNavigator();

const ProfileStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='publicProfile'
        >
            <Stack.Screen name='publicProfile' component={PublicProfile} />
            <Stack.Screen name='userProfile' component={UserProfile} />
        </Stack.Navigator>
    );
}

export default ProfileStack;