import React, { useState, useEffect } from "react";
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getCategories } from '../../utils/actions';
import { getAllBusinesses } from '../../utils/actions';
import { useIsFocused } from "@react-navigation/core";
import { useFonts } from 'expo-font';

const categories =  [];

const MapFilters = (props) => {
  const [fontLoaded] = useFonts({
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
  })
  const isFocused = useIsFocused();
    const [choice, setChoice] = useState('');
    
    const [DATA, setData] = useState([]);

    const changeData = async ()=>{

      setData(await getCategories());
      
    }
    useEffect(() => {if(isFocused){getMapMarkers(categories)}}, [isFocused]);
    useEffect(() => {changeData()}, []);

    const getMapMarkers = async (category) => { 
      props.setData(await getAllBusinesses(category))
    }

    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{item.label}</Text>
        </TouchableOpacity>
      );
      
        
        const [selected, setSelected] = useState(null);
       
        const renderItem = ({ item }) => {
          const backgroundColor = categories.includes(item.value)
            ? "#7d7acd" : 'white';
          const color = categories.includes(item.value) ? 'white' : 'black';
      
          return (
            <Item
              item={item}
              onPress={() => {
              if(categories.includes(item.value)){
                const index = categories.indexOf(item.value);
                if (index > -1) { // only splice array when item is found
                  categories.splice(index, 1); // 2nd parameter means remove one item only
                }
               
                if(selected == 0) setSelected(1);
                else setSelected(0);
                getMapMarkers(categories)

              }else{
                categories.push(item.value)
                
                if(selected == 0) setSelected(1);
                else setSelected(0);
                getMapMarkers(categories)
              }
            }}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
        };
        if(!fontLoaded) { return null; }
        return (
          
            <View style={styles.container}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator ={false}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.value}
                    extraData={selected}
                />
            </View>
    
        );
      };
      const Size = 14;
      const styles = StyleSheet.create({
        container: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: Size*2.5,
            zIndex: -1,
            position: 'absolute',
            marginVertical: 65
          },
        title: {
          fontSize: Size,
          fontFamily:'PoppinsRegular'
        },
        appButtonContainer: {
            borderRadius: 100,
            marginHorizontal: 10,
            justifyContent: 'center',
            paddingHorizontal: 12,
          },
      });

export default MapFilters;