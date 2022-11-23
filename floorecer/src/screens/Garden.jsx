import React ,{ useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Modal, Text, FlatList } from 'react-native';
import { getItemAsync } from 'expo-secure-store';
import BotonFlor from '../components/BotonFlor';
import BotonImagen from '../components/BotonImagen'
import CustomButton from '../components/CustomButton'
import close from '../../assets/close.png'

import { BACKEND_URL } from '@env';

//Imports de las flores
import addIcon from '../../assets/garden/addIcon.svg'

import deadCactus from '../../assets/garden/deadCactus.svg'
import cactus0 from '../../assets/garden/cactus0.svg'
import cactus1 from '../../assets/garden/cactus1.svg'
import cactus2 from '../../assets/garden/cactus2.svg'
import cactus3 from '../../assets/garden/cactus3.svg'
import cactus4 from '../../assets/garden/cactus4.svg'

import purpleFlower33 from '../../assets/garden/purpleFlower/3petals3health.png'
import purpleFlower32 from '../../assets/garden/purpleFlower/3petals2health.png'
import purpleFlower31 from '../../assets/garden/purpleFlower/3petals1health.png'
import purpleFlower23 from '../../assets/garden/purpleFlower/2petals3health.png'
import purpleFlower22 from '../../assets/garden/purpleFlower/2petals2health.png'
import purpleFlower21 from '../../assets/garden/purpleFlower/2petals1health.png'
import purpleFlower13 from '../../assets/garden/purpleFlower/1petals3health.png'
import purpleFlower12 from '../../assets/garden/purpleFlower/1petals2health.png'
import purpleFlower11 from '../../assets/garden/purpleFlower/1petals1health.png'

import redFlower33 from '../../assets/garden/redFlower/3petals3health.png'
import redFlower32 from '../../assets/garden/redFlower/3petals2health.png'
import redFlower31 from '../../assets/garden/redFlower/3petals1health.png'
import redFlower23 from '../../assets/garden/redFlower/2petals3health.png'
import redFlower22 from '../../assets/garden/redFlower/2petals2health.png'
import redFlower21 from '../../assets/garden/redFlower/2petals1health.png'
import redFlower13 from '../../assets/garden/redFlower/1petals3health.png'
import redFlower12 from '../../assets/garden/redFlower/1petals2health.png'
import redFlower11 from '../../assets/garden/redFlower/1petals1health.png'

import whiteFlower33 from '../../assets/garden/whiteFlower/3petals3health.png'
import whiteFlower32 from '../../assets/garden/whiteFlower/3petals2health.png'
import whiteFlower31 from '../../assets/garden/whiteFlower/3petals1health.png'
import whiteFlower23 from '../../assets/garden/whiteFlower/2petals3health.png'
import whiteFlower22 from '../../assets/garden/whiteFlower/2petals2health.png'
import whiteFlower21 from '../../assets/garden/whiteFlower/2petals1health.png'
import whiteFlower13 from '../../assets/garden/whiteFlower/1petals3health.png'
import whiteFlower12 from '../../assets/garden/whiteFlower/1petals2health.png'
import whiteFlower11 from '../../assets/garden/whiteFlower/1petals1health.png'

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

  const getImage = (hole) => {
    switch (myPlants[hole].type) {
      case "purple":
        if (myPlants[hole].health == 1) {
          if (myPlants[hole].petals == 1) {
            return purpleFlower11
          }
          if (myPlants[hole].petals == 2) {
            return purpleFlower21
          }
          if (myPlants[hole].petals == 3) {
            return purpleFlower31
          }
        }
        if (myPlants[hole].health == 2) {
          if (myPlants[hole].petals == 1) {
            return purpleFlower12
          }
          if (myPlants[hole].petals == 2) {
            return purpleFlower22
          }
          if (myPlants[hole].petals == 3) {
            return purpleFlower32
          }
        }
        if (myPlants[hole].health == 3) {
          if (myPlants[hole].petals == 1) {
            return purpleFlower13
          }
          if (myPlants[hole].petals == 2) {
            return purpleFlower23
          }
          if (myPlants[hole].petals == 3) {
            return purpleFlower33
          }
        }
      case "red":
        if (myPlants[hole].health == 1) {
          if (myPlants[hole].petals == 1) {
            return redFlower11
          }
          if (myPlants[hole].petals == 2) {
            return redFlower21
          }
          if (myPlants[hole].petals == 3) {
            return redFlower31
          }
        }
        if (myPlants[hole].health == 2) {
          if (myPlants[hole].petals == 1) {
            return redFlower12
          }
          if (myPlants[hole].petals == 2) {
            return redFlower22
          }
          if (myPlants[hole].petals == 3) {
            return redFlower32
          }
        }
        if (myPlants[hole].health == 3) {
          if (myPlants[hole].petals == 1) {
            return redFlower13
          }
          if (myPlants[hole].petals == 2) {
            return redFlower23
          }
          if (myPlants[hole].petals == 3) {
            return redFlower33
          }
        }
      case "white":
        if (myPlants[hole].health == 1) {
          if (myPlants[hole].petals == 1) {
            return whiteFlower11
          }
          if (myPlants[hole].petals == 2) {
            return whiteFlower21
          }
          if (myPlants[hole].petals == 3) {
            return whiteFlower31
          }
        }
        if (myPlants[hole].health == 2) {
          if (myPlants[hole].petals == 1) {
            return whiteFlower12
          }
          if (myPlants[hole].petals == 2) {
            return whiteFlower22
          }
          if (myPlants[hole].petals == 3) {
            return whiteFlower32
          }
        }
        if (myPlants[hole].health == 3) {
          if (myPlants[hole].petals == 1) {
            return whiteFlower13
          }
          if (myPlants[hole].petals == 2) {
            return whiteFlower23
          }
          if (myPlants[hole].petals == 3) {
            return whiteFlower33
          }
        }
      default:
        return addIcon
    }
  }

    return (
      <View style={styles.container}>
        <Text>Mi jardín</Text>
        <View style={styles.garden}>
          <ImageBackground source={grass} resizeMode="cover" style={styles.image} />
          <View style={styles.flor0}>
            {
              {
                "noflower": <BotonFlor id="0" image={getImage(0)} rounded={true} onClick={() => {setOpenSeedsMenu(true); setHoleClicked(0)}}/>
              }[myPlants[0].type]
              || <BotonFlor id="0" image={getImage(0)} rounded={false} onClick={() => {}}/>
            }
          </View>
          <View style={styles.flor1}>
          {
              {
                "noflower": <BotonFlor id="1" image={getImage(1)} rounded={true} onClick={() => {setOpenSeedsMenu(true), setHoleClicked(1)}}/>
              }[myPlants[1].type]
              || <BotonFlor id="1" image={getImage(1)} rounded={false} onClick={() => {}}/>
            }
          </View>
          <View style={styles.flor2}>
          {
              {
                "noflower": <BotonFlor id="2" image={getImage(2)} rounded={true} onClick={() => {setOpenSeedsMenu(true), setHoleClicked(2)}}/>
              }[myPlants[2].type]
              || <BotonFlor id="2" image={getImage(2)} rounded={false} onClick={() => {}}/>
            }
          </View>
          <View style={styles.flor3}>
          {
              {
                "noflower": <BotonFlor id="3" image={getImage(3)} rounded={true} onClick={() => {setOpenSeedsMenu(true), setHoleClicked(3)}}/>
              }[myPlants[3].type]
              || <BotonFlor id="3" image={getImage(3)} rounded={false} onClick={() => {}}/>
            }
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