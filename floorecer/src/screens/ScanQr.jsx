import React, { useContext, useEffect,useState } from 'react';
import { SafeAreaView, View, Alert, StyleSheet, Text, StatusBar ,TouchableOpacity,Button,Modal} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { TextInput } from 'react-native-gesture-handler';
import { BarCodeScanner } from 'expo-barcode-scanner';
import DropDownPicker from 'react-native-dropdown-picker';
import * as SecureStore from 'expo-secure-store';
import {BACKEND_URL} from '@env';
import AuthContext from '../context/AuthContext';
import { setItemAsync, getItemAsync,
  deleteItemAsync } from 'expo-secure-store';

var datos = null;



const ScanQr =   () =>  {


    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [importe, onChangeImporte] = useState(null);
 
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
         console.log("is it donee?")
         let dropDownData = [];
         var count = Object.keys(body).length;
         console.log(count)
      for (var i = 0; i < count; i++) {
        console.log(body[i].name)
        dropDownData.push({ value: body[i].name, label: body[i].name }); 
    }

    setItems(dropDownData);
    console.log("haha")
        }
    
     catch (err) {
    
      console.log(err)
    
     }}
     useEffect(() => {getbusiness()}, [])
    useEffect(() => {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      };
  
      getBarCodeScannerPermissions();
    }, []);
  
    const handleBarCodeScanned = async ({ type, data }) => {
      setScanned(true);

      let importeInt = parseInt(importe);
      let wonpoints = 0;
      switch(true) {
         case importeInt <10 :
          wonpoints = 1;
          break;
          case importeInt <20 :
            wonpoints = 1.5;
            break
          case importeInt <40 :
            wonpoints = 4;
            break
          case importeInt <90 :
            wonpoints = 6;
            break
          case importeInt >= 90:
            wonpoints = 10;
            break;
     }
      
      try {
        console.log(`${BACKEND_URL}/business/upgradePoints`)
        var response = await fetch(`${BACKEND_URL}/business/upgradePoints`, {
          method: 'POST',
          body: JSON.stringify({
           uid : data,
           wonpoints : wonpoints,
           shopName : value, 

        }),
            headers: {
              "Content-type": "application/json; charset=UTF-8"
            },
        }
         );
         
    }
    
        catch(error) {
            console.log(error)
        }
        if(response.status = 200 ) {
          console.log("fuckof")
          Alert.alert('Alerta',
          "se ha guardado la compra de forma correcta !")
          setModalVisible(false)
         

        }
      console.log(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
        <SafeAreaView
        style={{flex: 1}}
    >
         <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
           
          </View>
        </View>
      </Modal>
<View style = {styles.greenBox} >
<DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      onChangeValue = {() => console.log(value)}
    />
 <Text  style = {styles.textData}> Importe  </Text>
 <TextInput
        style={styles.input}
        placeholder="Importe"
        keyboardType="numeric"
        onChangeText=  {onChangeImporte}
        value ={importe}
        
        
      />
       <Text  style = {styles.Currency}> €</Text>  

    <CustomButton text = 'Escanear' onPress={ ()=> {
    setModalVisible(true)
    setScanned(false)
    }

}
    
    /> 
      
</View>
</SafeAreaView>
      )
    
    
    };

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        greenBox: {
          backgroundColor: '#D7E8DE',
                  height: 200,
                  marginTop : '60%',
                  marginLeft : '5%',
                  marginRight : '5%',
                  borderRadius: 20
        },
        textData: {
            fontWeight: 'bold',
            color: '#353535',
            textAlign : 'center',
            marginTop : '5%',
            marginLeft : '5%'
        },
        Currency: {
            fontWeight: 'bold',
            fontSize : 40,
            color: '#353535',
            marginLeft : '80%',
            marginTop : '-26%'
        },
        input: {
            backgroundColor : 'white',
            height: 40,
            width : 200,
            margin: 40,
            borderWidth: 1,
            padding: 1,
            alignSelf : 'center',
            textAlign : 'center'
          },
          centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 22
          },
          modalView: {
             margin: 60,
            backgroundColor: "white",
            borderRadius: 20,
            padding: 200,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 10,
            elevation: 15
          },
          button: {
            borderRadius: 10,
            padding: 10,
          },
         
          buttonClose: {
            backgroundColor: "#2196F3",
            marginTop : '10%'
          },
          textStyle: {
            color: "white",
            fontWeight: "bold",
            textAlign: "center"
          }
          
    });
    export default ScanQr;