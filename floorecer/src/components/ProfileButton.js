import React from 'react';
import { View, Text,StyleSheet, Pressable } from 'react-native';


const ProfileButton = ({onPress=()=>{},text,type="primario",disabled=false, alignRight=false}) => {
    
    const align = alignRight ? "alignedRight" : "normal"
    return(
        <Pressable onPress={onPress} 
        style ={[
            styles.container,
            styles[`container_${type}`],
            styles[`container_align_${align}`]
        ]}
        disabled={disabled}
        >
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
    container_align_alignedRight:{
        alignSelf: 'flex-end'
    },
    container_align_normal:{
        
    },
    container_primario:{
        backgroundColor:'#7D7ACD',
        borderRadius:25
    },
    text:{
        fontWeight:'bold',
        color:'white',
        //fontFamily:'Poppins_300Light'
    }
})
export default ProfileButton