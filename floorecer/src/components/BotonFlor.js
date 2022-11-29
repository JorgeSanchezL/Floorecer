import React from 'react'
import { TouchableOpacity, Alert, Image, StyleSheet } from 'react-native'

import addIcon from '../../assets/garden/addIcon.svg'

import heart0 from '../../assets/garden/heart0.png'
import heart1 from '../../assets/garden/heart1.png'
import heart2 from '../../assets/garden/heart2.png'
import heart3 from '../../assets/garden/heart3.png'

import deadCactus from '../../assets/garden/deadCactus.svg'
import cactus0 from '../../assets/garden/cactus0.svg'
import cactus1 from '../../assets/garden/cactus1.svg'
import cactus2 from '../../assets/garden/cactus2.svg'
import cactus3 from '../../assets/garden/cactus3.svg'
import cactus4 from '../../assets/garden/cactus4.svg'

import deadSunflower from '../../assets/garden/deadSunflower.svg'
import sunflower0 from '../../assets/garden/sunflower0.svg'
import sunflower1 from '../../assets/garden/sunflower1.svg'
import sunflower2 from '../../assets/garden/sunflower2.svg'
import sunflower3 from '../../assets/garden/sunflower3.svg'
import sunflower4 from '../../assets/garden/sunflower4.svg'

import deadBlueOrchid from '../../assets/garden/deadBlueOrchid.svg'
import blueOrchid0 from '../../assets/garden/blueOrchid0.svg'
import blueOrchid1 from '../../assets/garden/blueOrchid1.svg'
import blueOrchid2 from '../../assets/garden/blueOrchid2.svg'
import blueOrchid3 from '../../assets/garden/blueOrchid3.svg'
import blueOrchid4 from '../../assets/garden/blueOrchid4.svg'

import deadRedRose from '../../assets/garden/deadRedRose.svg'
import redRose0 from '../../assets/garden/redRose0.svg'
import redRose1 from '../../assets/garden/redRose1.svg'
import redRose2 from '../../assets/garden/redRose2.svg'
import redRose3 from '../../assets/garden/redRose3.svg'
import redRose4 from '../../assets/garden/redRose4.svg'

const getImage = (gardenPlant) => {
  let plant
  switch (gardenPlant.type) {
    case "cactus":
      if (gardenPlant.health == 0) plant = deadCactus
      else if (gardenPlant.petals == 1) plant = cactus0
      else if (gardenPlant.petals == 2) plant = cactus1
      else if (gardenPlant.petals == 3) plant = cactus2
      else if (gardenPlant.petals == 4) plant = cactus3
      else if (gardenPlant.petals == 5) plant = cactus4
      break
    case "sunflower":
      if (gardenPlant.health == 0) plant = deadSunflower
      else if (gardenPlant.petals == 1) plant = sunflower0
      else if (gardenPlant.petals == 2) plant = sunflower1
      else if (gardenPlant.petals == 3) plant = sunflower2
      else if (gardenPlant.petals == 4) plant = sunflower3
      else if (gardenPlant.petals == 5) plant = sunflower4
      break
    case "blueOrchid":
      if (gardenPlant.health == 0) plant = deadBlueOrchid
      else if (gardenPlant.petals == 1) plant = blueOrchid0
      else if (gardenPlant.petals == 2) plant = blueOrchid1
      else if (gardenPlant.petals == 3) plant = blueOrchid2
      else if (gardenPlant.petals == 4) plant = blueOrchid3
      else if (gardenPlant.petals == 5) plant = blueOrchid4
      break;
    case "redRose":
      if (gardenPlant.health == 0) plant = deadRedRose
      else if (gardenPlant.petals == 1) plant = redRose0
      else if (gardenPlant.petals == 2) plant = redRose1
      else if (gardenPlant.petals == 3) plant = redRose2
      else if (gardenPlant.petals == 4) plant = redRose3
      else if (gardenPlant.petals == 5) plant = redRose4
      break
    default:
      return { image: addIcon, health: gardenPlant.health, rounded: false }
  }
  return { image: plant, health: gardenPlant.health, rounded: true }
}

export default class BotonFlor extends React.Component {
  data = getData(this.props.plant)
  render() {
    return (
      <TouchableOpacity style={styles.touchable} onPress={this.props.onClick}>
        {
          {
            true: {
              0: 
                <div>
                  <Image source={data.image} style={styles.roundedImage} />
                  <Image source={heart0} style={styles.image} />
                </div>,
              1: 
                <div>
                  <Image source={data.image} style={styles.roundedImage} />
                  <Image source={heart1} style={styles.image} />
                </div>,
              2: 
                <div>
                  <Image source={data.image} style={styles.roundedImage} />
                  <Image source={heart2} style={styles.image} />
                </div>,
              3: 
                <div>
                  <Image source={data.image} style={styles.roundedImage} />
                  <Image source={heart3} style={styles.image} />
                </div>
            }[data.health],
            false: <Image resizeMode='contain' source={data.image} style={styles.image} />
          }[data.rounded]
        }
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    height: 125,
    width: 125
  },
  roundedImage: {
    borderRadius: 62.5,
    height: 125,
    width: 125
  },
  touchable: {
    alignItems: 'center',
    justifyContent: 'center'
  }
})