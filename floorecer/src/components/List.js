import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";


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

const List = (props) => {
  const renderItem = ({ item }) => {
    if (props.searchPhrase === "") {
      return null;
    }
    if (item.name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
      return <Item name={item.name} details={item.address}  prop ={props} coordinations = {item.location}
      />;
    }
   
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
    height: "70%",
    width: "100%",
  },
  item: {
    margin: 30,
    borderBottomWidth: 2,
    borderBottomColor: "lightgrey",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});