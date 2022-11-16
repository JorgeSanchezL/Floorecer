import React, { useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Modal,Pressable,TouchableOpacity} from 'react-native';
var datos = null;
import { useNavigation } from '@react-navigation/native';
import {BACKEND_URL} from '@env';

const ItemShop = () => {
  const [items, setItems] = useState(null);
  const [itemName, setItemName]=useState ('');
  const [itemPrice, setItemPrice]=useState ();
  const [selectedItem2, setSelectedItem2]=useState (null);
  const getAllItems = async () => {
    const api_call = await fetch(`${BACKEND_URL}/garden/items/all`);
    const response = await api_call.json();
    setItems(response);
}
 useEffect(() => {getAllItems()}, [])

async function onPressBuy () {
    try {
      const response = await fetch(`${BACKEND_URL}/garden/buyItem`, { 
        method: 'POST',
        body: JSON.stringify({
         uid : "gPASbD6K2bOwU3dK3SpqwlG8Rhl2",
         name: itemName,
         points: itemPrice,
         
      }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },     
      }   
      );
       const body = await response.json();
       
      }
      
   catch (err) {
  
    console.log(err)
  
   }


}


const Item = ({ shopItem }) => (
  <View style={styles.greenBox} onStartShouldSetResponder={() => {{setItemName(shopItem.name),setItemPrice(shopItem.price) ,setSelectedItem2(shopItem)}}}>  
         <Text style = {styles.green}> {shopItem.price+" Tokens"} </Text>
    
    <Text style={styles.textData}>
       {shopItem.name} {"\n"}
      
    </Text>

</View>
);




  const renderItem = ({ item }) => (
    <Item shopItem={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
       <Modal visible={selectedItem2 !== null} transparent={true}>
            <View style={[{borderWidth: 1},styles.centeredView]}>
            <View style={styles.modalView}>
              <Text>{itemName}</Text>
              <TouchableOpacity style={styles.button} onPress={() => setSelectedItem2(null)}><Text>Cancelar</Text></TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {onPressBuy(),setSelectedItem2(null)}}><Text>Aceptar</Text></TouchableOpacity>
            </View></View>
          </Modal>
      <FlatList
        data={items}
        renderItem={renderItem}
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
            height: 100,
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
    marginTop : '-5%',
    marginLeft : '5%'
  },
  green : {
        fontWeight: 'bold',
        color: 'green',
        marginLeft : '75%',
        marginTop : '10%',
        alignItems : 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});



export default ItemShop;