import React, { useState, Component } from "react";
import { View, Text, Image, StyleSheet, ScrollView, Alert, Dimensions, TouchableOpacity } from "react-native";
const {width} = Dimensions.get("window");
const height = width * 0.6;


export default class ImageCarousel extends React.Component{
    state ={
        active: 0
    }
    change = ({nativeEvent})=>{
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide !== this.state.active){
            this.setState({active: slide});
        }
    }
     showConfirmDialog = () => {
      return Alert.alert(
        "Are your sure?",
        "Are you sure you want to remove this picture?",
        [
          // The "Yes" button
          {
            text: "Yes",
            onPress: () => {
              this.props.images.splice(0, 1); // 2nd parameter means remove one item only
             
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
        <ScrollView  
            pagingEnabled
            horizontal
            onScroll={this.change}  
            style ={styles.container} >
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
        <View style ={styles.closeButtonView}>
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
       {  marginTop:5,
        width,
        height,},
    scrollView: {width,height},
    image:{width, height, resizeMode:'cover' },
    pagination:{flexDirection:'row', position:'absolute', bottom: 0, alignSelf:'center'},
    pagingText: {fontSize: (width/30), color:'#888', margin: 3},
    pagingActiveText: {fontSize: (width/30), color:'#fff', margin: 3},
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
      flexDirection:'column', position:'absolute', top: 0, alignSelf:'flex-end'
    },
})