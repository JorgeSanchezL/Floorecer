import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar ,TouchableOpacity} from 'react-native';

const DATA = [
  {
    name: 'Mercadona',
    nif : 'YAAAAAX',
    direction: 'Valencia',


  },
  {
    name: 'Consum',
    nif : 'YAAAAAX',
    direction: 'Alicante',

  },
  {
    name: 'Carrefour',
    nif : 'YAAAAAX',
    direction: 'Madrid',

  },
  {
    name: 'Carrefour',
    nif : 'YAAAAAX',
    direction: 'Madrid',

  },
  {
    name: 'Carrefour',
    nif : 'YAAAAAX',
    direction: 'Madrid',

  },
];
function onPressButton (shop) {

 console.log("the title of the button is " + shop.name);

}
const Item = ({ shop }) => (
    <View style={styles.greenBox}>
      
    <View >
    <Text style={styles.textData}>
    {shop.name}  {"\n"}
            
        </Text>
    </View>

    <View >
        <Text style={styles.textData}>
            {shop.nif}
        </Text>
    </View>

    <View >
        <Text style={styles.textData }>
            {shop.direction}
        </Text>
    </View>

    <View >
    <TouchableOpacity onPress={()=>{onPressButton(shop)}} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Editar</Text>
                </TouchableOpacity>
    </View>
</View>
);

const MyShops = () => {
  const renderItem = ({ item }) => (
    <Item shop={item} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
       // keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  greenBox: {
    backgroundColor: '#D7E8DE',
            height: 200,
            marginTop : '10%',
            marginLeft : '5%',
            marginRight : '5%',
            borderRadius: 20
  },
  title: {
    fontSize: 32,
  },
  textData: {
    fontWeight: 'bold',
    color: '#353535',
    textAlign : 'left',
    marginTop : '10%',
    marginLeft : '5%'
},

appButtonContainer: {
  backgroundColor: "#009688",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 5,
  height : 30,
  width : 100,
  marginTop : '-10%',
  marginLeft : '65%',
  

},
appButtonText: {
  fontSize: 15,
  color: "#fff",
  fontWeight: "bold",
  alignSelf: "center",
}

});



export default MyShops;