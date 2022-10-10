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

    </NavigationContainer>
  );
}

