<<<<<<< HEAD
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
//import Screen from "./app/components/Screen";
import { createStackNavigator } from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Register from './Screens/Register';
/*
const Tweets = () => (
<Screen>
<Text> Register Tweets </Text>
</Screen>
);

const TweetDetails = () => (
  <Screen>
  <Text> Register TweetDetails </Text>
  </Screen>
  );
*/
  const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
   
      <Stack.Screen name = "Register" component={Register} />
      </Stack.Navigator>

=======
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AppStack from './src/navigation/AppStack';

const App = () => {
  return (
    <NavigationContainer>
      <AppStack />
>>>>>>> d7c7c50cb62f9b8a921b557a0af1ab5d6608d1e0
    </NavigationContainer>
  );
}

<<<<<<< HEAD
=======
export default App;
>>>>>>> d7c7c50cb62f9b8a921b557a0af1ab5d6608d1e0
