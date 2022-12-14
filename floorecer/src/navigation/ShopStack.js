import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import ShopReward from '../screens/ShopReward';
import ItemShop from '../screens/ItemShop';

const Stack = createStackNavigator();

const ShopStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName='itemShop'
        >
            <Stack.Screen name='itemShop' component={ItemShop} />
            <Stack.Screen name='shopReward' component={ShopReward} />
        </Stack.Navigator>
    );
}

export default ShopStack;