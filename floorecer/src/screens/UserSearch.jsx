import React,{useEffect,useState} from "react";
import { View,Text,StyleSheet,TouchableOpacity,Image  ,FlatList,TextInput,ActivityIndicator} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import user from '../../assets/image/user.png';

const UserSearch = () => {
    const navigation=useNavigation();
    const [filteredData,setFilteredData]=useState([]);
    const [text,setText]=useState('');
    
    useEffect(() =>{
        fetchData();
    },[text]);

    const fetchData = async ()=>{
        try{
            const response=await fetch(`http://192.168.1.161:5000/users/search/${text}`);
            let body=await response.json();
            
            if(!Array.isArray(body)){
                body=[body];
            }
            setFilteredData(body);
            console.log(body)
        }catch(error){
            console.error(error);

        }
    }
    const renderHeader = () => (
        <View
          style={{
            backgroundColor: '#fff',
            padding: 10,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <TextInput
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={setText}
          status='info'
          placeholder='Buscar'
          style={{
            borderRadius: 25,
            borderColor: '#333',
            backgroundColor: '#fff'
          }}
          textStyle={{ color: '#000' }}
          clearButtonMode='always'
          value={text}
        />
        </View>
      )
    
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
    
      const renderFooter = () => {
        
        return (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: '#CED0CE'
            }}>
            <ActivityIndicator animating size='large' />
          </View>
        )
      }
      const renderEmpty=()=>{
        return(
            renderHeader
        )
      }
    return(
        
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingVertical: 20,
            marginTop: 40
          }}>
           <FlatList
            data={filteredData}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => alert('Item pressed!')}>
                <View
                  style={{
                    flexDirection: 'row',
                    padding: 16,
                    alignItems: 'center'
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
                      color: '#000'
                    }}>{`${item.username}`}</Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={renderSeparator}
            ListHeaderComponent={renderHeader}
            ListFooterComponent={renderFooter}
            ListEmptyComponent={renderEmpty}
            
          />
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