import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

// definition of the Item, which will be rendered in the FlatList

const Item = ({ name, details,prop,coordinations }) => (
  <View style={styles.item}>
    <TouchableOpacity
    onPress={ 
     ()=> prop.animate(coordinations)}
     >
    <Text style={styles.title}>{name}</Text>
    <Text style={styles.details}>{details}</Text>
    </TouchableOpacity>
  </View>
);

// the filter
const List = (props) => {
  const renderItem = ({ item }) => {
    // when no input, show all
    if (props.searchPhrase === "") {
      return null;
    }
    // filter of the name
    if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.Address}  prop ={props} coordinations = {item.location}
      />;
    }
    // filter of the name
   
  };
  if(props.searchPhrase != "" ) {
  return (
    <SafeAreaView style={styles.list__container}>
      <View
        onStartShouldSetResponder={() => {
          props.setCLicked = false;
        }}
      >
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />  
      </View>
    </SafeAreaView>
  ); 
      }
};

export default List;

const styles = StyleSheet.create({
  list__container: {
    marginTop :5,
    height: "80%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});