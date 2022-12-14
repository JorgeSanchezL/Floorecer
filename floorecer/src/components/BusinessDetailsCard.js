import React, { useState, useMemo, useEffect} from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Pressable, useWindowDimensions, Dimensions} from 'react-native';
import { useFonts } from 'expo-font';

import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import { getItemAsync } from 'expo-secure-store';

import * as Animatable from 'react-native-animatable';
import { BACKEND_URL } from '@env';
import { updateBusiness } from '../../utils/actions';
import CustomInput from '../components/CustomInput';

const diasDeLaSemana = ["Domingo","Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado"]
const diasDeLaSemanaEuropa = ["Lunes", "Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"]

function getOpeningText(openingHours){
    const date = new Date()
    let today = date.getDay()
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

function getStarsValue(reviews){
  let value=0
  reviews.forEach(review => {
    value+=review.value
  });
  value = reviews.length > 0 ? Math.round(( value / reviews.length) * 100) / 100 : 0
  return value 
}
const {width} = Dimensions.get("window");
const height = width * 0.6;

const BusinessDetailsCard = (props) => {
    const snapPoints = useMemo(()=> ['20%','55%', '100%'],[])
    const [index, setIndex] = useState(0)
    const [isHorizontalScrolling, setIsHorizontalScrolling] = useState(false)
    const [isVisibleOpeningHours, setIsVisibleOpeningHours] = useState(false)
    const [reviews, setReviews] = useState(props.business.reviews)
    const [uuid, setUuid] = useState(null)
    const image = props.business.imageURL 
    const onChange = (index ) => {
      if(index===-1)props.setBusiness(undefined)
      setIndex(index)
    }

    const [profile, setProfile] = useState(null);

    const [fontLoaded] = useFonts({
      MuseoModernoRegular: require("../../assets/fonts/MuseoModerno-Regular.ttf"),
      MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf"),
      PoppinsRegular: require("../../assets/fonts/Poppins-Regular.ttf")
    })

    useEffect(()=>{
      setReviews(props.business.reviews)
    },[props.business])

    const getProfile = async () => {
      try {
        const auth0 = JSON.parse(await getItemAsync('auth0'));
        setUuid(auth0.uid);
        const api_call = await fetch(`${BACKEND_URL}/users/${auth0.uid}`);
        const response = await api_call.json();
        setProfile(response);
      } catch(e) { Alert.alert(e); }
      
    }
    useEffect(() => {
        getProfile();
    }, []);

    if (!fontLoaded) { return null; }

    return (
        <BottomSheet 
          snapPoints={snapPoints}
          index={index}
          onChange = {onChange}
          enableContentPanningGesture={!isHorizontalScrolling}
          enablePanDownToClose
        >
           {index===2 && 
            <Text style={styles[`title_${index}`]}>{props.business.name}</Text>}
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
                  <Text style={styles.infoText}>{props.business.category ? props.business.category.charAt(0).toUpperCase() + props.business.category.slice(1) : "Sin categoría"}</Text>
                  <View style={{flex:0, flexDirection:'row'}}>
                    <Text style={styles.infoText}>{getStarsValue(reviews)}</Text>
                    <CurrentRating value={Math.floor(getStarsValue(reviews))}/>
                    <Text style={[styles.infoText,{marginLeft:10}]}>{`(${reviews.length})`}</Text>
                  </View>
                  {index!==2 && <Text style={styles.infoText}>{getOpeningText(props.business.openingHours)}</Text>}
                </View> 
                {index===0 && <Image source = {{uri: image}} style ={styles.image}/>}
              </View>
            </Animatable.View>
            <View 
              onTouchStart={()=>setIsHorizontalScrolling(true)} 
              onTouchCancel={()=>setIsHorizontalScrolling(false)}
            >
            {image ? <Image source = {{uri: image}} style={styles.cardImage}/> :
              <Text style={{fontSize: 16, justifyContent:'center', alignSelf:'center', marginTop: index==1?'25%':0}}>Este comercio no tiene ninguna imágen disponible</Text>}
            </View>
            {index===2 && reviews!==null &&
                  <View>
                    <TopDivider />               
                    <Text style={styles.subTitle}>Descripción</Text>
                    <Text style={styles.text}>{props.business.description || "Descripción no disponible" }</Text>
                    <Divider />
                    <View style={{flex:0, flexDirection:'row', alignItems:"center"}}>
                        <Image style={styles.icon} source={require(`../../assets/location.png`)} />
                        <Text style={styles.text}>{props.business.address}</Text>
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
                            { diasDeLaSemanaEuropa.map((day, index)=>{
                              return(
                              <View key={index} style={{flex:1,flexDirection:'row'}}>
                                <Text style={styles.text}>{day}</Text>
                                <View style={{position:"relative",marginLeft:"auto",alignSelf:"flex-end"}}>
                                  {props.business.openingHours[day].length!=0?props.business.openingHours[day].map((slot, index)=>{
                                    return(
                                      <View key={index}>
                                      <Text style={[styles.text,{marginLeft:80}]}>{`${slot.from}-${slot.to}`}</Text></View>
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
                    <View style={{flexDirection:'column'}} >
                        <Text style={styles.subTitle}>Valorar y escribir una reseña</Text>
                        <Text style={styles.text}>Comparte tu experiencia para ayudar a otros usuarios</Text>
                        <View style={{flex:1,flexDirection:'row'}}>
                          <CustomRatingBar reviews={reviews} uuid = {uuid} profile={profile} businessId={props.business.docId} setReviews={setReviews}/>
                        </View>
                    </View>
                    <Divider />
                    <Text style={styles.subTitle}>Reseñas</Text>
                    <Divider />
                    {reviews!==null && reviews.map((review, index)=>{
                        return <View key={`review${index}`}>
                          <View style={{flex:1, flexDirection:'row', alignItems:'center'}}>
                            <Image style={styles.icon} source={{uri:review.profileImage}} />
                            <Text style={styles.boldText}>{review.name}</Text>
                          </View>
                          <View style={{marginLeft:10}}>
                            <CurrentRating value={review.value}/>
                          </View>
                          {review.comment && <Text style={styles.text}>{review.comment}</Text> } 
                          <Divider />
                        </View>
                      })
                    }
                  </View>  }
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
  const CustomRatingBar = (props) => {
    let reviews = props.reviews
    const userHasReview = () => {
      if(reviews.some((review)=>{return review.uuid===props.uuid})){
        for(let i=0;i<reviews.length;i++){
          if(reviews[i].uuid===props.uuid){
            return reviews[i]
          }
        }
      }
    }
    let review = userHasReview()
    const [defaultRating, setdefaultRating] = useState(review ? review.value : 0)
    const [existsReview, setExistsReview] = useState(review ? true : false)
    const [comment, setComment] = useState(review? review.comment : '')

    const maxRating=[1,2,3,4,5]
    const starImgFilled = `../../assets/star_filled.png`
    const starImgCorner = `../../assets/star_corner.png`

    const publishReview = async () => {
      setExistsReview(true)
      reviews.unshift({
        name: props.profile.username,
        profileImage: props.profile.profileImage,
        uuid: props.uuid,
        value: defaultRating,
        comment: comment
      })
      //Meter alerta se ha guardado correctamente
      if(updateBusiness(props.businessId,{reviews: reviews})) {
        props.setReviews(reviews)
      }

    }
    return (
      <View>
        <View style={{flexDirection:"row"}}>
          <Image style={styles.icon} source={{uri: props.profile===null ? 'https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco,dpr_1/q5genwzt9ru47slmnuzk' : props.profile.profileImage}} />
          {maxRating.map((item,key) => {return(
            <TouchableOpacity
              activeOpacity={0.7}
              key={key}
              onPress={()=>setdefaultRating(item)}
              disabled={existsReview}
            >
              <Image 
                style={styles.icon}
                source={item<=defaultRating?require(starImgFilled):require(starImgCorner)}
                ></Image>
            </TouchableOpacity>
          )})}
        </View>
        {defaultRating!=0 && 
          <View>
            <CustomInput 
              placeholder='Comparte detalles sobre tu experiencia en este lugar' 
              multiline
              editable={!existsReview}
              value={comment}
              setValue={setComment}
            />
            <TouchableOpacity 
              style ={styles[`textButton${existsReview ? 'Disabled':''}`]} 
              disabled={existsReview} 
              onPress={publishReview}
            >
              <Text style={styles[`buttonText${existsReview ? 'Disabled' : ''}`]}>
                Publicar
              </Text>
            </TouchableOpacity>

          </View>}
      </View>
    )
  }

  const CurrentRating = (props) => {
    const [defaultRating, setdefaultRating] = useState(props.value)
    const maxRating=[1,2,3,4,5]
    const starImgFilled = `../../assets/star_filled.png`
    const starImgCorner = `../../assets/star_corner.png`
    return (
      <View style={{flexDirection:"row"}}>
        {maxRating.map((item, index) => {return(
          <View key={index}>
            <Image 
              style={styles.stars}
              source={item<=defaultRating?require(starImgFilled):require(starImgCorner)}
              ></Image></View>
        )})}
      </View>
    )
  }
  const styles = StyleSheet.create({
    header: {
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
    title_0:{
      fontSize:24,
      fontFamily: 'MuseoModernoBold',
      color:"black",
    },
    title_1:{
      fontSize:24,
      fontFamily: 'MuseoModernoBold',
      color:"black"
    },
    title_2:{
      fontSize:24,
      fontFamily: 'MuseoModernoBold',
      color:"black",
      textAlign:"center"
    },
    infoText:{
      marginTop:2,
      fontSize:16,
      color:"gray",
      fontFamily: 'MuseoModernoRegular',
      marginRight:10
    },
    text:{
        marginTop:10,
        fontSize:16,
        fontFamily: 'PoppinsRegular',
        color:"black",
        marginLeft:10,
        marginRight:10
    },
    boldText:{
      marginTop:10,
      fontSize:16,
      fontFamily: 'MuseoModernoBold',
      marginLeft:10,
      marginRight:10,
    },
    subTitle:{
        fontSize:20,
        fontFamily: 'MuseoModernoBold',
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
    cardImage:{
      width,height,
      resizeMode: 'contain',
      alignItems: 'center',
    },
    icon:{
      height: 25,
      width: 25,
      marginTop:10,
      marginLeft: 10,
      marginRight:10,
      resizeMode: 'stretch',
    },
    textButton:{
      backgroundColor:'#65AB73',
      marginTop:10,
      marginLeft: 10,
      marginRight:10,
      borderRadius:5,
      alignItems:"center",
      width:'100%'
    },
    textButtonDisabled:{
      backgroundColor:'#ACD5B4',
      marginTop:10,
      marginLeft: 10,
      marginRight:10,
      borderRadius:5,
      alignItems:"center",
      width:'100%'
    },
    buttonText:{
      fontSize:16,
      color: '#fff',
      fontFamily: 'MuseoModernoBold',
      padding:5
    },
    buttonTextDisabled:{
      fontSize:16,
      color:"#fff",
      fontFamily: 'MuseoModernoBold',
      padding:5
    },
    smallIcon:{
      height: 16,
      width: 16,
      marginTop:10,
      marginLeft: 10,
      marginRight:10,
      resizeMode: 'stretch',
    },
    stars:{
      height: 16,
      width: 16,
      marginTop:4,
      resizeMode: 'stretch',
    }
  });

  export default BusinessDetailsCard