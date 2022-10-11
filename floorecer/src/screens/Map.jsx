import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import * as Location from 'expo-location';

const Map = () => {
  const markerList = getAllMarkers() 
  return (
    <View style={styles.container}>
      <MapView 
        style={styles.map} 
        showsPointsOfInterest={false}
        customMapStyle={mapStyle}
        onMapReady={() => askLocationPermissions()}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true} showsMyLocationButton
      >
        {markerList.map((element, _) => {
            return <Marker
                key={element.key}
                coordinate={{latitude: element.latitude, longitude: element.longitude}}
                title={element.title}
                description={element.description}
            />
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

const getAllMarkers = () => { //TBD - will ask the backend for every marker in the database
  return [
    {
        key: "0",
        title: "Pueblo",
        description: "Mi pueblo",
        latitude: 39.837718,
        longitude: -0.824200
    }
    ]
}

export default Map;
