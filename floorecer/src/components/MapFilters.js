import React, { useState, useEffect } from "react";
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { getCategories } from '../../utils/actions';
import { getAllBusinesses } from '../../utils/actions';
import { useIsFocused } from "@react-navigation/core";

const categories =  [];

const MapFilters = (props) => {

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
          const backgroundColor = categories.includes(item.value) ? "#88c484" : "#white";
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
              
              /* if(selected == item.value){ 
                const index = categories.indexOf(item.value);
                if (index > -1) { // only splice array when item is found
                  categories.splice(index, 1); // 2nd parameter means remove one item only
                }
                setSelected(null)

                getMapMarkers(null)
              }
              else{
                if(!categories.includes(item.value))categories.push(item.value)
                setSelected(item.value);

                getMapMarkers(item.value);
              } */
            }}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
        };
      
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
        container2: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        container: {
            marginTop: 34,
            backgroundColor: 'transparent',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: Size*2.5,
          },
        title: {
          fontSize: Size,
        },
        appButtonContainer: {
            elevation: 1 ,
            //borderWidth:0.5,
           // backgroundColor: "#009688",
            borderRadius: 100,
            marginHorizontal:10,
            marginVertical:1,
            justifyContent: 'center',
            //paddingVertical: '10%',
            paddingHorizontal: 12 
          },
      });

export default MapFilters;