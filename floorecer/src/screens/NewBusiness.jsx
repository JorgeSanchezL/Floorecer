import React, { useState, Component } from "react";
import { View, Text, TextInput, Button, StyleSheet, Pressable } from "react-native";

const App = () => (
  <View
    style={{
      flex: 1,
      marginVertical: 30,
      //justifyContent: "flex-start",
      justifyContent: "center",
    }}
  >

    <MyTextInput name = 'Shop Name' />
    <MyTextInput name = 'NIF' />
    <MyTextInput name = 'Direction' />
    <MyTextInput name = 'Position' info = 'Longitude'/>
    <MyTextInput info = 'Latitude'/>
    <View style={{
        //flex: 1,
        marginVertical: 30,
        marginHorizontal: '30%',
        alignItems: "flex-end",
        //alignSelf: "flex-end",
        flexDirection: 'row',
        justifyContent: "space-between",
    }}>
        <Button 
            style={{flex: 1, marginHorizontal: 20,marginVertical: 30,}}
            title = 'Cancel'
        />
        <Button 
            style={{flex: 1, marginHorizontal: 20,marginVertical: 30,}}
            title="Save"
        />
      </View>
  </View>
  
);

export let MyTextInput = (props) => {
  const [name, setName] = useState(props.name);

  return (
    <View
      style={{flex: 0}}
    >
      <Text style={{ marginHorizontal: 12, marginVertical: name ? 14 : 0 }}>
        {name}
      </Text>

      <TextInput
        style={{ padding: 2, marginHorizontal: 12, borderWidth: 1, backgroundColor: "#f5f5f5" }}
        placeholder={props.info}
        //onChangeText={(text) => setName(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 12,
      paddingHorizontal: 32,
      marginHorizontal: 10,
      borderRadius: 4,
      elevation: 3,
      backgroundColor: 'black',
    },
    text: {
      fontSize: 16,
      lineHeight: 21,
      fontWeight: 'bold',
      letterSpacing: 0.25,
      color: 'white',
    },
  });

export default App;