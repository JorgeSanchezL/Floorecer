import React ,{ useState } from 'react';
import { StyleSheet, View, ImageBackground, Dimensions, Modal, Text } from 'react-native';
import BotonFlor from '../components/BotonFlor';
import BotonImagen from '../components/BotonImagen'
import grass from '../../assets/garden/grass.jpg'
import menu from '../../assets/menu.png'
import close from '../../assets/close.png'

export const width = Dimensions.get('window').width;
export const height = Dimensions.get('window').height;

const Garden = () => {

  const [openItemMenu, setOpenItemMenu] = useState(false)
  const [openSeedsMenu, setOpenSeedsMenu] = useState(false)
  const [myPlants, setMyPlants] = useState([0,0,0,0]) //0 significa nada plantado

    return (
      <View style={styles.container}>
        <ImageBackground source={grass} resizeMode="cover" style={styles.image} />
        <View style={styles.topRight}>
          <BotonImagen image={menu} onClick={() => setOpenItemMenu(true)} size='medium'/>
        </View>
        <View style={styles.flor0}>
          {
            {
              0: <BotonFlor id="0" onClick={() => setOpenSeedsMenu(true)}/> //Flor sin plantar
            }[myPlants[0]]
            || <BotonFlor id="0" onClick={() => {}}/> //Flor plantada
          }
        </View>
        <View style={styles.flor1}>
        {
            {
              0: <BotonFlor id="1" onClick={() => setOpenSeedsMenu(true)}/> //Flor sin plantar
            }[myPlants[1]]
            || <BotonFlor id="1" onClick={() => {}}/> //Flor plantada
          }
        </View>
        <View style={styles.flor2}>
        {
            {
              0: <BotonFlor id="2" onClick={() => setOpenSeedsMenu(true)}/> //Flor sin plantar
            }[myPlants[2]]
            || <BotonFlor id="2" onClick={() => {}}/> //Flor plantada
          }
        </View>
        <View style={styles.flor3}>
        {
            {
              0: <BotonFlor id="3" onClick={() => setOpenSeedsMenu(true)}/> //Flor sin plantar
            }[myPlants[3]]
            || <BotonFlor id="3" onClick={() => {}}/> //Flor plantada
          }
        </View>
        <Modal visible={openItemMenu}>
          <View style={styles.modal}>
          <Text style={styles.title} >Inventario</Text>
            <View style={styles.topRight}>
              <BotonImagen image={close} onClick={() => setOpenItemMenu(false)} size='small'/>
            </View>
          </View>
        </Modal>
        <Modal visible={openSeedsMenu}>
          <View style={styles.modal}>
            <Text style={styles.title} >Mis semillas</Text>
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
    topRight: {
      position:"absolute",
      top:20,
      right:20
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