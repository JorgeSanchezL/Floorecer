import React, { useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Modal,Pressable,TouchableOpacity,Image,Alert} from 'react-native';

import {BACKEND_URL} from '@env';
import { getItemAsync } from 'expo-secure-store';

const ItemShop = () => {
  const [items, setItems] = useState(null);
  const [itemName, setItemName]=useState ('');
  const [itemUid, setItemUid]=useState ();
  const [itemPrice, setItemPrice]=useState ();
  const [selectedItem2, setSelectedItem2]=useState (null);
  const [uid, setUid] = useState(null);
  const [imagen,setImagen]=useState('');

  const getImage= async () => {
    try{
    const api_call = await fetch(`${BACKEND_URL}/garden/items/${itemUid}`);
    const response = await api_call.json();
    setImagen(response.imageURL);
    }catch(error){
      Alert.alert(error)
    }

}
  const getAllItems = async () => {
    const api_call = await fetch(`${BACKEND_URL}/garden/items/all`);
    const response = await api_call.json();
    setItems(response);
}
 useEffect(() => {
  getAllItems();
  getUid();
  }, [])
  useEffect(() => {
    getImage();
    }, [itemUid])

const getUid = async () => {
  try {
    auth0 = JSON.parse(await getItemAsync('auth0'));
    setUid(auth0.uid);
  } catch(e) { Alert.alert(e); }
}
const  onPressBuy= async() =>{
    try {
      const response = await fetch(`${BACKEND_URL}/garden/buyItem`, { 
        method: 'POST',
        body: JSON.stringify({
         uid : uid,
         name: itemName,
         points: itemPrice,
         
      }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },     
      }   
      );
      const res=await response.json()
      Alert.alert('Aviso', res, [
            
        { text: 'OK' },
      ]);
      
      }
      
   catch (err) {
    Alert.alert(err)
   }

}


const Item = ({ shopItem }) => (
  <View style={styles.greenBox} onStartShouldSetResponder={() => {{
    setItemName(shopItem.name),
    setItemPrice(shopItem.price) ,
    setSelectedItem2(shopItem),
    setItemUid(shopItem.uid)

    }}}>  
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
            <Image
              style={styles.userCircle}
              source={{
                uri:`${imagen}`
              }}
            />
              <Text>{itemName}</Text>
              <View style={styles.sameLine}>
              <TouchableOpacity style={styles.button} onPress={() => setSelectedItem2(null)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {onPressBuy(),setSelectedItem2(null)}}>
                <Text>Aceptar</Text>
              </TouchableOpacity>
            </View></View></View>
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
  sameLine:{
    flexDirection: "row",
    justifyContent: "space-around",

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
    elevation: 2,
    backgroundColor: "#5dc655",
    marginLeft: 10
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  userCircle: {
    width: 130,
    height: 130,
}
});



export default ItemShop;