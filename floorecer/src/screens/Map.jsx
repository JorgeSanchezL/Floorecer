import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import * as Location from 'expo-location';
import shop from '../../assets/map-icons/shop.png'

const Map = () => {

  const getAllMarkers = async () => { 
    try {
      const response = await fetch('localhost:5000/poi/all');
      const body = await response.json();
      
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      setData(body)
    } catch (err) {
      console.log(err)
    }
  }

  const [data, setData] = useState([])
  useEffect(() => {getAllMarkers()}, [])
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        showsPointsOfInterest={false}
        customMapStyle={mapStyle}
        onMapReady={() => askLocationPermissions()}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true} 
        showsMyLocationButton={true}
      >
        {data.map((element, _) => {
            return <Marker
                key={element.id_poi}
                coordinate={{latitude: element.location.latitude, longitude: element.location.longitude}}
                title={element.title}
                description={element.description}
            >
              <Image
                source={shop}
                style={{ width: 40, height: 40 }}
              />
            </Marker>
        })}
      </MapView>
    </View>
  );
}

const askLocationPermissions = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    console.log('Permission to access location was denied');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7FFE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  }
});

const mapStyle = [
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.medical",
    "stylers": [
      {
        "visibility": "on"
  
      }
    ]
  },
  {
    "featureType": "poi.park",
    "stylers": [
      {
        "visibility": "on"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  }
]

export default Map;
