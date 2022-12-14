import React ,{ useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, Modal, Text } from 'react-native';
import { getItemAsync } from 'expo-secure-store';
import BotonFlor from '../components/BotonFlor';
import BotonImagen from '../components/BotonImagen'
import CustomButton from '../components/CustomButton'
import close from '../../assets/close.png'
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '@env';
import Sun from '../components/flowers/Sun';
import { useFonts } from 'expo-font';

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

const Garden = () => {

  const navigation = useNavigation();
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

      if (body[0].type !== 'noflower') {
        if ((body[0].type === 'bonsai' || body[0].type == 'redRose') && (body[0].petals >= 4 || body[1].health == 0)) {
          newStyles[0] = styles.bigFlower0
        } else {
          newStyles[0] = styles.flor0
        }
      } else {
        newStyles[0] = styles.hueco0
      }
      
      if (body[1].type !== 'noflower') {
        if ((body[1].type === 'bonsai' || body[1].type == 'redRose') && (body[1].petals >= 4 || body[1].health == 0)) {
          newStyles[1] = styles.bigFlower1
        } else {
          newStyles[1] = styles.flor1
        }
      } else {
        newStyles[1] = styles.hueco1
      }

      if (body[2].type !== 'noflower') {
        if (body[2].type === 'bonsai') {
          if (body[2].petals > 2 || body[2].health == 0) {
            newStyles[2] = styles.bigBonsai2
          } else {
            newStyles[2] = styles.smallBonsai2
          }
        } else if (body[2].type === 'sunflower') {
          newStyles[2] = styles.sunflower2
        } else if (body[2].type === 'redRose') {
          if (body[2].petals > 3 || body[2].health == 0) {
            newStyles[2] = styles.bigRedRose2
          } else {
            newStyles[2] = styles.smallRedRose2
          }
        } else {
          newStyles[2] = styles.flor2
        }
      } else {
        newStyles[2] = styles.hueco2
      }

      if (body[3].type !== 'noflower') {
        if (body[3].type === 'bonsai') {
          if (body[3].petals == 5) {
            newStyles[3] = styles.veryBigBonsai3
          } else if (body[3].petals > 2 || body[3].health == 0) {
            newStyles[3] = styles.bigBonsai3
          } else {
            newStyles[3] = styles.smallBonsai3
          }
        } else if (body[3].type === 'sunflower') {
          newStyles[3] = styles.sunflower3
        } else if (body[3].type === 'redRose') {
          newStyles[3] = body[3].petals < 4 && body[3].health > 0 ? styles.smallRedRose3 : styles.bigRedRose3
        } else if (body[3].type === 'cactus' && body[3].petals == 3) {
          newStyles[3] = styles.midCactus3
        } else {
          newStyles[3] = styles.flor3
        }
      } else {
        newStyles[3] = styles.hueco3
      }
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
      let newStyles = []

      if (body[0].type !== 'noflower') {
        if ((body[0].type === 'bonsai' || body[0].type == 'redRose') && (body[0].petals >= 4 || body[1].health == 0)) {
          newStyles[0] = styles.bigFlower0
        } else {
          newStyles[0] = styles.flor0
        }
      } else {
        newStyles[0] = styles.hueco0
      }
      
      if (body[1].type !== 'noflower') {
        if ((body[1].type === 'bonsai' || body[1].type == 'redRose') && (body[1].petals >= 4 || body[1].health == 0)) {
          newStyles[1] = styles.bigFlower1
        } else {
          newStyles[1] = styles.flor1
        }
      } else {
        newStyles[1] = styles.hueco1
      }

      if (body[2].type !== 'noflower') {
        if (body[2].type === 'bonsai') {
          if (body[2].petals > 2 || body[2].health == 0) {
            newStyles[2] = styles.bigBonsai2
          } else {
            newStyles[2] = styles.smallBonsai2
          }
        } else if (body[2].type === 'sunflower') {
          newStyles[2] = styles.sunflower2
        } else if (body[2].type === 'redRose') {
          if (body[2].petals > 3 || body[2].health == 0) {
            newStyles[2] = styles.bigRedRose2
          } else {
            newStyles[2] = styles.smallRedRose2
          }
        } else {
          newStyles[2] = styles.flor2
        }
      } else {
        newStyles[2] = styles.hueco2
      }

      if (body[3].type !== 'noflower') {
        if (body[3].type === 'bonsai') {
          if (body[3].petals == 5) {
            newStyles[3] = styles.veryBigBonsai3
          } else if (body[3].petals > 2 || body[3].health == 0) {
            newStyles[3] = styles.bigBonsai3
          } else {
            newStyles[3] = styles.smallBonsai3
          }
        } else if (body[3].type === 'sunflower') {
          newStyles[3] = styles.sunflower3
        } else if (body[3].type === 'redRose') {
          newStyles[3] = body[3].petals < 4 && body[3].health > 0 ? styles.smallRedRose3 : styles.bigRedRose3
        } else if (body[3].type === 'cactus' && body[3].petals == 3) {
          newStyles[3] = styles.midCactus3
        } else {
          newStyles[3] = styles.flor3
        }
      } else {
        newStyles[3] = styles.hueco3
      }
      setFlowerStyles(newStyles)
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
      case "Semilla verde":
        result[holeClicked].type = "cactus"
        break
      case "Semilla rosa":
        result[holeClicked].type = "redRose"
        break
      case "Semilla naranja":
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
    else {
      navigation.navigate('inventory', {
        position: clicked
    })
    }
  }
  const [fontLoaded] = useFonts({
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf"),
    PoppinsBold: require("../../assets/fonts/Poppins-Bold.ttf"),
  })

  if(!fontLoaded) { return null; }
    return (
      <View style={styles.container}>
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
          <View style={styles.centered}>
            <Sun />
          </View>
          <Modal visible={openSeedsMenu}>
            <View style={styles.modal}>
              <Text style={styles.title}>Mis objetos</Text>
              {inventory != null && 
                <View style={styles.card} key={0}>
                  <Text style={styles.itemText}>Abono x{inventory.Abono}</Text>
                  {
                    inventory.Abono > 0 ? 
                      <CustomButton onPress={() => {fertilizeHole(); setOpenSeedsMenu(false)}} text='Usar' type="cuaterciario" alignRight={true}/> 
                      : 
                      <></>
                  }
                </View>
              }
              {inventory != null && inventory.seeds.map((element, index) => {
                return (
                  <View style={styles.card} key={index + 1}>
                    <Text style={styles.itemText}>{element.itemName} x{element.amount}</Text>
                    {
                      element.amount > 0 ?
                        <CustomButton onPress={() => {plantSeed(index); setOpenSeedsMenu(false)}} text='Plantar' type="cuaterciario" alignRight={true}/>
                        :
                        <></>
                    }
                  </View>
                )
              })}
              <View style={styles.bottom}>
                <BotonImagen image={close} onClick={() => setOpenSeedsMenu(false)} size='small'/>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    garden: {
      backgroundColor: '#F3FEFF',
      flex: 1
    },
    centered: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center'
    },
    modal: {
      backgroundColor: '#F3FEFF',
      flex: 1
    },
    title: {
      top: 20,
      fontSize: 35,
      fontFamily:'MuseoModernoBold',
      color: '#00996D',
      alignSelf: 'center',
      marginBottom: 20
    },
    card: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 20,
    },
    itemText: {
      alignSelf: 'center',
      fontWeight: 'bold',
      fontFamily:'PoppinsBold',
      fontSize: 17
    },
    bottom: {
      position: "absolute",
      bottom: 20,
      alignSelf: 'center'
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
      left: width/10
    },
    bigFlower0: {
      position:"absolute",
      bottom:0,
      left: width/20 - 10
    },
    hueco0: {
      position:"absolute",
      top:height/5.5*4,
      left:width/6
    },
    flor1: {
      position:"absolute",
      bottom:0,
      right:width/5
    },
    bigFlower1: {
      position:"absolute",
      bottom:0,
      right:width/20 -10
    },
    hueco1: {
      position:"absolute",
      top:height/5.5*3,
      right:width/18
    },
    bigBonsai2: {
      position:"absolute",
      top:height/4,
      left:-37,
      transform: [{ rotate: '55deg'}]
    },
    smallBonsai2: {
      position:"absolute",
      top:height/4,
      left:-10,
      transform: [{ rotate: '55deg'}]
    },
    sunflower2: {
      position:"absolute",
      top:height/4,
      left:0,
      transform: [{ rotate: '55deg'}]
    },
    bigRedRose2: {
      position:"absolute",
      top:height/4,
      left:-37,
      transform: [{ rotate: '55deg'}]
    },
    smallRedRose2: {
      position:"absolute",
      top:height/4,
      left:6,
      transform: [{ rotate: '55deg'}]
    },
    flor2: {
      position:"absolute",
      top:height/4,
      left:8,
      transform: [{ rotate: '55deg'}]
    },
    hueco2: {
      position:"absolute",
      top:height/5.5*2,
      left:width/6
    },
    smallBonsai3: {
      position:"absolute",
      top:height/2.5,
      right:15,
      transform: [{ rotate: '-55deg'}]
    },
    veryBigBonsai3: {
      position:"absolute",
      top:height/2.5,
      right:-40,
      transform: [{ rotate: '-55deg'}]
    },
    bigBonsai3: {
      position:"absolute",
      top:height/2.5,
      right:-30,
      transform: [{ rotate: '-55deg'}]
    },
    midCactus3: {
      position:"absolute",
      top:height/2.5,
      right:5,
      transform: [{ rotate: '-55deg'}]
    },
    sunflower3: {
      position:"absolute",
      top:height/2.5,
      right:-5,
      transform: [{ rotate: '-55deg'}]
    },
    smallRedRose3: {
      position:"absolute",
      top:height/2.5,
      right:5,
      transform: [{ rotate: '-55deg'}]
    },
    bigRedRose3: {
      position:"absolute",
      top:height/2.5,
      right:-27,
      transform: [{ rotate: '-55deg'}]
    },
    flor3: {
      position:"absolute",
      top:height/2.5,
      right:20,
      transform: [{ rotate: '-55deg'}]
    },
    hueco3: {
      position:"absolute",
      top:height/5.5,
      right:width/18
    },
  });
  
  export default Garden;