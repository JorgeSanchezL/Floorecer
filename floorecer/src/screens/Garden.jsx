import React ,{ useEffect, useState, useRef } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Modal, Text, FlatList } from 'react-native';
import { getItemAsync } from 'expo-secure-store';
import BotonFlor from '../components/BotonFlor';
import BotonImagen from '../components/BotonImagen'
import CustomButton from '../components/CustomButton'
import close from '../../assets/close.png'

import { BACKEND_URL } from '@env';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const Garden = () => {

  const [UUID, setUUID] = useState()
  const [openSeedsMenu, setOpenSeedsMenu] = useState(false)
  const [inventory, setInventory] = useState(null)
  const [myPlants, setMyPlants] = useState([{type: "cactus", petals: 3, health: 3, fertilizer: new Date()}, {type: "sunflower", petals: 2, health: 3, fertilizer: new Date()}, {type: "bonsai", petals: 1, health: 3, fertilizer: new Date()}, {type: "noflower", petals: 3, health: 3, fertilizer: new Date()}])
  const [flowerStyles, setFlowerStyles] = useState([styles.flor0, styles.flor1, styles.flor2, styles.flor3])
  const [holeClicked, setHoleClicked] = useState()

  useEffect(() => {
    fetchUserData()
  }, [])

  useEffect(() => {
    if (UUID != null) {
      fetchGardenData().then(() => {
        
      })
    }
  }, [UUID])

  useEffect(() => {
    if (UUID != null) {
      fetchInventoryData()
    }
  }, [UUID])

  const fetchUserData = async () => {
    try {
      setUUID(JSON.parse(await getItemAsync('auth0')).uid)
    } catch (error) {
      alert((typeof error === 'string' || error instanceof String) ? error : error.message)
    }
  }

  const fetchGardenData = async () => {
    if (typeof UUID != 'undefined') try{
      const response=await fetch(`${BACKEND_URL}/garden/gardenInfo/${UUID}`);
      let body=await response.json();
      setMyPlants(body);
      let newStyles = []
      newStyles[0] = body[0].type === 'noflower' ? styles.hueco0 : styles.flor0
      newStyles[1] = body[1].type === 'noflower' ? styles.hueco1 : styles.flor1
      newStyles[2] = body[2].type === 'noflower' ? styles.hueco2 : styles.flor2
      newStyles[3] = body[3].type === 'noflower' ? styles.hueco3 : styles.flor3
      setFlowerStyles(newStyles)
    } catch(error) {
      alert((typeof error === 'string' || error instanceof String) ? error : error.message)
    }
  }

  const fetchInventoryData = async () => {
    if (typeof UUID != 'undefined') try{
      const response=await fetch(`${BACKEND_URL}/garden/mySeeds/${UUID}`);
      let body=await response.json();
      setInventory(body);
    } catch(error) {
      alert((typeof error === 'string' || error instanceof String) ? error : error.message)
    }
  }

  const setInventoryData = async () => {
    if (typeof UUID != 'undefined') try {
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
    } catch (error) {
      alert((typeof error === 'string' || error instanceof String) ? error : error.message)
    }
  }

  const setGardenData = async () => {
    if (typeof UUID != 'undefined') try {
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
      let newStyles = []
      newStyles[0] = myPlants[0].type === 'noflower' ? styles.hueco0 : styles.flor0
      newStyles[1] = myPlants[1].type === 'noflower' ? styles.hueco1 : styles.flor1
      newStyles[2] = myPlants[2].type === 'noflower' ? styles.hueco2 : styles.flor2
      newStyles[3] = myPlants[3].type === 'noflower' ? styles.hueco3 : styles.flor3
      setFlowerStyles(newStyles)
    } catch (error) {
      alert((typeof error === 'string' || error instanceof String) ? error : error.message)
    }
  }

  const plantSeed = (pos) => {
    var newInventory = inventory
    newInventory.seeds[pos].amount -= 1
    setInventory(newInventory)
    setInventoryData()
    if ((new Date(myPlants[holeClicked].fertilizer)).addDays(3) >= new Date()) {
      setMyPlants(plantAndGetGarden(pos, 3, 1))
      setGardenData()
    } else {
      setMyPlants(plantAndGetGarden(pos, 1, 1))
      setGardenData()
    }
  }

  const fertilizeHole = () => {
    var newInventory = inventory
    newInventory.Abono -= 1
    setInventory(newInventory)
    setInventoryData()
    setMyPlants(fertilizeAndGetGarden())
    setGardenData()
  }

  const plantAndGetGarden = (pos, health, petals) => {
    var result = myPlants
    result[holeClicked].health = health
    result[holeClicked].petals = petals
    switch (inventory.seeds[pos].itemName) {
      case "Cactus seeds":
        result[holeClicked].type = "cactus"
        break
      case "Red Rose seeds":
        result[holeClicked].type = "redRose"
        break
      case "Sunflower seeds":
        result[holeClicked].type = "sunflower"
        break
      default:
        result[holeClicked].type = "bonsai"
        break
    }
    return result
  }

  const fertilizeAndGetGarden = () => {
    var result = myPlants
    result[holeClicked].fertilizer = new Date()
    return result
  }

  const getOnHoleClick = (clicked) => {
    setHoleClicked(clicked)
    if (myPlants[clicked].type === 'noflower')
      setOpenSeedsMenu(true)
    else {}
      //Abrir menu inventario
  }

    return (
      <View style={styles.container}>
        <Text>Mi jardín</Text>
        <View style={styles.garden}>
          <View style={flowerStyles[0]}>
            <BotonFlor id="1" plant={myPlants[0]} onClick={() => getOnHoleClick(0)} />
          </View>
          <View style={flowerStyles[1]}>
            <BotonFlor id="1" plant={myPlants[1]} onClick={() => getOnHoleClick(1)} />
          </View>
          <View style={flowerStyles[2]}>
            <BotonFlor id="1" plant={myPlants[2]} onClick={() => getOnHoleClick(2)} />
          </View>
          <View style={flowerStyles[3]}>
            <BotonFlor id="1" plant={myPlants[3]} onClick={() => getOnHoleClick(3)} />
          </View>
          <Modal visible={openSeedsMenu}>
            <View style={styles.modal}>
              <Text style={styles.title}>Mis objetos</Text>
              {inventory != null && inventory.seeds.map((element, index) => {
                return (
                  <View style={styles.container} key={index + 1}>
                    <Text style={{alignSelf: 'flex-start'}} >{element.itemName}</Text>
                    <Text style={{alignSelf: 'center'}} >{element.amount}</Text>
                    <CustomButton onPress={() => {plantSeed(index); setOpenSeedsMenu(false)}} text='Plantar' type="cuaterciario" alignRight={true}/>
                  </View>
                )
              })}
              {inventory != null && 
                <View style={styles.container} key={0}>
                  <Text style={{alignSelf: 'flex-start'}} >Abono</Text>
                  <Text style={{alignSelf: 'center'}} >{inventory.Abono}</Text>
                  <CustomButton onPress={() => {fertilizeHole(); setOpenSeedsMenu(false)}} text='Usar' type="cuaterciario" alignRight={true}/>
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
      bottom:0,
      right:width/3
    },
    hueco0: {
      position:"absolute",
      top:height/5.5*4,
      left:width/6
    },
    flor1: {
      position:"absolute",
      bottom:0,
      left:width/2
    },
    hueco1: {
      position:"absolute",
      top:height/5.5*3,
      right:width/18
    },
    flor2: {
      position:"absolute",
      top:height/9,
      left:-125,
      transform: [{ rotate: '45deg'}]
    },
    hueco2: {
      position:"absolute",
      top:height/5.5*2,
      left:width/6
    },
    flor3: {
      position:"absolute",
      top:height/4,
      right:-125,
      transform: [{ rotate: '-55deg'}]
    },
    hueco3: {
      position:"absolute",
      top:height/5.5,
      left:width/2
    },
  });
  
  export default Garden;