import React, { useEffect, useState } from 'react';
import { StyleSheet, View, SafeAreaView, Image} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MapFilters from '../components/MapFilters';
import * as Location from 'expo-location';
import shop from '../../assets/map-icons/shop.png'
import promotedshop from '../../assets/promoted.png'
import { getAllBusinesses } from '../../utils/actions';
import { useNavigation } from '@react-navigation/native';

import BusinessDetailsCard from '../components/BusinessDetailsCard';



export const Map = () => {

  const [data, setData] = useState(null);
  const navigation=useNavigation();
  const navigate = (screen) => {
    navigation.navigate(screen)
  }

  const getMapMarkers = async (category) => { 
    setData(await getAllBusinesses(category))
    
  }

  useEffect(() => {getMapMarkers(null)}, [])

  const [business,setBusiness] = useState(null)
  return (
    <SafeAreaView
          style={{flex: 1}}
      >
        <FocusAwareStatusBar
              barStyle='dark-content'
              backgroundColor={'#fff'}
          />
    
    <View style={styles.container}>
      <MapFilters
        setData={setData}
      />
      <MapView 
        style={styles.map} 
        showsPointsOfInterest={false}
        customMapStyle={mapStyle}
        onMapReady={() => askLocationPermissions()}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true} 
        showsMyLocationButton={true}
      >
        {data != null && data.map((element, index) => {
            return <View key={`marker${index}`}>
              <Marker
                  coordinate={{latitude: element.location.latitude, longitude: element.location.longitude}}
                  title={element.title}
                  description={element.description}
                  onPress={()=> {setBusiness(element)}}
              >
                { element.promoted == true ?     < Image 
                  source={promotedshop}
                  style={{ width: 40, height: 40 }}
                />  :    
                < Image 
                  source={shop}
                  style={{ width: 40, height: 40 }}
                />
                
                }
              </Marker>
            </View>
        })}
        
      </MapView>
      {business && <BusinessDetailsCard  business={business} setBusiness={setBusiness}/>}

    </View>
    </SafeAreaView>
  );
}



const askLocationPermissions = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission to access location was denied');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D7FFE7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoContainer: {
    zIndex:1000,
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 0
  },
  appButtonContainer: {
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 5,
    paddingHorizontal: 5,
    height : 30,
    width : 100,
    marginTop : '-5%',
    marginLeft : '65%',
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
