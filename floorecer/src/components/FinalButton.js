import React from 'react';
import { View, Text,StyleSheet, Pressable } from 'react-native';

const FinalButton = ({onPress=()=>{},text,type="primario",disabled=false, alignRight=false}) => {
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
        backgroundColor:'#5dc655',
    },
    container_secundario:{
        alignItems:"flex-start",
        padding:0
    },
    container_terciario:{
    },
    //este
    container_cuaterciario:{
        padding:15,
        borderRadius:5,
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:10,
        width: 224,
        backgroundColor:'#85DCB7',
        alignContent:'center'
    },
    container_Mapa:{
        width:'45%',
        padding:15,
        borderRadius:5,
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:10,
        width: 150,
        backgroundColor:'#85DCB7',
        
        
    },
    container_Mapa2:{
        width:'45%',
        padding:15,
        borderRadius:5,
        alignItems:'center',
        marginVertical:10,
        marginHorizontal:10,
        width: 150,
        backgroundColor:'#0C4D53',
        
        
    },
    container_profile2:{
        width:'25%',
        height:45,
        padding:15,
        borderRadius:5,
        alignItems:'center',
        backgroundColor:'#85DCB7',
        marginTop:-30,
        marginLeft:160,
        marginBottom:-4,
        alignContent:'center'
        
        
    },
    text:{
        color:'white',
        fontFamily:'PoppinsMedium',
        fontSize: 14,
        textAlign:'center'
    },
    text_profile:{
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    text_profile2:{
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
    },
    text_secundario:{
        fontWeight:'bold',
        color:'turquoise',
    },
    text_terciario:{
        fontWeight:'bold',
        color:'gray',
    },
})
export default FinalButton