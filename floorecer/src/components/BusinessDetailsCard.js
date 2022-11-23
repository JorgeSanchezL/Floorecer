import React, { useState, useMemo, useEffect} from 'react';
import { StyleSheet, View, SafeAreaView, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import ImageCarousel from '../components/ImageCarousel';

import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';

import * as Animatable from 'react-native-animatable';

const diasDeLaSemana = ["Domingo","Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado"]
const diasDeLaSemanaEuropa = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]

function getOpeningText(openingHours){
    const date = new Date()
    let today = 3
    let currentTime = date.toLocaleTimeString()

    if(openingHours[diasDeLaSemana[today]].length!=0){
        for(let i=0;i<openingHours[diasDeLaSemana[today]].length;i++){
          let slot = openingHours[diasDeLaSemana[today]][i]
          let from=slot.from+":00"
          let to =slot.to+":00"
          if(currentTime>from && currentTime < to) {
            return `Abierto · Cierre: ${slot.to}`
          }else if(currentTime<from){
            return `Cerrado · Apertura: ${slot.from} (hoy)`
          }
        }
    }
    let nextOpenedDay = today
    let fromHour = undefined
    while(!fromHour){
        nextOpenedDay++
        if(nextOpenedDay===7) {
          nextOpenedDay=0;
        }

        if (openingHours[diasDeLaSemana[nextOpenedDay]].length!=0) {
          fromHour=openingHours[diasDeLaSemana[nextOpenedDay]][0]["from"]
        }
    }

    return `Cerrado · Apertura: ${fromHour} (${diasDeLaSemana[nextOpenedDay]})`
}

const BusinessDetailsCard = (props) => {
    const snapPoints = useMemo(()=> ['20%','55%', '100%'],[])
    const [index, setIndex] = useState(0)
    const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false)
    const [isVisibleOpeningHours, setIsVisibleOpeningHours] = useState(false)

    //get images from DB
    const images =[
      'https://www.larazon.es/resizer/rq4rbnMC9g_5NTEuTH25LhXXcMg=/600x400/smart/filters:format(jpg)/cloudfront-eu-central-1.images.arcpublishing.com/larazon/7IGMFSY4XRG3RJ54HLFULH5VP4.JPG',
      'https://frutasmontijo.com/wp-content/uploads/2018/10/fruterias.jpg',
      'https://frutasmontijo.com/wp-content/uploads/2018/10/fruterias.jpg'
    ]  
    const onChange = (index ) => {
      if(index===-1)props.setBusiness(undefined)
      setIndex(index)
    }
  
    return (
        <BottomSheet 
          snapPoints={snapPoints}
          index={index}
          onChange = {onChange}
          enableContentPanningGesture={!isHorizontalScrolling}
          enablePanDownToClose
        >
           {index===2 && <Text style={styles[`title_${index}`]}>{props.business.name}</Text>}
           <BottomSheetScrollView
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                >
            <Animatable.View
              style={styles.header}
              animation="fadeInUp"
              delay={500}
              easing="ease-in-out"
              duration={400}
              visibility={props.business}
            >
              <View style={{flex:0, flexDirection:'row', marginLeft:5}}>
                <View>
                  {index!==2 && <Text style={styles[`title_${index}`]}>{props.business.name}</Text>}
                  <Text style={styles.infoText}>{props.business.category || "unknown category"}</Text>
                  <Text style={styles.infoText}>{"4.3 X X X X X (718)"}</Text>
                  {index!==2 && <Text style={styles.infoText}>{getOpeningText(props.business.openingHours)}</Text>}
                </View> 
                {index===0 && <Image source = {{uri: images[0]}} style ={styles.image}/>}
              </View>
            </Animatable.View>
            <View 
              onTouchStart={()=>setIsHorizontalScrolling(true)} 
              onTouchCancel={()=>setIsHorizontalScrolling(false)}
            >
              <ImageCarousel images = {images}/>
            </View>
            {index===2 && <TopDivider />}               
                    <Text style={styles.subTitle}>Descripción</Text>
                    <Text style={styles.text}>{props.business.descripcion || "Descripción no disponible" }</Text>
                    <Divider />
                    <View style={{flex:0, flexDirection:'row', alignItems:"center"}}>
                        <Image style={styles.icon} source={require(`../../assets/location.png`)} />
                        <Text style={styles.text}>{props.business.Address}</Text>
                    </View>
                    <Divider />
                    <View>
                      <TouchableOpacity onPress={()=>setIsVisibleOpeningHours(!isVisibleOpeningHours)}>
                        {!isVisibleOpeningHours && <View style={{flex:0, flexDirection:'row', alignItems:"center"}}>
                          <Image style={styles.icon} source={require(`../../assets/schedule.png`)} />
                          <Text  style={styles.text}>{getOpeningText(props.business.openingHours)}</Text>
                          <Image style={styles.smallIcon} source={require(`../../assets/down-arrow.png`)} />
                        </View>}
                        {isVisibleOpeningHours && <View style={{flex:0, flexDirection:'row'}}>
                          <Image style={styles.icon} source={require(`../../assets/schedule.png`)} />
                          <View>
                            { diasDeLaSemanaEuropa.map((day)=>{
                              return(
                              <View style={{flex:1,flexDirection:'row'}}>
                                <Text style={styles.text}>{day}</Text>
                                <View style={{position:"relative",marginLeft:"auto",alignSelf:"flex-end"}}>
                                  {props.business.openingHours[day].length!=0?props.business.openingHours[day].map((slot)=>{
                                    return(
                                      <Text style={[styles.text,{marginLeft:80}]}>{`${slot.from}-${slot.to}`}</Text>
                                    )
                                    }) : <Text style={styles.text}>Cerrado</Text>
                                  }
                                </View>
                              </View>)
                              })
                            }
                          </View>
                        </View>}
                      </TouchableOpacity>
                    </View>
                    <Divider />
                    <View style={{flex:0, flexDirection:'row', alignItems:"center"}}>
                        <Text style={styles.subTitle}>Reseñas</Text>
                    </View>
                </BottomSheetScrollView>
        </BottomSheet>
    )
  }

  const TopDivider = (props) => {
    return (
        <View style = {{
            height:2,
            backgroundColor:"gray",
            marginTop:10,
            shadowColor:"black"
        }}/>
    )
  }
  const Divider = (props) => {
    return (
        <View style = {{
            height:1,
            backgroundColor:"gray",
            marginTop:10
        }}/>
    )
  }

  const styles = StyleSheet.create({
    header: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    title_0:{
      fontSize:24,
      fontWeight:'bold',
      color:"black",
    },
    title_1:{
      fontSize:24,
      fontWeight:'bold',
      color:"black"
    },
    title_2:{
      fontSize:24,
      fontWeight:'bold',
      color:"black",
      textAlign:"center"
    },
    infoText:{
      marginTop:2,
      fontSize:16,
      color:"gray",
      position:"relative"
    },
    text:{
        marginTop:10,
        fontSize:16,
        color:"black",
        marginLeft:10,
    },
    subTitle:{
        fontSize:20,
        fontWeight:'bold',
        color:"black",
        marginTop:10,
        marginLeft:10
    },
    image:{
      width:130, 
      height:110, 
      resizeMode:'contain',
      marginLeft: 10,
      marginTop:2,
      flex:1,
      justifyContent:"flex-end"
    },
    icon:{
      height: 25,
      width: 25,
      marginTop:10,
      marginLeft: 10,
      marginRight:10,
      resizeMode: 'stretch',
    },
    smallIcon:{
      height: 16,
      width: 16,
      marginTop:10,
      marginLeft: 10,
      marginRight:10,
      resizeMode: 'stretch',
    }
  });

  export default BusinessDetailsCard