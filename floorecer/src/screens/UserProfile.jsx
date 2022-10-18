import React ,{useState} from 'react';
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
  let vista=<Edit></Edit>;
  if(editable){
    vista=<Save></Save>;
    
  }else{
    vista=<Edit></Edit>;
  }
  
  
  const onEditPressed=()=>{
    if(editable){
      setEditable(false);
      setText('Editar');
    }
    else{
      setEditable(true); 
      setText('Guardar')
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
                    Carlos Sánchez
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
                      {vista}
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

export const Edit =()=>{
  return(
  <View style={styles.greenBox}>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Nombre de usuario
          </Text>
      </View>
      <View style={styles.commentsBox}>
      <Text style={styles.textData}>
              Carlos sa
          </Text>
      </View>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Contraseña
          </Text>
      </View>
      <View style={styles.commentsBox}>
          <Text style={styles.textData}>
              floorecer
          </Text>
      </View>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Correo
          </Text>
      </View>
      <View style={styles.commentsBox}>
          <Text style={styles.textData}>
              asda@upv.es
          </Text>
      </View>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Teléfono
          </Text>
      </View>
      <View style={styles.commentsBox}>
          <Text style={styles.textData}>
          621231232
          </Text>
      </View>
  </View>
  );
}
export const Save =()=>{
  const [name, setName] = useState('Carlos sa');
  const [password, setPassword] = useState('floorecer');
  const [phone, setPhone] = useState('621321611');
  const [mail, setMail] = useState('asdsa@upv.es');
  
  return(
  <View style={styles.greenBox}>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Nombre de usuario
          </Text>
      </View>
      <View style={styles.commentsBox}>
      <TextInput value={name} onChangeText={setName}/>   
      </View>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Contraseña
          </Text>
      </View>
      <View style={styles.commentsBox}>
        <TextInput value={password} onChangeText={setPassword} secureTextEntry={true}/>  
      </View>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Correo
          </Text>
      </View>
      <View style={styles.commentsBox}>
        <TextInput value={mail} onChangeText={setMail}/>  
      </View>
      <View style={styles.rowFlex}>
          <Text style={styles.dataBox}>
              Teléfono
          </Text>
      </View>
      <View style={styles.commentsBox}>
      <TextInput value={phone} onChangeText={setPhone}/>  
      </View>
  </View>
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