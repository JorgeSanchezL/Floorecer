import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, View, SafeAreaView, Text, Image } from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MapFilters from '../components/MapFilters';
import * as Location from 'expo-location';
import shop from '../../assets/map-icons/shop.png'
import { getAllBusinesses } from '../../utils/actions';

import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import * as Animatable from 'react-native-animatable';



export const Map = () => {

  const [data, setData] = useState(null);
  

  const getMapMarkers = async (category) => { 
    setData(await getAllBusinesses(category))
    
  }

  useEffect(() => {getMapMarkers(null)}, [])

  const [isInfoVisible,setInfoVisible] = useState(false)
  const [business,setBusiness] = useState(null)
  console.log(business)
  return (
    <SafeAreaView
          style={{flex: 1}}
      >
        <FocusAwareStatusBar
              barStyle='dark-content'
              backgroundColor={'#fff'}
          />
    <MapFilters
      setData={setData}
    >
    </MapFilters>
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
        {data != null && data.map((element, index) => {
            return <View key={`marker${index}`}>
              <Marker
                  coordinate={{latitude: element.location.latitude, longitude: element.location.longitude}}
                  title={element.title}
                  description={element.description}
                  onPress={()=> {setBusiness(element)}}
              >
                <Image
                  source={shop}
                  style={{ width: 40, height: 40 }}
                />
              </Marker>
            </View>
        })}
      </MapView>
      {business && <BusinessDetailsCard  business={business}/>}

    </View>
    </SafeAreaView>
  );
}



const BusinessDetailsCard = (props) => {
  const snapPoints = useMemo(()=> ['30%','80%'],[])
  return (
    <BottomSheet snapPoints={[200,500]}>
      <Animatable.View
        style={styles.header}
        animation="fadeInUp"
        delay={500}
        easing="ease-in-out"
        duration={400}
      >
        <Text style={styles.title}>{props.business.name}</Text>
        <Text style={styles.title}>{props.business.category || "unknown category"}</Text>
      </Animatable.View>

    </BottomSheet>
  )
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
  header: {
    paddingVertical: 8,
    paddingHorizontal: 8,
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
