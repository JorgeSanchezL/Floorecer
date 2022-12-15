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
  const renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '5%'
        }}
      />
    )
  }
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
          
          keyExtractor={(item) => item.name}
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
    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    padding: 10,
                    marginLeft:15,
                    marginRight:20,
                    borderColor: '#333',
                    borderRadius:25,
                    marginTop:10
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontStyle: "italic",
  },
});