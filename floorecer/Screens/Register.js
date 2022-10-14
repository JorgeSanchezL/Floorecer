import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'

class Register extends Component {
   state = {
      email: '',
      password: '',
      phonenumber : '', 
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }
   handlePhoneNumber = (text) => {
this.setState({phonenumber : text})

   }
   login = (email, pass,phone) => {
      alert('email: ' + email + ' password: ' + pass + 'phonenumber : ' +phone  )
   }

   render() {
      return (
         <View style = {styles.container}>
  <Text style = {styles.Text}> Registro</Text>
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Email"
               textAlign='center'
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handleEmail}/>
            
            <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               
               placeholder = "Password"
               textAlign='center'
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>

              <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Confirm Password"
               textAlign='center'
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePassword}/>
                <TextInput style = {styles.input}
               underlineColorAndroid = "transparent"
               placeholder = "Numero De Telefono"
               textAlign='center'
               placeholderTextColor = "#9a73ef"
               autoCapitalize = "none"
               onChangeText = {this.handlePhoneNumber}/>
            
            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password,this.state.phonenumber)
               }>
               <Text style = {styles.submitButtonText}> Registrar Como Cliente </Text>
            </TouchableOpacity>

            <TouchableOpacity
               style = {styles.submitButton}
               onPress = {
                  () => this.login(this.state.email, this.state.password,this.state.phonenumber)
               }>
               <Text style = {styles.submitButtonText}> Registrar Como Comercio </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
export default Register

const styles = StyleSheet.create({
   container: {
    flex : 1,
      paddingTop: 30,
      backgroundColor: 'white',

      
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1,
      alignItems: 'center',
      justifyContent : 'center',

   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
      alignItems: 'center',
      justifyContent : 'center',


   },
   submitButtonText:{
      color: 'white',

   } ,
   Text: {
    paddingTop : 24,
   color : 'black',
   fontWeight : 'bold',
   fontSize : 25,
   textAlign : 'center' 


   }
})