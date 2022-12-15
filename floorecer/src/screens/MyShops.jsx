import React, { useContext, useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar ,TouchableOpacity,Alert,LogBox} from 'react-native';
var datos = null;
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/core";
import { getItemAsync } from 'expo-secure-store'; 
import { BACKEND_URL } from '@env';
import { useFonts } from 'expo-font';
import Animated, { runOnJS, set, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
LogBox.ignoreAllLogs();

const MyShops = () => {
  const [fontLoaded] = useFonts({
    PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
    PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
    MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
  })
  const [data, setData] = useState([]);
  const [actualPlan,setActualPlan] = useState(null);
  const navigation=useNavigation();
  const isFocused = useIsFocused();

  const getActualPlan = async()=>{
    try {
        const auth0 = JSON.parse(await getItemAsync('auth0'));
        const response = await fetch(`${BACKEND_URL}/users/getActualPlan`, {
          method: 'POST',
          body: JSON.stringify({
           uuid : auth0.uid//change owner to check
        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },     
        }   
        );
         const body = await response.json();
         setActualPlan(body);
        }
        
     catch (err) {
      Alert.alert(err)
      return null;
     }
  
  }

const getbusiness= async () =>{ 
  try {
   const auth0 = JSON.parse(await getItemAsync('auth0'));

    const response = await fetch(`${BACKEND_URL}/business/getbusinesses`, {
      method: 'POST',
      body: JSON.stringify({
       owner : auth0.uid
    }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },     
    }   
    );
     const body = await response.json();
     setData(body)
    }
    

 catch (err) {

  Alert.alert(err)

 }}

useEffect(() => { if(isFocused){getbusiness(); getActualPlan()}}, [isFocused]) 

function onPressButton (shop) {

  navigation.navigate("configureBusiness",shop)
}

async function onDeletePress(shop){
  Alert.alert(
    "¿Estás seguro?",
    "¿Quieres borrar este comercio definitivamente?",
    [
      // The "Yes" button
      {
        text: "Si",
        onPress: async() => {
          
          try {
            const response = await fetch(`${BACKEND_URL}/business/deleteBusiness`, { 
              method: 'POST',
              body: JSON.stringify({
               shopUid : shop.uid,
               ownerUid: shop.owner
            }),
                headers: {
                  "Content-type": "application/json; charset=UTF-8"
                },     
            }   
            );
            
             
          }
          
          catch (err) {
        
            Alert.alert(err)
        
         }

          getbusiness();

        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: "No",
      },]);
  
}
async function onPressButtonPromotion (shop) {
  
    try {
      const response = await fetch(`${BACKEND_URL}/business/promoteBusiness`, { 
        method: 'POST',
        body: JSON.stringify({
         uid : shop.uid
      }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },     
      }   
      );
       const body = await response.json();
     
      }
  
   catch (err) {
  
    Alert.alert(err)
  
   }


}
const changeStatus = async (active, shop) => {
  try {
    const response = await fetch(`${BACKEND_URL}/business/changeStatus`, { 
      method: 'POST',
      body: JSON.stringify({
       active: active,
       uid : shop.uid
    }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        },     
    }   
    );
     const body = await response.json();
   
    }

 catch (err) {

  Alert.alert(err)

 }
}
const Item = ({ shop }) => {

  const translateX = useSharedValue(shop.active ? 0 : 166)
  const [active, setActive] = useState(shop.active)

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      if(active && translateX.value < 0){
        translateX.value= 0
      }
      if(!active && translateX.value > 166){
        translateX.value= 166
      }
    },
    onEnd: (event) => {
      if(active){
        if(translateX.value > 207){
          translateX.value = 166
          runOnJS(setActive)(false)
          runOnJS(changeStatus)(false, shop)             
        } else {
          translateX.value = 0
        }
      }else{
        if(translateX.value < 45){
          translateX.value = 0
          runOnJS(setActive)(true)
          runOnJS(changeStatus)(true, shop)             
        } else {
          translateX.value = 166
        }
      }
    }
  })

  const rStyle = useAnimatedStyle (() => {
    return {
      transform: [
        {
          translateX: translateX.value
        }
      ]
    }
  })
  return (
  <PanGestureHandler onGestureEvent={panGestureEvent}>
    <Animated.View style={[styles.greenBox, rStyle, active? styles.active: styles.notActive]}>  
    
      <View style = {{flex:0, flexDirection:'column'}}>
          <Text style={styles.cardTitle}>
            {shop.name}
          </Text>
          <Text style={styles.textData }>
              {shop.address}
          </Text>
          <Text style={styles.textData }>
              {shop.description}
          </Text>
      </View>
      <View style = {{flex:0, flexDirection:'row', justifyContent:"space-between", marginTop: '2%', marginBottom:'5%'}}>
        {active === true || active === 'true' ? 
        <TouchableOpacity 
          onPress={()=>{onPressButtonPromotion(shop)}} 
          style={styles.appButtonContainer1}
          >
            <Text style={styles.appButtonText}>Promocionar</Text>
        </TouchableOpacity> : null}
        <TouchableOpacity onPress={()=>{onPressButton(shop)}} style={styles.appButtonContainer}>
            <Text style={styles.appButtonText}>Editar</Text>
        </TouchableOpacity>
      </View>
    </Animated.View >
  </PanGestureHandler>
  );
};

  const renderItem = ({ item }) => (
    <Item shop={item} />
  );
  if(!fontLoaded) { return null; }
  return (
    <SafeAreaView style={styles.container}>
      <View style ={{marginTop:'10%'}}>
        <Text style = {{fontSize:24, fontFamily:'MuseoModernoBold' ,alignSelf:'center'}}>
            Gestión de Comercios
        </Text>
      </View>
      <View style ={{marginBottom:-85, marginTop:60, alignItems:'center'}}>
        <Text style = {{fontSize:20, fontStyle:'italic'}}>{data.length == 0 ? `No tiene comercios` : ``}</Text>
      </View>
      <View style={{flex:1}}>
        <FlatList
        data={data}
        renderItem={renderItem}
       // keyExtractor={item => item.name}
      />
      </View>
      
      <View style={{}}>
        <TouchableOpacity onPress={async()=>{navigation.navigate('businessPlans', {
                        ActualPlan: actualPlan,
                        numberBusiness: data.length
                    })}} 
                    style={styles.appButtonContainer2}>
        <Text style={styles.appButtonText}>Gestionar mi suscripción</Text>
                </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
  greenBox: {
            marginTop : '10%',
            marginLeft : '5%',
            marginRight : '5%',
            borderRadius: 20
  },
  active:{
    backgroundColor: '#82DAB6',
  },
  notActive: {
    backgroundColor: '#144b50',
  },
  cardTitle:{
    fontSize:24,
    fontFamily:'MuseoModernoBold',
    textAlign:'left',
    marginTop: '10%',
    marginLeft: '10%',
    marginRight: '10%',
  },
  title: {
    fontSize: 32,
  },
  textData: {
    fontFamily:'PoppinsMedium',
    fontSize: 14,
    textAlign : 'left',
    marginLeft : '10%',
    marginRight : '10%',
    marginBottom: '3%'

},
       red : {
        fontWeight: 'bold',
        color: 'red',
        marginLeft : '75%',
        marginTop : '3%',
        alignItems : 'center',
        

       },
       green : {
        fontWeight: 'bold',
        color: 'green',
        marginLeft : '75%',
        marginTop : '3%',
        alignItems : 'center',
       }
  ,
appButtonContainer: {
  borderRadius: 20,
  height: 40,
  width: 120,
  marginRight: '10%',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255, 0.6)',
  marginLeft : '10%',

},
appButtonContainer1: {
  borderRadius: 20,
  height : 40,
  width : 120,
  marginLeft: '10%',
  justifyContent: 'center',
  backgroundColor: 'rgba(255,255,255, 0.6)'
},
appButtonContainer3: {
  backgroundColor: "#009688",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 5,
  height : 30,
  width : 100,
  marginTop : '-30%',
  marginLeft : '65%',
  

},
appButtonContainer2: {
  backgroundColor: "#009688",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 5,
  height : 30,
  width : 200,
  marginTop : '3%',
  marginLeft : '4%',
  marginBottom: '4%'
  

},
appButtonText: {
  alignSelf: "center",
  color: '#000',
  fontFamily: 'MuseoModernoBold',
  fontSize: 14,
}

});



export default MyShops;