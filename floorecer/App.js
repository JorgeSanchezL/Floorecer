
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/AppStack';

const Stack = createStackNavigator();
 
export default function App() {
  return (
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
  );
}