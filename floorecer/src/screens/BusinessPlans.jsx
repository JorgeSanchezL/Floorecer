import React, { useRef,useEffect } from 'react'
import { SafeAreaView, StyleSheet, View, Text,
    FlatList, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
                paddingVertical: 15,
                paddingHorizontal: 20
            }}>
                <Text style={styles.bolder}>
                    {plan.amount}
                </Text>
                <Text style={styles.pricing}>
                    {plan.price} / trimestre
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
                                <Text>{benefit}</Text>
                            </View>
                        );
                    })}
                </View>
            </View>
        </View>
    );
}

const BusinessPlans = ({ navigation, route }) => {
    const { ActualPlan } = route.params;
    console.log(ActualPlan)
    const scrollRef = useRef(null);
    const scrollIndex = useRef(0);

    return (
        <SafeAreaView
            style={styles.main}
        >
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor={'#fff'}
            />
            <View style={{padding: 25}}>
                <Text style={styles.title}>
                    Selecciona tu plan de empresa
                </Text>
            </View>
            
            {
                ActualPlan != null && 
                <View style={{marginTop: -5}}>
                    <Text style={styles.title2}>
                        Tu plan actual es '{ActualPlan==1 ? 'Plan Basic': 'Plan Premium'}'
                    </Text>
                 </View>
            }
            <View style={styles.slider}>
                <TouchableOpacity
                    onPress={() => {
                        scrollRef.current
                            .scrollToIndex({
                                animated: true,
                                index: 0
                            });
                    }}
                    activeOpacity={0.8}
                    style={{
                        width: 40,
                        alignItems: 'center'
                    }}
                >
                    <Ionicons
                        name='arrow-back-outline'
                        size={32}
                        color='#276D1F'
                    />
                </TouchableOpacity>
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
                <TouchableOpacity
                    onPress={() => {
                        scrollRef.current
                            .scrollToIndex({
                                animated: true,
                                index: 1
                            });
                    }}
                    activeOpacity={0.8}
                    style={{
                        width:40,
                        alignItems: 'center'
                    }}
                >
                    <Ionicons
                        name='arrow-forward-outline'
                        size={32}
                        color='#276D1F'
                    />
                </TouchableOpacity>
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
                <Text style={styles.textBtn}>
                    Continuar
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    main: {
        backgroundColor: '#D7FFE7',
        flex: 1
    },
    title: {
        color: '#085D0E',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center'
    },
    title2: {
        color: '#085D0E',
        fontWeight: 'bold',
        fontSize: 15,
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
        marginHorizontal: 10
    },
    header: {
        backgroundColor: '#589351',
        padding: 15,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    textHeader: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 25,
        textAlign: 'center'
    },
    bolder: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },
    pricing: {
        color: '#085D0E',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 20
    },
    list: {
        marginRight: 20
    },
    button: {
        backgroundColor: '#29AB7E',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 50,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textBtn: {
        color: '#fff',
        fontSize: 18,
        
    }
});

export default BusinessPlans;