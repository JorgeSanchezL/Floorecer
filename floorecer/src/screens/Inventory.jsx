import React, { useEffect,useState,useRef } from 'react';
import { SafeAreaView, View, StyleSheet, Text,Animated,TouchableOpacity,Image,Alert,Dimensions} from 'react-native';

import {BACKEND_URL} from '@env';
import { getItemAsync } from 'expo-secure-store';
import Suplemento from '../components/inventory/Suplemento.js'
import Elixir from '../components/inventory/Elixir.js'
import ImageFlower from '../components/ImageFlowerInventory';
import Lock from '../components/inventory/lockfill'
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';


const Inventory = ({navigation,route}) => {
  const{position}=route.params
  const navigation1 = useNavigation();
  const [uid, setUid] = useState(null);
  const [healthBar,sethealthBar]=useState(0);
  const [suplemento,setSuplemento]=useState(0);
  const [elixir,setElixir]=useState(0);
  const [petal,setPetal]=useState(0);
  const [myPlants, setMyPlants] = useState([{type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}])
  const counter = useRef(new Animated.Value(0)).current;
  const [count, setCount] = useState(0); 

  

  const charge=(coun) => {
    setCount(coun)
  };

  useEffect(() => {
    load(count)
    if (count >= 100) {
      setCount(100);
    }
  }, [count]);

  const load = (count) => {
    Animated.timing(counter, {
      toValue: count,
      duration: 5000,
      useNativeDriver: false,
    }).start();
  };

  const width = counter.interpolate({
  inputRange: [0, 100],
  outputRange: ["0%", "100%"],
  extrapolate: "clamp"
})

  useEffect(() => {
    getUid();
    getUser();
}, []);
useEffect(() => {
  charge(progressBar)
}, [healthBar]);
useEffect(() => {
  progressBarColor()
}, [myPlants]);


const getUser = async () => {
    try {
      const auth0 = JSON.parse(await getItemAsync('auth0'));
      const api_call = await fetch(`${BACKEND_URL}/users/${auth0.uid}`);
      const response = await api_call.json();
      setMyPlants(response.garden)
      setSuplemento(response.items.Suplemento || 0)
      setElixir(response.items.Elixir || 0)
      sethealthBar(response.garden[position].health)
      setPetal(response.garden[position].petals)
    } catch(e) { Alert.alert(e); }
    
}
const getUid = async () => {
  try {
    auth0 = JSON.parse(await getItemAsync('auth0'));
    setUid(auth0.uid);
  } catch(e) { Alert.alert(e); }
}
const progressBar =  () => { 
  if(healthBar==1){ return 30}
  else if(healthBar==2){ return 75}
  else if(healthBar==3){ return 100}
  else if(healthBar==0){return 0}
}
const timeLeft =  () => { 
  if(health==0){return "Revive la planta con el Elixir !!!"}
  else if(petal==1){ return "2 días 1h"}
  else if(petal==2){ return "1 día 19h"}
  else if(petal==3){ return "1 día 9h"}
  else if(petal==4){return "18h"}
}
const[colorProgressFront,setColorProgressFront]=useState("")
const[colorProgressBack,setColorProgressBack]=useState("")

const progressBarColor =  () => { 
  switch (myPlants[position].type) {
    case "cactus":
      setColorProgressBack('#7AD0AC')
      setColorProgressFront("#269560")
      
      break
    case "sunflower":
      setColorProgressBack('#FCB36D')
      setColorProgressFront("#FC993D")
      
      break
    case "bonsai":
      setColorProgressBack('#A3A2D9')
      setColorProgressFront("#6967BA")
      break;
    case "redRose":
      setColorProgressBack('#F4A3B2')
      setColorProgressFront("#FB7F96")
      break
      default:
        break
    }
    
}
  
  const updatePlantsNextHealth = () => {
    var result = myPlants
    if(elixir!=0){
    if(result[position].health==3 && result[position].petals==5){
      Alert.alert('Aviso', 'Ya puedes canjear tu premio', [
            
        { text: 'OK' },
      ]);
    }else if(result[position].health==3){
      Alert.alert('Aviso', 'Tiene la salud máxima.', [
            
        { text: 'OK' },
      ]);
    }else{
        result[position].health=result[position].health +1
        setMyPlants(result)
        setGardenData()
        useItem('Elixir')
        setElixir(elixir-1)
        sethealthBar(result[position].health)
    }

    
    }else{
        Alert.alert('Aviso', 'No tienes ninguno. Cómpralo', [
            
            { text: 'OK' },
          ]);
    }

    
  }
  const updatePlantsNextPetal = () => {
    if(suplemento!=0){
        var result = myPlants
        if(result[position].petals!=5){
        result[position].petals = (result[position].petals) +1
        setMyPlants(result)
        setGardenData()
        useItem('Suplemento')
        setSuplemento(suplemento-1)
        setPetal(result[position].petals)
        }else{
          Alert.alert('Aviso', 'Ya ha crecido del todo.', [
            
            { text: 'OK' },
          ]);
        }
        

    }else{
        Alert.alert('Aviso', 'No tienes ninguno. Cómpralo', [
            
            { text: 'OK' },
          ]);
    }
    
  }
  const fetchGardenData = async () => {
    try{
      const response=await fetch(`${BACKEND_URL}/garden/gardenInfo/${uid}`);
      let body=await response.json();
      setMyPlants(body);
    } catch(error) {
      Alert.alert(error)
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
      Alert.alert(err)
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
      Alert.alert(err)
    }
  }
  const [fontsLoaded] = useFonts({
    MuseoModernoRegular: require("../../assets/fonts/MuseoModerno-Regular.ttf"),
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
})
  
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
        <Text style={[styles.textHeader,{fontFamily:'MuseoModernoBold'}]}>Mis Plantas</Text>
        <View style={styles.flowerContainer}>
            <ImageFlower plant={myPlants[position]}></ImageFlower>
        <View style={[styles.containerStyle,{backgroundColor:colorProgressBack}]}>
            <Animated.View
            style={[
            styles.innerStyle,{width, backgroundColor:colorProgressFront},
            ]}
            />
            <Animated.Text style={styles.label}>
            {progressBar()}
            </Animated.Text>
        </View>
        {petal==5?
          <View>
          <Lock></Lock>
          <Text>Queda {timeLeft()}</Text>
          </View>:
          <View>
              <TouchableOpacity style={styles.button} onPress={() => navigation1.navigate('premio')}>
                <Text>Floorecer</Text>
              </TouchableOpacity>
          </View>
        
        }
        </View>
        <View style={styles.itemContainer}>
        <Text style={[styles.textHeader,,{fontFamily:'MuseoModernoBold'}]}>Mis Items</Text>
        <View style={styles.sameLine}>
                <TouchableOpacity  style={{marginLeft:40}} onPress={updatePlantsNextPetal}>
                    <Suplemento />
                    <Text style={styles.textItem}>Suplemento  x {suplemento}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft:50}} onPress={updatePlantsNextHealth}>
                    
                    <Elixir/>
                    <Text style={styles.textItem}>Elixir  x  {elixir}</Text>
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
        backgroundColor:'white'
    },
    flowerContainer:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    sameLine:{
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop:30
    
      },
    textHeader:{
        fontSize: 25,
        marginTop: 10,
    },
    textItem:{
        textAlign: 'center',
    },
    itemContainer: {
      bottom:0,
      position:'absolute',
      
    },
    flowerImage: {
        width: 170,
        height: 300,
    },
    containerStyle: {
        width: "85%",
        height: 40,
        padding: 3,
        borderColor: "transparent",
        borderWidth: 3,
        borderRadius: 30,
        justifyContent: "center",
        },
    innerStyle:{
        width: "100%",
        height: 31,
        borderRadius: 16,
    },
    label:{
        fontSize:24,
        color: "black",
        position: "absolute",
        zIndex: 1,
        alignSelf: "center",
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      backgroundColor: "#7D7ACD",
      marginTop:20
    }
  
});



export default Inventory;