import React ,{ useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Modal, Text, FlatList } from 'react-native';
import BotonFlor from '../components/BotonFlor';
import BotonImagen from '../components/BotonImagen'
import CustomButton from '../components/CustomButton'
import grass from '../../assets/garden/grass.jpg'
import menu from '../../assets/menu.png'
import close from '../../assets/close.png'

import { BACKEND_URL } from '@env';

//Imports de las flores
import dirt from '../../assets/garden/dirt.jpg'
import purpleFlower33 from '../../assets/garden/purpleFlower/3petals3health.png'
import purpleFlower32 from '../../assets/garden/purpleFlower/3petals2health.png'
import purpleFlower31 from '../../assets/garden/purpleFlower/3petals1health.png'
import purpleFlower23 from '../../assets/garden/purpleFlower/2petals3health.png'
import purpleFlower22 from '../../assets/garden/purpleFlower/2petals2health.png'
import purpleFlower21 from '../../assets/garden/purpleFlower/2petals1health.png'
import purpleFlower13 from '../../assets/garden/purpleFlower/1petals3health.png'
import purpleFlower12 from '../../assets/garden/purpleFlower/1petals2health.png'
import purpleFlower11 from '../../assets/garden/purpleFlower/1petals1health.png'

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

const Garden = () => {

  const uuid = "L8Wyfo7DsSOCLYPujztzHKx0SKF3"

  const [openSeedsMenu, setOpenSeedsMenu] = useState(false)
  const [inventory, setInventory] = useState()
  const [myPlants, setMyPlants] = useState([{type: "purple", petals: 3, health: 3}, {type: "purple", petals: 2, health: 2}, {type: "purple", petals: 1, health: 1}, {type: "noflower", petals: 0, health: 0}])

  useEffect(() => {
    fetchGardenData()
    fetchInventoryData()
  }, [myPlants])

  const fetchGardenData = async () => {
    try{
      const response=await fetch(`${BACKEND_URL}/users/gardenInfo/${uuid}`);
      let body=await response.json();
      setMyPlants(body);
    } catch(error) {
      console.error(error);
    }
  }

  const fetchInventoryData = async () => {
    try{
      const response=await fetch(`${BACKEND_URL}/users/mySeeds/${uuid}`);
      let body=await response.json();
      setInventory(body);
    } catch(error) {
      console.log(error);
    }
  }

  const setInventoryData = async (name) => {
    try {
      const response = await fetch(`${BACKEND_URL}/users/getActualPlan`, {
        method: 'POST',
        body: JSON.stringify({
         uuid : uuid,
         name: name,
         newAmount: inventory[seeds][name]
      }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },     
      });
    } catch (err) {
      console.log(err)
    }
  }

  const plantSeed = (name, hole) => {
    var newInventory = inventory
    newInventory[seeds][name] -= 1
    setInventory(newInventory)
    setInventoryData(name)
    setMyPlants(updatePlants(name, hole))
  }

  const updatePlants = (name, hole) => {
    var result = myPlants
    result[hole].health = "1"
    result[hole].petals = "1"
    switch (name) {
      case "Purple seeds":
        result[hole].type = "purple"
        break
      case "Red seeds":
        result[hole].type = "red"
        break
      default:
        result[hole].type = "white"
        break
    }
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
        return dirt
    }
  }

    return (
      <View style={styles.container}>
        <ImageBackground source={grass} resizeMode="cover" style={styles.image} />
        <View style={styles.flor0}>
          {
            {
              "noflower": <BotonFlor id="0" image={getImage(0)} rounded={true} onClick={() => setOpenSeedsMenu(true)}/>
            }[myPlants[0].type]
            || <BotonFlor id="0" image={getImage(0)} rounded={false} onClick={() => {}}/>
          }
        </View>
        <View style={styles.flor1}>
        {
            {
              "noflower": <BotonFlor id="1" image={getImage(1)} rounded={true} onClick={() => setOpenSeedsMenu(true)}/>
            }[myPlants[1].type]
            || <BotonFlor id="1" image={getImage(1)} rounded={false} onClick={() => {}}/>
          }
        </View>
        <View style={styles.flor2}>
        {
            {
              "noflower": <BotonFlor id="2" image={getImage(2)} rounded={true} onClick={() => setOpenSeedsMenu(true)}/>
            }[myPlants[2].type]
            || <BotonFlor id="2" image={getImage(2)} rounded={false} onClick={() => {}}/>
          }
        </View>
        <View style={styles.flor3}>
        {
            {
              "noflower": <BotonFlor id="3" image={getImage(3)} rounded={true} onClick={() => setOpenSeedsMenu(true)}/>
            }[myPlants[3].type]
            || <BotonFlor id="3" image={getImage(3)} rounded={false} onClick={() => {}}/>
          }
        </View>
        <Modal visible={openSeedsMenu}>
          <View style={styles.modal}>
            <Text style={styles.title} >Mis semillas</Text>
            {inventory.map((element, index) => {
              return (
                <View style={styles.container}>
                  <Text style={{alignSelf: 'flex-start'}} >{element.itemName}</Text>
                  <Text style={{alignSelf: 'center'}} >{element.amount}</Text>
                  <CustomButton onPress={() => plantSeed(itemName)} text='Plantar' type="cuaterciario" alignRight={true}/>
                </View>
              )
            })}
            <View style={styles.topRight}>
              <BotonImagen image={close} onClick={() => setOpenSeedsMenu(false)} size='small'/>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{
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