import React ,{ useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Modal, Text, FlatList } from 'react-native';
import { getItemAsync } from 'expo-secure-store';
import BotonFlor from '../components/BotonFlor';
import BotonImagen from '../components/BotonImagen'
import CustomButton from '../components/CustomButton'
import close from '../../assets/close.png'

import { BACKEND_URL } from '@env';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

const Garden = () => {

  const [UUID, setUUID] = useState()
  const [openSeedsMenu, setOpenSeedsMenu] = useState(false)
  const [inventory, setInventory] = useState(null)
  const [myPlants, setMyPlants] = useState([{type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}, {type: "noflower", petals: 3, health: 3}])
  const [holeClicked, setHoleClicked] = useState()

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (UUID != null) {
      fetchGardenData()
    }
  }, [UUID])

  useEffect(() => {
    if (UUID != null) {
      fetchInventoryData()
    }
  }, [UUID])

  useEffect(() => {
    setGardenData()
  }, [myPlants])

  useEffect(() => {
    setInventoryData()
  }, [inventory])

  const fetchUserData = async () => {
    try {
      setUUID(JSON.parse(await getItemAsync('auth0')).uid)
    } catch (err) {
      Alert.alert(err)
    }
  }

  const fetchGardenData = async () => {
    try{
      const response=await fetch(`${BACKEND_URL}/garden/gardenInfo/${UUID}`);
      let body=await response.json();
      setMyPlants(body);
    } catch(error) {
      Alert.alert(error)
    }
  }

  const fetchInventoryData = async () => {
    try{
      const response=await fetch(`${BACKEND_URL}/garden/mySeeds/${UUID}`);
      let body=await response.json();
      setInventory(body);
    } catch(error) {
      Alert.alert(error)
    }
  }

  const setInventoryData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/garden/updateItems`, {
        method: 'POST',
        body: JSON.stringify({
         uuid : UUID,
         inventory: inventory
      }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },     
      });
    } catch (err) {
      Alert.alert(err)
    }
  }

  const setGardenData = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/garden/updateGarden`, {
        method: 'POST',
        body: JSON.stringify({
         uuid : UUID,
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

  const plantSeed = (pos) => {
    var newInventory = inventory
    newInventory.seeds[pos].amount -= 1
    setInventory(newInventory)
    if (myPlants[holeClicked].fertilizer.getTime() >= new Date()) {
      setMyPlants(plantAndGetGarden(pos, 3, 1))
    } else {
      setMyPlants(plantAndGetGarden(pos, 1, 1))
    }
  }

  const fertilizeHole = () => {
    var newInventory = inventory
    newInventory.Abono -= 1
    setInventory(newInventory)
    setMyPlants(fertilizeAndGetGarden())
  }

  const plantAndGetGarden = (pos, health, petals) => {
    var result = myPlants
    result[holeClicked].health = health
    result[holeClicked].petals = petals
    switch (inventory.seeds[pos].itemName) {
      case "Purple seeds":
        result[holeClicked].type = "purple"
        break
      case "Red seeds":
        result[holeClicked].type = "red"
        break
      default:
        result[holeClicked].type = "white"
        break
    }
    return result
  }

  const fertilizeAndGetGarden = () => {
    var result = myPlants
    result[holeClicked].fertilizer = new Date()
    return result
  }

    return (
      <View style={styles.container}>
        <Text>Mi jardín</Text>
        <View style={styles.garden}>
          <View style={styles.flor0}>
            <BotonFlor id="1" plant={myPlants[0]} onClick={() => {}}/>
          </View>
          <View style={styles.flor1}>
            <BotonFlor id="1" plant={myPlants[1]} onClick={() => {}}/>
          </View>
          <View style={styles.flor2}>
            <BotonFlor id="1" plant={myPlants[2]} onClick={() => {}}/>
          </View>
          <View style={styles.flor3}>
            <BotonFlor id="1" plant={myPlants[3]} onClick={() => {}}/>
          </View>
          <Modal visible={openSeedsMenu}>
            <View style={styles.modal}>
              <Text style={styles.title}>Mis objetos</Text>
              {inventory != null && inventory.seeds.map((element, index) => {
                return (
                  <View style={styles.container} key={index}>
                    <Text style={{alignSelf: 'flex-start'}} >{element.itemName}</Text>
                    <Text style={{alignSelf: 'center'}} >{element.amount}</Text>
                    <CustomButton onPress={() => {plantSeed(index, 1, 1); setOpenSeedsMenu(false)}} text='Plantar' type="cuaterciario" alignRight={true}/>
                  </View>
                )
              })}
              {inventory != null && 
                <View style={styles.container} key={index}>
                  <Text style={{alignSelf: 'flex-start'}} >Abono</Text>
                  <Text style={{alignSelf: 'center'}} >{inventory.Abono}</Text>
                  <CustomButton onPress={() => {fertilizeHole(index); setOpenSeedsMenu(false)}} text='Usar' type="cuaterciario" alignRight={true}/>
                </View>
              }
              <View style={styles.topRight}>
                <BotonImagen image={close} onClick={() => setOpenSeedsMenu(false)} size='small'/>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
      flex: 1
    },
    garden:{
      backgroundColor: '#F3FEFF',
      flex: 1
    },
    modal: {
      backgroundColor: '#D7FFE7',
      flex: 1,
      alignItems: 'center',
    },
    title: {
      top: 20,
      fontSize: 35,
      fontWeight: 'bold',
      color: '#00996D'
    },
    logo: {
      width:'70%',
      maxWidth: 300,
      maxHeight: 200,
    },
    image: {
      position:"absolute",
      top:0,
      left:0,
      bottom:0,
      right:0
    },
    flor0: {
      position:"absolute",
      top:height/5.5*4,
      left:width/6
    },
    flor1: {
      position:"absolute",
      top:height/5.5*3,
      left:width/2
    },
    flor2: {
      position:"absolute",
      top:height/5.5*2,
      left:width/6
    },
    flor3: {
      position:"absolute",
      top:height/5.5,
      left:width/2
    },
  });
  
  export default Garden;