import React, { useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text,Modal,Dimensions,TouchableOpacity,ImageBackground,LogBox} from 'react-native';

import itemShop2 from '../../assets/itemShop2.png';
import ItemsImage from '../components/itemShop/ItemsImage.js';
import { useNavigation } from '@react-navigation/native';
LogBox.ignoreAllLogs();

const { width, height } = Dimensions.get('screen');

export const rewards = [
    {
        name: 'Descuento',
        description: "¡Descuento del 10% en ",
        description2:"cualquier frutería de Valencia!"
    },
    {
      name: 'Descuento ',
      description: "¡Descuento del 30% en compras ",
      description2:"de más de 15€ en EcoMarket!"
    },
    {
      name: 'Promocion',
      description: "¡Compra 2Kg de manzanas por el ",
      description2:"precio de uno en Frutería Antonio!"
    },
  ];

const ShopReward = () => {
  const [itemName, setItemName]=useState ('');
  const [selectedItem2, setSelectedItem2]=useState (null);
  const navigation = useNavigation();


const Item = ({ shopItem }) => (
  <View style={styles.greenBox} onStartShouldSetResponder={() => {{
    setItemName(shopItem.name),
    setSelectedItem2(shopItem)

    }}}>  
        <View >
      <ItemsImage name={shopItem.name}></ItemsImage>
    </View>
     <View style={styles.info}>
    
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

</View>
);




  const renderItem = ({ item }) => (
    <Item shopItem={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={itemShop2} resizeMode="cover" style={styles.background} ></ImageBackground>
      <View style={styles.sameLine}>
        <TouchableOpacity onPress={()=>{navigation.navigate('itemShop')}}>
          <Text style={styles.textData3} >Items</Text>
        </TouchableOpacity>
        <TouchableOpacity >
          <Text style={styles.textData2}>Premio</Text>
        </TouchableOpacity>
      </View>
       <Modal visible={selectedItem2 !== null} transparent={true} >
            <View style={[{borderWidth: 0},styles.centeredView]}>
            <View style={styles.modalView}>
            <ItemsImage name={itemName}></ItemsImage>
              <Text>Quieres canjear esta oferta?</Text>
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
        data={rewards}
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
    marginTop : '15%',
    marginLeft : '10%',
    marginRight : '5%',
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
    backgroundColor: "#FC993D",
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
});



export default ShopReward;