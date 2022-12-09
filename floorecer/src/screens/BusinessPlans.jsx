import React, { useRef, useState } from 'react'
import { SafeAreaView, StyleSheet, View, Text, ImageBackground, Image,
    FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

import PinkFlower from '../../assets/image/PinkFlower.png';
import GreenBall from '../../assets/image/greenBall.png';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

const plans = [
    {
        id: 1,
        name: 'Basic',
        amount: '5 tiendas',
        price: 29.99,
        benefits: [
            'Mostrar tus comercios a nuestra comunidad',
            'Ofrecer promociones a tus clientes'
        ]
    },
    {
        id: 2,
        name: 'Premium',
        amount: 'Tiendas ilimitadas',
        price: 49.99,
        benefits: [
            'Mostrar tus comercios a nuestra comunidad',
            'Ofrecer promociones a tus clientes',
            'Mayor visibilidad frente a otros comercios',
            'Datos de facturación de tus clientes'
        ]
    },
];

const { width, height } = Dimensions.get('screen');

const Plan = ({ item: plan}) => {
    return (
        <View
            key={plan.id}
            style={styles.box}
        >
            <View style={styles.header}>
                <Text style={styles.textHeader}>
                    Plan {plan.name}
                </Text>
            </View>
            <View style={{
                paddingBottom: 15,
                paddingHorizontal: 20
            }}>
                <Text style={styles.bolder}>
                    {plan.amount}
                </Text>
                <View style={styles.list}>
                    {plan.benefits.map((benefit, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginBottom: 12
                                }}
                            >
                                <Ionicons
                                    name='ellipse'
                                    size={5}
                                    style={{marginRight: 15}}
                                />
                                <Text style={{
                                    fontFamily: 'MuseoModernoRegular'
                                }}>{benefit}</Text>
                            </View>
                        );
                    })}
                </View>
                <Text style={styles.pricing}>
                    {plan.price} / trimestre
                </Text>
            </View>
        </View>
    );
}

const BusinessPlans = ({ navigation, route }) => {
    const { ActualPlan } = route.params;

    const [fontLoaded] = useFonts({
        MuseoModernoRegular: require("../../assets/fonts/MuseoModerno-Regular.ttf"),
        MuseoModernoBold: require("../../assets/fonts/MuseoModerno-Bold.ttf")
    })

    const scrollRef = useRef(null);
    const scrollIndex = useRef(0);

    if(!fontLoaded) { return null; }

    return (
        <SafeAreaView
            style={styles.main}
        >
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor={'#fff'}
            />
            <ImageBackground
                source={PinkFlower}
                resizeMode='cover'
                style={{
                    width: width,
                    height: height
                }}
            >
            <View style={{
                paddingTop: 25,
                paddingBottom: 15,
                paddingHorizontal: 25
            }}>
                <Text style={styles.title}>
                    Selecciona tu plan de empresa
                </Text>
            </View>
            <View style={{
                flexDirection: 'row',
                marginHorizontal: (width - 26) / 2
            }}>
                <View style={[
                    styles.ball,
                    {
                        marginRight: 10,
                        backgroundColor: '#ff5959'
                    }
                ]}></View>
                <View style={[
                    styles.ball,
                    {backgroundColor: '#d9d9d9'}
                ]}></View>
            </View>
            <View style={styles.slider}>
                <FlatList
                    renderItem={Plan}
                    data={plans}
                    ref={scrollRef}
                    keyExtractor={(item) => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onViewableItemsChanged={({ viewableItems } ) => {
                        scrollIndex.current = viewableItems[0].index;
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    if(ActualPlan-1 == scrollIndex.current){
                        Alert.alert(
                            `Actualmente ya tiene el plan ${ActualPlan==1 ? 'Plan Basic': 'Plan Premium'} `,
                            "",[{ text: "Vale",},])
                    }
                    else{ 
                        navigation.navigate('payment', {
                            plan: scrollIndex.current
                        })
                    }
                }}
                activeOpacity={0.8}
                style={styles.button}
            >
                    <Image
                        source={GreenBall}
                        width={80}
                        height={50}
                        style={{
                            marginRight: 10
                        }}
                    />
                    <Text style={styles.textBtn}>
                        Continuar
                    </Text>
            </TouchableOpacity>
        </ImageBackground>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#fff',
        flex: 1
    },
    title: {
        color: '#000',
        fontFamily: 'MuseoModernoBold',
        fontSize: 25,
        textAlign: 'center'
    },
    slider: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25
    },
    box: {
        width: width - 100,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 50
    },
    header: {
        backgroundColor: '#fff',
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textHeader: {
        color: '#000',
        fontFamily: 'MuseoModernoBold',
        fontSize: 25,
        textAlign: 'center'
    },
    bolder: {
        fontFamily: 'MuseoModernoBold',
        fontSize: 18,
        textAlign: 'center'
    },
    pricing: {
        color: '#000',
        fontFamily: 'MuseoModernoBold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    list: {
        marginTop: 20,
        marginRight: 20
    },
    button: {
        backgroundColor: '#fff',
        paddingHorizontal: 15,
        borderRadius: 8,
        marginHorizontal: (width - 200) / 2,
        marginTop: 25,
        flex: 0,
        alignItems: 'center',
        height: 50,
        width: 200
    },
    textBtn: {
        color: '#000',
        fontFamily: 'MuseoModernoBold',
        fontSize: 18,
        marginTop: -45
    },
    ball: {
        width: 8,
        height: 8,
        borderRadius: 4,
    }
});

export default BusinessPlans;