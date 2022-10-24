import React from 'react';
import { View, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import SignUp from '../screens/Signup';
import NewBusiness from '../screens/NewBusiness';
import Login from '../screens/Login';
import Register from '../screens/Register';
import PublicProfile from '../screens/PublicProfile';
import Map from '../screens/Map';
import UserProfile from '../screens/UserProfile';
import BusinessPlans from '../screens/BusinessPlans';
import Payment from '../screens/Payment';
import NotVerified from '../screens/NotVerified';
import MyShops from '../screens/MyShops';
import NavegacionProvisionalComercio from '../screens/NavegacionProvisionalComercio';
import NavegacionProvisionalUsuario from '../screens/NavegacionProvisionalUsuario';


import ConfigureBusiness from '../screens/ConfigureBusiness';
import UserSearch from '../screens/UserSearch';

const Stack = createStackNavigator();

const AppStack = () => {
    return (
        <Stack.Navigator
            initialRouteName='navegacionProvisionalComercio'
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen
                name='login'
                component={Login}
            />
            <Stack.Screen
                name='notVerified'
                component={NotVerified}
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
            <Stack.Screen
                name='newBusiness'
                component={NewBusiness}
            />
            <Stack.Screen
                name='configureBusiness'
                component={ConfigureBusiness}
            />
            <Stack.Screen
                name='publicProfile'
                component={PublicProfile}
            />
            <Stack.Screen
                name='map'
                component={Map}
            />
            <Stack.Screen
                name='userProfile'
                component={UserProfile}
            />
            <Stack.Screen
                name='businessPlans'
                component={BusinessPlans}
            />
            <Stack.Screen
                name={'payment'}
                component={Payment}
            />
            <Stack.Screen
                name={'myshops'}
                component={MyShops}
            />
            <Stack.Screen
                name={'userSearch'}
                component={UserSearch}
            />
            <Stack.Screen
                name={'navegacionProvisionalComercio'}
                component={NavegacionProvisionalComercio}
            />
            <Stack.Screen
                name={'navegacionProvisionalUsuario'}
                component={NavegacionProvisionalUsuario}
            />
        </Stack.Navigator>
    );
}

export default AppStack;