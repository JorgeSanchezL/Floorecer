
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
import AppStack from './src/navigation/AppStack';
  const Stack = createStackNavigator();
 
export default function App() {
  return (
    <NavigationContainer>
      
      <AppStack />

    </NavigationContainer>
  );
}



