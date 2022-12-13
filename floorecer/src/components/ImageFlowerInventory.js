import React from 'react'
import { View } from 'react-native'
import { TouchableOpacity, StyleSheet } from 'react-native'


import { Bonsai0, Bonsai1, Bonsai2, Bonsai3, Bonsai4, DeadBonsai } from './inventory/bonsais'
import { Cactus0, Cactus1, Cactus2, Cactus3, Cactus4, DeadCactus } from './inventory/cactus'
import { RedRose0, RedRose1, RedRose2, RedRose3, RedRose4, DeadRedRose } from './inventory/redRoses'
import { Sunflower0, Sunflower1, Sunflower2, Sunflower3, Sunflower4, DeadSunflower } from './inventory/sunflowers'

const getImage = (gardenPlant) => {
  switch (gardenPlant.type) {
    case "cactus":
      if (gardenPlant.health == 0) return <DeadCactus />
      else if (gardenPlant.petals == 1) return <Cactus0 />
      else if (gardenPlant.petals == 2) return <Cactus1 />
      else if (gardenPlant.petals == 3) return <Cactus2 />
      else if (gardenPlant.petals == 4) return <Cactus3 />
      else if (gardenPlant.petals == 5) return <Cactus4 />
      break
    case "sunflower":
      if (gardenPlant.health == 0) return <DeadSunflower />
      else if (gardenPlant.petals == 1) return <Sunflower0 />
      else if (gardenPlant.petals == 2) return <Sunflower1 />
      else if (gardenPlant.petals == 3) return <Sunflower2 />
      else if (gardenPlant.petals == 4) return <Sunflower3 />
      else if (gardenPlant.petals == 5) return <Sunflower4 />
      break
    case "bonsai":
      if (gardenPlant.health == 0) return <DeadBonsai />
      else if (gardenPlant.petals == 1) return <Bonsai0 />
      else if (gardenPlant.petals == 2) return <Bonsai1 />
      else if (gardenPlant.petals == 3) return <Bonsai2 />
      else if (gardenPlant.petals == 4) return <Bonsai3 />
      else if (gardenPlant.petals == 5) return <Bonsai4 />
      break;
    case "redRose":
      if (gardenPlant.health == 0) return <DeadRedRose />
      else if (gardenPlant.petals == 1) return <RedRose0 />
      else if (gardenPlant.petals == 2) return <RedRose1 />
      else if (gardenPlant.petals == 3) return <RedRose2 />
      else if (gardenPlant.petals == 4) return <RedRose3 />
      else if (gardenPlant.petals == 5) return <RedRose4 />
      break
    default:
      break
  }
}

export default class ImageFlowerInventory extends React.Component {
  render() {
    return (
      <View>
        {getImage(this.props.plant)}
        {/*
        {plantedFlower(this.props.plant) ? 
          {
            0:  <View style={styles.image}>
                  <Heart0 />
                </View>,
            1:  <View style={styles.image}>
                  <Heart1 />
                </View>,
            2:  <View style={styles.image}>
                  <Heart2 />
                </View>,
            3:  <View style={styles.image}>
                  <Heart3 />
                </View>
          }[this.props.plant.health]
          :
          <View></View>
        }
        */}
      </View>
    )
  }
}

const styles = StyleSheet.create({
})