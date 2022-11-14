import React, { useContext, useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar ,TouchableOpacity,Alert} from 'react-native';
var datos = null;
import { useNavigation } from '@react-navigation/native';
import { useIsFocused } from "@react-navigation/core";
import { BACKEND_URL } from '@env';



const MyShops = () => {
  const [data, setData] = useState([]);
  const [actualPlan,setActualPlan] = useState(null);
  const navigation=useNavigation();
  const isFocused = useIsFocused();


  const getActualPlan = async()=>{
    try {
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
         //console.log(body)
         setActualPlan(body);
        }
        
     catch (err) {
    
      console.log(err)
        return null;
     }
  
  }

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
        
          console.log(err)
        
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
    <View >
    <TouchableOpacity onPress={()=>{onDeletePress(shop)}} style={styles.appButtonContainer3}>
        <Text style={styles.appButtonText}>Eliminar</Text>
                </TouchableOpacity>
    </View>
</View>
);




  const renderItem = ({ item }) => (
    <Item shop={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style ={{marginBottom:-1, marginTop:15}}>
        <Text style = {{fontSize:20}}>{actualPlan == 1 ? `Comercios: ${data.length}/5` : `Comercios: ${data.length}`}</Text>
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
  fontSize: 15,
  color: "#fff",
  fontWeight: "bold",
  alignSelf: "center",
}

});



export default MyShops;