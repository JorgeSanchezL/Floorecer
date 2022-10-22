import React from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';

const Hyperlink = ({text, onClick = () => {}}) => {
  return (
    <Pressable onPress={onClick}>
    {({ pressed }) =>
      <Text style={{
        textDecorationLine: 'underline',
        color: pressed ? 'red' : 'blue'
      }}>{text}</Text>
    }
    </Pressable>
  )
}

export default Hyperlink;