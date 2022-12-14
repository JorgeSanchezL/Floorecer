import React, { useContext, useEffect,useState } from 'react';
import { SafeAreaView, View, Alert, StyleSheet, Text, StatusBar ,TouchableOpacity,Image,Modal} from 'react-native';
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
import IconCamera from '../../assets/image/IconCamera.png';
import { useFonts } from 'expo-font';


var datos = null;



const ScanQr = ()=> {
    const [fontLoaded] = useFonts({
      PoppinsMedium: require("../../assets/fonts/Poppins-Medium.ttf"),
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf"),
      MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
    })
    
    

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([]);
    const [importe, onChangeImporte] = useState(null);
    const getbusiness= async () =>{ 
      try {
        auth0 = JSON.parse(await getItemAsync('auth0'));
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
         let dropDownData = [];
         var count = Object.keys(body).length;
      for (var i = 0; i < count; i++) {
        dropDownData.push({ value: body[i].name, label: body[i].name }); 
    }

    setItems(dropDownData);
        }
    
     catch (err) {
    
      Alert.alert(err)
    
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
          Alert.alert(error)
        }
        if(response.status = 200 ) {
          Alert.alert('Alerta',
          "!Se ha guardado la compra correctamente!")
          setModalVisible(false)
         

        }
    };
  
    if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if(!fontLoaded) { return null; }
    return (
        <SafeAreaView
        style={{flex: 1,backgroundColor:'white'}}
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
<View style = {styles.box} >
<DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      style = {styles.dropDown}
      placeholder = 'Selecciona un comercio'
      placeholderStyle ={{fontFamily:'PoppinsRegular'}}
      listItemLabelStyle  ={{fontFamily:'PoppinsRegular'}}
      dropDownContainerStyle = {styles.dropDownContainer}
    />
 <Text  style = {styles.textData}> Importe  </Text>
 <TextInput
        style={styles.input}
        placeholder="Importe"
        placeholderTextColor='#959494'
        keyboardType="numeric"
        onChangeText=  {onChangeImporte}
        value ={importe}
        placeholderStyle = {{fontFamily:'PoppinsRegular'}}
        
      />
       <Text  style = {styles.Currency}> €</Text>  

    <View style={{marginTop:100, alignItems:'center'}}>
      <TouchableOpacity  onPress={()=> {
          setModalVisible(true)
          setScanned(false)
          } }>
          
      <Image style={styles} source={IconCamera} />
    </TouchableOpacity >
    </View>
    

    
   
      
</View>
</SafeAreaView>
      )
    
    
    };

      const styles = StyleSheet.create({
        container: {
          flex: 1,
          marginTop: StatusBar.currentHeight || 0,
        },
        box: {
          backgroundColor: 'white',
                  height: 200,
                  marginTop : '60%',
                  marginLeft : '5%',
                  marginRight : '5%',
                  borderRadius: 20,
                  elevation:3,
        },
        textData: {
            //fontWeight: 'bold',
            fontSize:23,
            color: '#353535',
            textAlign : 'center',
            marginTop : '5%',
            marginBottom:-15,
            "fontFamily": "PoppinsRegular",
        },
        Currency: {
            //fontWeight: 'bold',
            fontSize : 40,
            color: '#353535',
            marginLeft : '80%',
            marginTop : '-24%',
            fontFamily:'PoppinsRegular'
        },
        input: {
            backgroundColor : 'rgb(229,226,243)',
            height: 40,
            width : 200,
            margin: 40,
            borderRadius:10,
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
          },
          dropDown:{
            backgroundColor: 'rgb(229,226,243)',
            borderRadius:10,
            borderWidth:0,
            marginTop:10,
            width:'80%',
            alignSelf:'center',
           
          },
          dropDownContainer:{
            backgroundColor:'rgb(229,226,243)',
            borderWidth:0, 
            width:'80%',
            alignSelf:'center', 
            zIndex:25,
            elevation:2
          }
          
    });
    export default ScanQr;