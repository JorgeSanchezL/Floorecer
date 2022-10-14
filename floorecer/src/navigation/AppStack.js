import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import SignUp from '../screens/Signup';
import NewBusiness from '../screens/NewBusiness';
import PublicProfile from '../screens/PublicProfile';
import Map from '../screens/Map';

const Stack = createStackNavigator();
  
const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='map'
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
            <Stack.Screen
                name='publicProfile'
                component={PublicProfile}
            />
            <Stack.Screen
                name='map'
                component={Map}
            />
        </Stack.Navigator>
    );
}

export default AppStack;