import React from 'react';

const Hyperlink = (text, onClick = () => {}) => {
    return <Text styles={styles.title}>{text}</Text>
}

const styles = StyleSheet.create({
    title: {
      color: '#acacac',
      fontWeight: 'bold'
    }
});

export default Hyperlink;