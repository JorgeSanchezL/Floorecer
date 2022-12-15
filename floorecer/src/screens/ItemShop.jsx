import React, { useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Modal,Dimensions,TouchableOpacity,ImageBackground,Alert,LogBox} from 'react-native';

import {BACKEND_URL} from '@env';
import { getItemAsync } from 'expo-secure-store';
import itemShop1 from '../../assets/itemShop1.png';
import ItemsImage from '../components/itemShop/ItemsImage.js';
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from '@react-navigation/native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('screen');

const ItemShop = () => {
  const [items, setItems] = useState(null);
  const [itemName, setItemName]=useState ('');
  const [tokens, setTokens]=useState ();
  const [itemPrice, setItemPrice]=useState ();
  const [selectedItem2, setSelectedItem2]=useState (null);
  const [uid, setUid] = useState(null);
  const [imagen,setImagen]=useState(false);
  const navigation = useNavigation();
  const getImage= () => {
    setImagen(!imagen);

}

const isFocused = useIsFocused();
const getProfile = async () => {
  try {
    const auth0 = JSON.parse(await getItemAsync('auth0'));
    const api_call = await fetch(`${BACKEND_URL}/users/${auth0.uid}`);
    const response = await api_call.json();
    setTokens(response.points);
  } catch(e) { Alert.alert(e); }
  
}
  const getAllItems = async () => {
    const api_call = await fetch(`${BACKEND_URL}/garden/items/all`);
    const response = await api_call.json();
    setItems(response);
}
 useEffect(() => {
  getAllItems();
  getUid();
  getProfile()
  }, [isFocused])

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
      setTokens(tokens-itemPrice)
      }
      
   catch (err) {
    Alert.alert(err)
   }

}


const Item = ({ shopItem }) => (
  <TouchableOpacity style={styles.greenBox} activeOpacity={1} onPress={() => {{
    setItemName(shopItem.name),
    setItemPrice(shopItem.price) ,
    setSelectedItem2(shopItem)

    }}}>  
        <View style={styles.userCircle}>
      <ItemsImage name={shopItem.name}></ItemsImage>
    </View>
     <View style={styles.info}>
         <Text style = {styles.green}> {shopItem.price+" Tokens"} </Text>
    
    <Text style={styles.textData}>
       {shopItem.name} {"\n"}
      
    </Text>
    <Text style={styles.textData1}>
       {shopItem.description} {"\n"}
      
    </Text>
    <Text style={styles.textData1}>
       {shopItem.description2} {"\n"}
      
    </Text>
    </View>

</TouchableOpacity>
);




  const renderItem = ({ item }) => (
    <Item shopItem={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={itemShop1} resizeMode="cover" style={styles.background} ></ImageBackground>
      <View style={styles.sameLine}>
        <TouchableOpacity  >
          <Text style={styles.textData2}>Items</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>{navigation.navigate('shopReward')}}>
          <Text style={styles.textData3}>Premio</Text>
        </TouchableOpacity>
      </View>
       <Modal visible={selectedItem2 !== null} transparent={true} >
            <View style={[{borderWidth: 0},styles.centeredView]}>
            <View style={styles.modalView}>
            <ItemsImage name={itemName}></ItemsImage>
              <Text>Quieres comprar {itemName} por {itemPrice} tokens ? </Text>
              <View style={styles.sameLine}>
              <TouchableOpacity style={styles.button} onPress={() => setSelectedItem2(null)}>
                <Text>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => {onPressBuy(),setSelectedItem2(null)}}>
                <Text>Aceptar</Text>
              </TouchableOpacity>
            </View></View></View>
          </Modal>
          <Text style = {styles.green2}>Tienes {tokens} Tokens</Text>
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
  },
  info:{
    marginLeft:20
  },
  greenBox: {
    backgroundColor: '#transparent',
    height: 100,
    marginTop : '15%',
    marginLeft : '10%',
    marginRight : '5%',
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  title: {
    fontSize: 32,
  },
  textData: {
    fontWeight: 'bold',
    fontSize:21,
    textAlign : 'left',
    marginTop : '-10%',
    marginLeft : '5%'
  },
  textData1: {
    color: '#353535',
    textAlign : 'left',
    marginLeft : '5%',
    marginTop : '-5%',
  },
  textData2: {
    color: 'white',
    textAlign : 'left',
    fontWeight: 'bold',
    fontSize:21,
  },
  textData3: {
    color: '#353535',
    textAlign : 'left',
    fontWeight: 'bold',
    fontSize:21,
  },
  green : {
        fontWeight: 'bold',
        color: 'green',
        marginLeft : '75%',
        marginTop : '10%',
        alignItems : 'center',
  },
  green2 : {
    fontWeight: 'bold',
    color: 'green',
    marginLeft : '65%',
    marginTop : '3%',
    alignItems : 'center',
},
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  sameLine:{
    height:50,
    marginTop:10,
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
    backgroundColor: "#7D7ACD",
    marginLeft: 10
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  background:{
    height:height,
    width:width,
    position:'absolute',
    top:0,
    bottom:0,
    left:0,
    right:0,
    zIndex:-1
  },
  userCircle: {
    marginTop : '10%',
}
});



export default ItemShop;