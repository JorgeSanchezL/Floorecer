import React, { Fragment, useEffect, useState ,useRef} from 'react';
import { StyleSheet, View, SafeAreaView, Image, Button} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE,animateToRegion} from 'react-native-maps'
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import MapFilters from '../components/MapFilters';
import * as Location from 'expo-location';
import shop from '../../assets/map-icons/shop.png'
import promotedshop from '../../assets/promoted.png'
import { getAllBusinesses } from '../../utils/actions';
import { useNavigation } from '@react-navigation/native';

import BusinessDetailsCard from '../components/BusinessDetailsCard';
import List from "../components/List";
import SearchBar from "../components/SearchBar";


export const Map = () => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
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
  const animate = (coordin) => {
    setSearchPhrase("")
    this.mapView.animateToRegion(coordin, 2000);
}
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
        ref={ref => (this.mapView = ref)}
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
   <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />
 {  (

<List
  searchPhrase={searchPhrase}
  data={data}
  setClicked={setClicked}
  animate = {animate}
/>

)}

    
      
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
    flex:1
  },
  map: {
    width: '100%',
    height: '100%',
    zIndex: 0,
    elevation: 0,
    position: 'absolute'
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
  },
  search : {
    backgroundColor: 'rgba(52, 52, 52, 0.8)'
    
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
