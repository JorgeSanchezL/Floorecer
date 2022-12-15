import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import PublicProfile from '../screens/PublicProfileNew';
import UserSearch from '../screens/UserSearch';

const Stack = createStackNavigator();

const ShopStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='userSearch'
        >
            <Stack.Screen name='publicProfile' component={PublicProfile} />
            <Stack.Screen name='userSearch' component={UserSearch} />
        </Stack.Navigator>
    );
}

export default ShopStack;