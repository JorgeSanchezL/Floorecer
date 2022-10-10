import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Home = () => {
  return (
    <View style={styles.container}>
      <Text
        style={{
            fontSize: 35,
            fontWeight: 'bold',
            color: '#00996D'
        }}
      >
        Floorecer
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7FFE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
