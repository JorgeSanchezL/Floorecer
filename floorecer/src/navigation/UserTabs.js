import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';

import Map from '../screens/Map';
import ProfileStack from '../navigation/ProfileStack';
import PublicStack from '../navigation/PublicStack';
import ShopStack from '../navigation/ShopStack';

const Tab = createBottomTabNavigator();

const UserTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'home') {
                        iconName = focused ? 'map' : 'map-outline';
                    } else if (route.name === 'profileStack') {
                        iconName = focused ? 'person' : 'person-outline';
                    } else if (route.name == 'publicStack') {
                        iconName = focused ? 'search' : 'search-outline';
                    }else if (route.name == 'shopStack') {
                        iconName = focused ? 'basket' : 'basket-outline';
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
                tabBarActiveTintColor: '#494693',
                tabBarInactiveTintColor: '#7d7acd',
            })}
        >
            <Tab.Screen name='home' component={Map} />
            <Tab.Screen name='profileStack' component={ProfileStack} />
            <Tab.Screen name='publicStack' component={PublicStack} />
            <Tab.Screen name='shopStack' component={ShopStack} />
        </Tab.Navigator>
    );
}

export default UserTabs;