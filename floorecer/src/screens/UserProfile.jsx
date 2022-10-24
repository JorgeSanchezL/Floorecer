import React ,{useEffect,useState} from 'react';
import { StyleSheet, SafeAreaView, Dimensions,
  ScrollView, View, Image, Text ,TouchableButton,Button} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

import user from '../../assets/image/user.png';
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

  const getProfile = async () => {
      const api_call = await fetch('http://13.39.87.231:5000/users/gPASbD6K2bOwU3dK3SpqwlG8Rhl2');
      const response = await api_call.json();
      setProfile(response);
      console.log(response);
  }
  const getProfile2 = async () => {
        try {
          const response = await fetch("http://13.39.87.231:5000/user-authe/userProfile", {
            method: 'POST',
            body: JSON.stringify({
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



  useEffect(() => {
      getProfile();
  }, []);

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
          <View style={styles.garden}>
            <Ionicons
                  name='ios-arrow-back'
                  size={30}
                  color={'#085D0E'}
            />
          </View>
          <View style={styles.container}>
              <Image
                  source={user}
                  style={styles.userCircle}
              />
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
                  <Text style={styles.title}>
                      Mis vehículos
                  </Text>
                  <View style={styles.containerVehicle}>

                  <Ionicons
                  name='add-circle-outline'
                  size={30}
                  color={'#085D0E'}
                  />

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


});
export default UserProfile;