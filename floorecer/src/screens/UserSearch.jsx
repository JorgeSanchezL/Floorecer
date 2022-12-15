import React,{useEffect,useState} from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image  ,FlatList,TextInput,ActivityIndicator,ImageBackground,Dimensions,Keyboard} from "react-native";
import { useNavigation } from "@react-navigation/native";
import user from '../../assets/image/user.png';
import { Ionicons } from '@expo/vector-icons';
import buscadorUs1 from '../../assets/buscarUs1.png';
import buscadorUs2 from '../../assets/buscarUs2.png';
import { BACKEND_URL } from '@env';
import { useFonts } from 'expo-font';
const { width, height } = Dimensions.get('screen');
const UserSearch = () => {
    const navigation=useNavigation();
    const [filteredData,setFilteredData]=useState([]);
    const [text,setText]=useState('');
    const[noUser,setNoUser]=useState(true)
    let backImage=buscadorUs2
    const [fontsLoaded] = useFonts({
      MuseoModernoRegular: require("../../assets/fonts/MuseoModerno-Regular.ttf"),
      MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
  })
    
    if (!fontsLoaded) {
      return null;
    }
    

   if(noUser){
    backImage=buscadorUs1
   }else{
    backImage=buscadorUs2
   }
    const pressSearch=()=>{
      setNoUser(false)
      fetchData();
    }
    const fetchData = async () =>{
        try{
            const response=await fetch(`${BACKEND_URL}/users/search/${text}`);
            let body=await response.json();
            
            if(!Array.isArray(body)){
                body=[];
                setNoUser(true)
            }
            setFilteredData(body);
        }catch(error){
          Alert.alert(error)

        }
    }

    
      const renderSeparator = () => {
        return (
          <View
            style={{
              height: 1,
              width: '86%',
              backgroundColor: '#CED0CE',
              marginLeft: '5%'
            }}
          />
        )
      }
    
      
      const renderEmpty=()=>{
        return(
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
 
          <Text style={{ marginTop:30,fontSize: 24,color:'white',fontFamily:'MuseoModernoBold' }}>
            No se han 
          </Text>
          <Text style={{ marginTop:10,fontSize: 24,color:'white',fontFamily:'MuseoModernoBold' }}>
            encontrado usuarios
          </Text>
   
        </View>
        )
      }
    return(
        
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
          }}>
            <ImageBackground source={backImage} resizeMode="cover" style={styles.background} >
            <View
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            padding: 10,
            marginLeft:15,
            marginRight:20,
            height: 65,
            borderColor: '#333',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 25,
            flexDirection:'row',
            marginTop: 40
          }}
          >
            
          <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={setText}
          status='info'
          placeholder=' Búsqueda'
          style={{
            borderRadius: 25,
            width: 300,
            height: 50,
            marginLeft:10,
            borderColor: '#333',
            backgroundColor: 'transparent',
            shadowOffset: {
              "width": 0,
              "height": 4
            },
          }}
          textStyle={{ color: '#000' }}
          clearButtonMode='always'
          
          value={text}
        />
        <TouchableOpacity 
                style = {{
                    justifyContent: 'center',
                    marginLeft:5,
                    height: 30,
                    flexDirection: 'row',
                }}
                onPress = {() => {
                  setNoUser(false)
                  pressSearch()
                }}>
                
                <Ionicons
              style={{
                height: 50,}}
              name='search-outline'
              size={25}
              color={'#085D0E'}
            />
             
            </TouchableOpacity>

        </View>
           <FlatList
            
            data={filteredData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => navigation.navigate('publicProfile', {
                name: item.username
            })}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    padding: 10,
                    marginLeft:15,
                    marginRight:20,
                    borderColor: '#333',
                    borderRadius:25,
                    marginTop:10
                  }}>
                  <Image
                    source={user}
                    style={{width:50,
                      height:50,
                      borderRadius:25,}}
                  />
                  <Text
                    category='s1'
                    style={{
                      color: '#000',fontSize: 17,marginLeft:10,fontFamily:'MuseoModernoBold'
                    }}>{`${item.username}`}</Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={renderSeparator}
            ListEmptyComponent={renderEmpty}
            
          />
          </ImageBackground>
        </View>
    );
}


const styles = StyleSheet.create({
    itemContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginLeft:10,
        marginTop:10,
    },
    text: {
        fontSize:20,
        textAlign:'left',
        marginLeft:10,
        fontWeight:'bold',
        marginTop:10,

    },
    background:{
      height:height,
      width:width,
      position:'absolute',
      top:0,
      bottom:0,
      left:0,
      right:0,
      zIndex:-1
    },
    image:{
        width:50,
        height:50,
        borderRadius:25,
    },
    textName:{
        fontSize:17,
        marginLeft:10,
        fontWeight:'600',
    },
    textEmail:{
        fontSize:14,
        marginLeft:10,
        color:'grey'
    }
  });

export default UserSearch;
