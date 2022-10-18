import React, { useState } from "react";
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";


const MapFilters = (props) => {


    const [choice, setChoice] = useState('');

    const DATA = [
        {label: 'Fruit store', value: 'fruiStore'},
        {label: 'Supermarket', value: 'supermarket'},
        {label: 'Ropa', value: 'ropa'},
        {label: 'Rastro', value: 'rastro'},
    ];
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.appButtonContainer, backgroundColor]}>
          <Text style={[styles.title, textColor]}>{item.label}</Text>
        </TouchableOpacity>
      );
      
  
        const [selectedId, setSelectedId] = useState(null);
      
        const renderItem = ({ item }) => {
          const backgroundColor = item.value === selectedId ? "#88c484" : "#white";
          const color = item.value === selectedId ? 'white' : 'black';
      
          return (
            <Item
              item={item}
              onPress={() => {selectedId == item.value ? setSelectedId(null):setSelectedId(item.value)}}
              backgroundColor={{ backgroundColor }}
              textColor={{ color }}
            />
          );
        };
      
        return (
          <SafeAreaView style={styles.container2}>
            <View style={styles.container}>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator ={false}
                    data={DATA}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.value}
                    extraData={selectedId}
                />
            </View>
            
          </SafeAreaView>
        );
      };
      const Size = 14;
      const styles = StyleSheet.create({
        container2: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        container: {
            
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