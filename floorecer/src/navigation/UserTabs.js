import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from 'react-native-vector-icons';

import Map from '../screens/Map';
import ProfileStack from '../navigation/ProfileStack';
import UserSearch from '../screens/UserSearch';
import ItemShop from '../screens/ItemShop';

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
                    } else if (route.name == 'userSearch') {
                        iconName = focused ? 'search' : 'search-outline';
                    }else if (route.name == 'itemShop') {
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
                tabBarActiveTintColor: '#367c1e',
                tabBarInactiveTintColor: '#4b4b4b',
            })}
        >
            <Tab.Screen name='home' component={Map} />
            <Tab.Screen name='profileStack' component={ProfileStack} />
            <Tab.Screen name='userSearch' component={UserSearch} />
            <Tab.Screen name='itemShop' component={ItemShop} />
        </Tab.Navigator>
    );
}

export default UserTabs;