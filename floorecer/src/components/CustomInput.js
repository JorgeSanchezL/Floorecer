import React from 'react';
import { View, Text ,TextInput,StyleSheet } from 'react-native';


const CustomInput = ({value,setValue,placeholder,secureTextEntry,editable=true,keyboardType, multiline}) => {
    return(
        <View style ={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input}
                secureTextEntry={secureTextEntry}
                editable={editable}
                keyboardType = {keyboardType}
                multiline={multiline}
            />
        </View>
    )
}
const CustomInputNumber = ({value,setValue,placeholder,secureTextEntry,editable=true,isnumber=false}) => {
    return(
        <View style ={styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder} 
                style={styles.input}
                secureTextEntry={secureTextEntry}
                editable={editable}

            />
        </View>
    )
}
const styles =StyleSheet.create({
    container:{
        backgroundColor:'white',
        width:'100%',
        borderColor:'transparent',
        borderWidth:15,
        borderRadius:5,

    },
    input:{

    },
})
export default CustomInput