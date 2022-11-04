import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MyShops from '../screens/MyShops';
import ConfigureBusiness from '../screens/ConfigureBusiness';

const Stack = createStackNavigator();

const BusinesStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='myShops'
        >
            <Stack.Screen name='myShops' component={MyShops} />
            <Stack.Screen name='configureBusiness' component={ConfigureBusiness} />
        </Stack.Navigator>
    );
}

export default BusinesStack;