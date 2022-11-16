import React ,{useEffect,useState} from 'react';
import { StyleSheet, SafeAreaView, Dimensions,
  ScrollView, View, Image, Text, TouchableOpacity,
  Modal} from 'react-native';
import { getItemAsync } from 'expo-secure-store';
import { Ionicons } from '@expo/vector-icons';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import SvgQRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';


import user from '../../assets/image/user.png';
import qrCode from '../../assets/image/qrCode.png';

import { BACKEND_URL } from '@env';

import CustomButton from '../components/CustomButton';
import { TextInput } from 'react-native-gesture-handler';

export const width = Dimensions.get('window').width;



const UserProfile = () => {
  const [editable, setEditable] = useState(false);
  const [text, setText] = useState("Editar");
  const [profile, setProfile] = useState(null);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [mail, setMail] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [uid, setUid] = useState(null);

  const navigation=useNavigation();
  const openGarden = () => {
    navigation.navigate('garden')
  }

  const getProfile = async () => {
      try {
        const auth0 = JSON.parse(await getItemAsync('auth0'));
        const api_call = await fetch(`${BACKEND_URL}/users/${auth0.uid}`);
        const response = await api_call.json();
        setProfile(response);
        console.log(response);
      } catch(e) { console.error(e); }
      
  }
  const getUid = async () => {
    try {
      auth0 = JSON.parse(await getItemAsync('auth0'));
      setUid(auth0.uid);
    } catch(e) { console.error(e); }
  }
  const getProfile2 = async () => {
        try {
          const response = await fetch(`${BACKEND_URL}/user-authe/userProfile`, {
            method: 'POST',
            body: JSON.stringify({
              uid:uid,
              newEmail: mail,
              newName: name,
              newPassword: password,
              newPhone : phone,
              oldEmail:profile.email,
              oldPassword:profile.password
  
          }),
              headers: {
                "Content-type": "application/json; charset=UTF-8"
              },
            
          });
            
        } catch (err) {
          console.log(err)
        }
      }

    console.log('hola',uid);

  useEffect(() => {
      getProfile();
      getUid();
  }, []);
  useEffect(() => {
    getProfile();
}, [editable]);

  if (profile === null) return null;
  
  let boxName,boxPassword,boxEmail,boxPhone; 
  if(editable){
    boxName= <TextInput defaultValue={profile.username} onChangeText={setName}/>  ;
    boxPassword=<TextInput defaultValue={profile.password} onChangeText={setPassword} secureTextEntry={true}/>  ;
    boxEmail=<TextInput defaultValue={profile.email} onChangeText={setMail}/>  ;
    boxPhone=<TextInput defaultValue={profile.numero} onChangeText={setPhone}/>  ;
  }else{
    boxName=<Text style={styles.textData}>{profile.username}</Text>;
    boxPassword=<Text style={styles.textData}>{profile.password}</Text>;
    boxEmail=<Text style={styles.textData}> {profile.email}</Text>;
    boxPhone=<Text style={styles.textData}> {profile.numero}</Text>;
  }
  const onCancelPressed=()=>{
    setEditable(false);
    setText('Editar');
    getProfile(); 
  }
  
  const onEditPressed=()=>{
    if(editable){
      setEditable(false);
      setText('Editar');
      getProfile2();
    }
    else{
      setEditable(true); 
      setText('Guardar');
      getProfile();
    }
  };
  return (
      <SafeAreaView
          style={{flex: 1}}
      >
          <FocusAwareStatusBar
              barStyle='dark-content'
              backgroundColor={'#fff'}
          />
          <TouchableOpacity style={styles.garden} onPress={openGarden}>
            
          </TouchableOpacity>
          <View style={styles.container}>
              <Image
                  source={{uri: profile.profileImage}}
                  style={styles.userCircle}
              />
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
            { auth0 != null &&
              <SvgQRCode
                style = {{width: '100%'}} 
                value={auth0.uid}
              /> }
           <CustomButton
           text = 'Close'
           onPress ={() => setModalVisible(!modalVisible)}


           />
          </View>
        </View>
      </Modal>
              <TouchableOpacity  onPress={() =>setModalVisible(true)}>
                <Image style={styles.qrCode} source={qrCode} />
              </TouchableOpacity >
                   
              <View stylestyle={styles.cont}>
                  <Text style={styles.userName}>
                    {profile.username}
                  </Text>   
              </View>
              <ScrollView
                  showsVerticalScrollIndicator={false}
              >
                  
                  <View>
                      <Text style={styles.title}>
                          Datos personales
                          
                      </Text>
                      <View style={styles.cont}>
                      {editable?<CustomButton 
                         text='Cancelar'
                         type = 'profile2'
                         onPress={onCancelPressed}
                        >
                        </CustomButton> :null}
                      <CustomButton 
                         text={text}
                         type = 'profile'
                         onPress={onEditPressed}
                        >
                        </CustomButton> 
                      </View>
                        <View style={styles.greenBox}>
                        <View style={styles.rowFlex}>
                            <Text style={styles.dataBox}>
                                Nombre de usuario
                            </Text>
                        </View>
                        <View style={styles.commentsBox}>
                            {boxName}
                        </View>
                        <View style={styles.rowFlex}>
                            <Text style={styles.dataBox}>
                                Contraseña
                            </Text>
                        </View>
                        <View style={styles.commentsBox}>
                            {boxPassword}   
                        </View>
                        <View style={styles.rowFlex}>
                            <Text style={styles.dataBox}>
                                Correo
                            </Text>
                        </View>
                        <View style={styles.commentsBox}>
                            {boxEmail}
                        </View>
                        <View style={styles.rowFlex}>
                            <Text style={styles.dataBox}>
                                Teléfono
                            </Text>
                        </View>
                        <View style={styles.commentsBox}>
                            {boxPhone}
                        </View>
                    </View>
                  </View>
                  
              </ScrollView>
          </View>
      </SafeAreaView>
  );
}



const styles = StyleSheet.create({
  rowFlex: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  garden: {
      height: 200,
      backgroundColor: '#D7FFE7'
  },
  container: {
      flex: 1,
      backgroundColor: '#fff',
      marginTop: -25,
      borderTopLeftRadius: 25,
      borderTopRightRadius: 25,
      paddingHorizontal: 25
  },
  containerVehicle: {
    backgroundColor: '#a8bac4',
    alignSelf:'center',
    flexDirection:'row',
    justifyContent:'center',
    width:'90%',
    height:100,
    padding:20,
    paddingBottom:22,
    borderRadius:10,
    marginTop:30,
    alignItems:'center'
},
  title: {
      marginVertical: 20,
      fontSize: 16,
      fontWeight: 'bold'
  },
  userCircle: {
      width: 125,
      height: 125,
      marginTop: -62.5
  },
  userCode : {
    width: 10,
    height: 10,    
    marginLeft  : '60%',


  },
  userName: {
      fontSize: 22,
      fontWeight: 'bold',
      color: '#353535',
      textAlign:'right',
      marginTop: -55,
      paddingHorizontal:10,
  },
  points: {
      marginTop: 8
  },
  followersBox: {
      backgroundColor: '#fff',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 6
  },
  greenBox: {
      backgroundColor: '#D7E8DE',
      padding: 10,
      borderRadius: 8
  },
  dataBox: {
      color: '#3E5749',
      fontWeight: 'bold',
      fontSize: 16,
      marginLeft: 10,
      marginTop:5
  },
  commentsBox: {
      backgroundColor: '#fff',
      padding: 10,
      borderRadius: 8,
      marginTop: 10
  },
  textData: {
    fontWeight: 'bold',
    color: '#353535'
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
    padding: 60,
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
export default UserProfile;