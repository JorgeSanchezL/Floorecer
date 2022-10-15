import React, { useState, Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert, Dimensions, TouchableOpacity,Button } from "react-native";
import * as ImagePicker from 'expo-image-picker';

const {width} = Dimensions.get("window");
const height = width * 0.6;


export default class ImageCarouselPickingPictures extends React.Component{
    state ={
        active: 0
    }
    change = ({nativeEvent})=>{
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== this.state.active){
            this.setState({active: slide});
        }
    };
    pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result);
  
      if (!result.cancelled) {
        this.props.images.push(result.uri);
        this.forceUpdate();
      }
      
    };
     showConfirmDialog = () => {
      return Alert.alert(
        "Are your sure?",
        "Are you sure you want to remove this picture?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              
            this.props.images.splice(this.state.active, 1);
            this.forceUpdate();

            },
          },
          // The "No" button
          // Does nothing but dismiss the dialog when tapped
          {
            text: "No",
          },
        ]
      );
    };
  render(){
    return(
      <View style ={styles.container}>

        <View style={{alignItems: 'center', justifyContent: 'center' }}>
          <Button title="Pick an image from camera roll" onPress={this.pickImage} />
        </View>

        <ScrollView  
            pagingEnabled
            horizontal
            onScroll={this.change}  
            style ={styles.scrollView} >
          {
            this.props.images.map((image,index) =>(
              <Image 
                key = {index}
                source = {{uri: image}}
                style ={styles.image}
              />
            ))
          }
        </ScrollView>
        
        <View style ={this.props.images.length == 0 ? {display: 'none'} : styles.closeButtonView}>
          <TouchableOpacity style={styles.closeButtonParent} onPress={this.showConfirmDialog}>
            <Image style={styles.closeButton} source={require("../../assets/Delete-Red-X-Button.png")} />
          </TouchableOpacity>
        </View>
        
        
        <View style= {styles.pagination}>
            {
                this.props.images.map((i,k)=>(
                    <Text key={k} style={k==this.state.active ? styles.pagingActiveText : styles.pagingText}>
                    ⬤     
                    </Text> 
                ))
            }
               
        </View>  
       
       
       
        
      </View>
    );
  }
     
};

const styles = StyleSheet.create({
    container:
       {  
        marginTop:10,
       },
    scrollView: {
      marginTop:5,
      width,height
    },
    image:{
      width, height, 
      resizeMode:'cover' 
    },
    pagination:{
      flexDirection:'row', 
    position:'absolute', 
    bottom: 0, alignSelf:'center'
  },
    pagingText: {
      fontSize: (width/30),
       color:'#888',
       margin: 3
    },
    pagingActiveText: {
      fontSize: (width/30), 
      color:'#fff', 
      margin: 3
    },
    closeButton: {
      height: 30,
      width: 30,
    },
    closeButtonParent: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: 9,
      marginRight:5,
    },
    closeButtonView:{
      flexDirection:'column', position:'absolute', top: 35, alignSelf:'flex-end'
    },
})