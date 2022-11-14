import React, { useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList,
  StyleSheet, Text, TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BACKEND_URL } from '@env';

const getActualPlan = async() => {
  try {
    console.log("hh" + BACKEND_URL)
      const response = await fetch(`${BACKEND_URL}/users/getActualPlan`, {
        method: 'POST',
        body: JSON.stringify({
         uuid : '1JhCe6jIwlheYfXT1of8gJI8q693'//change owner to check
      }),
          headers: {
            "Content-type": "application/json; charset=UTF-8"
          },     
      }   
      );
       const body = await response.json();
       //console.log(body)
       return body;
      }
  
   catch (err) {
  
    console.log(err)
      return null;
   }

}

const MyShops = () => {
  const [data, setData] = useState(null);
  const navigation=useNavigation();

 
const getbusiness= async () =>{ 
  try {
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
     console.log("is it done?")
     setData(body)
    }

 catch (err) {

  console.log(err)

 }}
 useEffect(() => {getbusiness()}, [])
function onPressButton (shop) {

  navigation.navigate("configureBusiness",shop)
}

async function onPressButtonPromotion (shop) {

  console.log(shop.uid)
  
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
  
    console.log(err)
  
   }


}
const Item = ({ shop }) => (
    <View style={styles.greenBox}>  
         {shop.active == true? <Text style = {styles.green}> Activo </Text>: <Text style = {styles.red}> Inactivo </Text> }
      <View >
    <Text style={styles.textData}>
       {shop.name} {"\n"}
  
             </Text>
    </View>
   
    <View >
        <Text style={styles.textData}>
            {shop.NIF}
        </Text>
    </View>

    <View >
        <Text style={styles.textData }>
            {shop.Address}
        </Text>
    </View>

    <View >
    <TouchableOpacity onPress={()=>{onPressButton(shop)}} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Editar</Text>
                </TouchableOpacity>
    </View>
    
    <View >
    {shop.active == true? 
     <TouchableOpacity onPress={()=>{onPressButtonPromotion(shop)}} style={styles.appButtonContainer1}>
        <Text style={styles.appButtonText}>Promocionar</Text>
                </TouchableOpacity> : null}
    </View>
</View>
);




  const renderItem = ({ item }) => (
    <Item shop={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex:1}}>
        <FlatList
        data={data}
        renderItem={renderItem}
       // keyExtractor={item => item.name}
      />
      </View>
      
      <View style={{}}>
        <TouchableOpacity onPress={async()=>{navigation.navigate('businessPlans', {
                        ActualPlan: await getActualPlan()
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
    backgroundColor: '#D7E8DE',
            height: 200,
            marginTop : '10%',
            marginLeft : '5%',
            marginRight : '5%',
            borderRadius: 20
  },
  title: {
    fontSize: 32,
  },
  textData: {
    fontWeight: 'bold',
    color: '#353535',
    textAlign : 'left',
    marginTop : '5%',
    marginLeft : '5%'
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
  backgroundColor: "#009688",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 5,
  height : 30,
  width : 100,
  marginTop : '-5%',
  marginLeft : '65%',
  

},
appButtonContainer1: {
  backgroundColor: "#009688",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 5,
  height : 30,
  width : 100,
  marginTop : '-20%',
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
  fontSize: 15,
  color: "#fff",
  fontWeight: "bold",
  alignSelf: "center",
}

});



export default MyShops;