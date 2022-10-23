import React, { useEffect,useState } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar ,TouchableOpacity} from 'react-native';
var datos = null;

const MyShops = () => {
  const [data, setData] = useState(null);

const getbusiness= async () =>{ 
  try {
    const response = await fetch("http://192.168.1.143:5000/business/getbusiness", {
      method: 'POST',
      body: JSON.stringify({
       owner : 'Uh5buardYaXoPOPMYiP3Sa5lgJo1'
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

  console.log(err)

 }}
 useEffect(() => {getbusiness()}, [])
function onPressButton (shop) {

 console.log("the title of the button is " + shop.name);

}
const Item = ({ shop }) => (
    <View style={styles.greenBox}>
      
    <View >
    <Text style={styles.textData}>
    {shop.name}  {"\n"}
            
        </Text>
    </View>

    <View >
        <Text style={styles.textData}>
            {shop.nif}
        </Text>
    </View>

    <View >
        <Text style={styles.textData }>
            {shop.direction}
        </Text>
    </View>

    <View >
    <TouchableOpacity onPress={()=>{onPressButton(shop)}} style={styles.appButtonContainer}>
        <Text style={styles.appButtonText}>Editar</Text>
                </TouchableOpacity>
    </View>
</View>
);




  const renderItem = ({ item }) => (
    <Item shop={item} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
       // keyExtractor={item => item.name}
      />
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
    marginTop : '10%',
    marginLeft : '5%'
},

appButtonContainer: {
  backgroundColor: "#009688",
  borderRadius: 10,
  paddingVertical: 5,
  paddingHorizontal: 5,
  height : 30,
  width : 100,
  marginTop : '-10%',
  marginLeft : '65%',
  

},
appButtonText: {
  fontSize: 15,
  color: "#fff",
  fontWeight: "bold",
  alignSelf: "center",
}

});



export default MyShops;