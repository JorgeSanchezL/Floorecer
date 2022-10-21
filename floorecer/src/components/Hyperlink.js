import React from 'react';
import { StyleSheet, Text } from 'react-native';

const Hyperlink = (text, onClick = () => {}) => {
    return <Text styles={styles.title} onClick={onClick}>{text}</Text>
}

const styles = StyleSheet.create({
    title: {
      color: '#acacac',
      fontWeight: 'bold'
    }
});

export default Hyperlink;