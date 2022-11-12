import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';

import Map from '../screens/Map';
import BusinesStack from './BusinesStack';
import NewBusiness from '../screens/NewBusiness';
import ScanQr from '../screens/ScanQr';

const Tab = createBottomTabNavigator();

const BusinessTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'businesStack') {
                        iconName = focused ? 'basket' : 'basket-outline';
                    } else if (route.name == 'newBusiness') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline'
                    }
                 else if (route.name == 'ScanQr') {
                    iconName = focused ? 'qr-code' : 'qr-code-outline'
                }


                    return (
                        <Ionicons
                            name={iconName}
                            size={size*1.25}
                            color={color}
                        />
                    );
                },
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#367c1e',
                tabBarInactiveTintColor: '#4b4b4b',
            })}
        >
            <Tab.Screen name='home' component={Map} />
            <Tab.Screen name='businesStack' component={BusinesStack} />
            <Tab.Screen name='newBusiness' component={NewBusiness} />
            <Tab.Screen name='ScanQr' component={ScanQr} />

        </Tab.Navigator>
    );
}

export default BusinessTabs;