import React from 'react';
import { View, Text,StyleSheet, Pressable } from 'react-native';

const CustomButton = ({onPress,text,type="primario"}) => {
    return(
        <Pressable onPress={onPress} 
        style ={[
            styles.container,
            styles[`container_${type}`
        ]]}>
            <Text style={[
                styles.text, 
                styles[`text_${type}`],
                ]}>
                {text}
            </Text>

        </Pressable>
    );
};
const styles =StyleSheet.create({
    container:{
        
        width:'100%',
        padding:15,
        borderRadius:5,
        alignItems:'center',
        marginVertical:5,
    },
    container_primario:{
        backgroundColor:'#5dc655',
    },
    container_terciario:{
        width:'25%',
        padding:15,
        borderRadius:5,
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:10,
        backgroundColor:'#5dc655',
    },
    text:{
        fontWeight:'bold',
        color:'white',
    },
    text_terciario:{
        fontWeight:'bold',
        color:'gray',
    },
})
export default CustomButton