import React, { useEffect,useState,useRef } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar,Modal,Animated,TouchableOpacity,Image,Alert} from 'react-native';

import {BACKEND_URL} from '@env';
import { getItemAsync } from 'expo-secure-store';
import redFlower33 from '../../assets/garden/redFlower/3petals3health.png'

const Inventory = () => {
  const [uid, setUid] = useState(null);
  const [healthBar,sethealthBar]=useState(0);
  const [abono,setAbono]=useState(0);
  const [agua,setAgua]=useState(0);
  const [petal,setPetal]=useState(0);
  const [myPlants, setMyPlants] = useState([{type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}])
  const num=50;
  const pos=0;

  useEffect(() => {
    getUid();
    getUser();
    fetchGardenData();
}, []);

const getUser = async () => {
    try {
      const auth0 = JSON.parse(await getItemAsync('auth0'));
      const api_call = await fetch(`${BACKEND_URL}/users/${auth0.uid}`);
      const response = await api_call.json();
      setMyPlants(response.garden)
      setAbono(response.items.Abono || 0)
      setAgua(response.items.Agua || 0)
      sethealthBar(response.garden[0].health)
      setPetal(response.garden[0].petals)
    } catch(e) { console.error(e); }
    
}
const getUid = async () => {
  try {
    auth0 = JSON.parse(await getItemAsync('auth0'));
    setUid(auth0.uid);
  } catch(e) { console.error(e); }
}
const progressBar =  () => {
    if(petal==1){
        return Math.trunc (healthBar/2 *100)
    }else if(petal==2){
        return Math.trunc(healthBar/3 *100)
    }else if(petal==3){
        return Math.trunc(healthBar/4 *100)
    }else{
      return Math.trunc(healthBar/5 *100)
    }

  }
  const updatePlantsNextHealth = () => {
    var result = myPlants
    if(agua!=0){
    if(result[pos].health==1 && result[pos].petals==1){
        result[pos].health=0
        result[pos].petals=2
    }else if(result[pos].health==2 && result[pos].petals==2){
        result[pos].health=0
        result[pos].petals=3
    }
    else if(result[pos].health==3 && result[pos].petals==3){
        result[pos].health=0
        result[pos].petals=4
    }else if(result[pos].health==5 && result[pos].petals==4){
      Alert.alert('Aviso', 'Completado', [
            
        { text: 'OK' },
      ]);
    }else{
        result[pos].health=result[pos].health +1
    }
    setMyPlants(result)
    setGardenData()
    useItem('Agua')
    setAgua(agua-1)
    sethealthBar(result[pos].health)
    
    }else{
        Alert.alert('Aviso', 'No tienes ninguno.Compralo', [
            
            { text: 'OK' },
          ]);
    }

    
  }
  const updatePlantsNextPetal = () => {
    if(abono!=0){
      console.log(abono)
        var result = myPlants
        if(result[pos].petals!=5){
        result[pos].petals = (result[pos].petals) +1
        setMyPlants(result)
        setGardenData()
        useItem('Abono')
        setAbono(abono-1)
        setPetal(result[pos].petals)
        }else{
          Alert.alert('Aviso', 'Completado', [
            
            { text: 'OK' },
          ]);
        }
        

    }else{
        Alert.alert('Aviso', 'No tienes ninguno.Compralo', [
            
            { text: 'OK' },
          ]);
    }
    
  }
  const fetchGardenData = async () => {
    try{
      const response=await fetch(`${BACKEND_URL}/garden/gardenInfo/${uid}`);
      let body=await response.json();
      setMyPlants(body);
      console.log(body)
    } catch(error) {
      console.error(error);
    }
  }
  const setGardenData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/garden/updateGarden`, {
        method: 'POST',
        body: JSON.stringify({
         uuid : uid,
         garden: myPlants
      }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },     
      });
    } catch (err) {
      console.log(err)
    }
  }
  const useItem = async (itemm) => {
    try {
      const response = await fetch(`${BACKEND_URL}/garden/useItem`, {
        method: 'POST',
        body: JSON.stringify({
         uuid : uid,
         item: itemm
      }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },     
      });
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.textHeader}>Mis Plantas</Text>
        <View style={styles.flowerContainer}>
            <Image
                style={styles.flowerImage}
                source={redFlower33}
            />
        <View style={styles.containerStyle}>
            <Animated.View
            style={[
            styles.innerStyle,{width: num+ "%"},
            ]}
            />
            <Animated.Text style={styles.label}>
            {progressBar()}
            </Animated.Text>
        </View>
        </View>
        <View>
        <Text style={styles.textHeader}>Mis Items</Text>
        <View style={styles.sameLine}>
                <TouchableOpacity  onPress={updatePlantsNextPetal}>
                    <Image
                        style={styles.itemImage}
                        source={{
                        uri:'https://firebasestorage.googleapis.com/v0/b/floorecer.appspot.com/o/item%2Fabono.png?alt=media&token=12a33b8b-ce22-4947-812b-8d560770ba12'
                        }}
                    />
                    <Text style={styles.textItem}>Abono  x {abono}</Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={updatePlantsNextHealth}>
                    
                    <Image
                        style={styles.itemImage}
                        source={{
                        uri:'https://firebasestorage.googleapis.com/v0/b/floorecer.appspot.com/o/item%2Fregadera.png?alt=media&token=0fdcf629-72b8-4eed-97e0-dcf5f375c6dd'
                        }}
                    />
                    <Text style={styles.textItem}>Agua  x  {agua}</Text>
                </TouchableOpacity>
            </View>
        </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        padding:10,
        marginTop: StatusBar.currentHeight || 0,
    },
    flowerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    sameLine:{
        flexDirection: "row",
        justifyContent: "space-around",
    
      },
    textHeader:{
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 10,
    },
    textItem:{
        textAlign: 'center',
    },
    itemImage: {
        width: 130,
        height: 130,
    },
    flowerImage: {
        width: 170,
        height: 300,
    },
    containerStyle: {
        width: "100%",
        height: 40,
        padding: 3,
        borderColor: "#FAA",
        borderWidth: 3,
        borderRadius: 30,
        marginTop: 50,
        justifyContent: "center",
        },
    innerStyle:{
        width: "100%",
        height: 31,
        borderRadius: 16,
        backgroundColor:"green",
    },
    label:{
        fontSize:24,
        color: "black",
        position: "absolute",
        zIndex: 1,
        alignSelf: "center",
    }
  
});



export default Inventory;