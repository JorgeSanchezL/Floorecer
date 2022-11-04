import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Dimensions,
    ScrollView, View, Image, Text } from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { BACKEND_URL } from '@env';

import mercatUPV from '../../assets/image/mercat_upv.png';

export const width = Dimensions.get('window').width;

const PublicProfile = () => {
    const [profile, setProfile] = useState(null);

    const getProfile = async () => {
        const api_call = await fetch(`${BACKEND_URL}/users/zAOreREzVPWuDLuloewkAhp5OrB3`);
        const response = await api_call.json();
        setProfile(response);
    }

    useEffect(() => {
        getProfile();
    }, []);

    if (profile === null) return null;

    return (
        <SafeAreaView
            style={{flex: 1}}
        >
            <FocusAwareStatusBar
                barStyle='dark-content'
                backgroundColor={'#fff'}
            />
            <View style={styles.garden}>
                <View></View>
            </View>
            <View style={styles.container}>
                <Image
                    source={{uri: profile.profileImage}}
                    style={styles.userCircle}
                />
                <View style={[
                    styles.rowFlex,
                    {
                        justifyContent: 'space-between',
                        marginBottom: 20
                    }
                ]}>
                    <View>
                        <Text style={styles.userName}>
                            {profile.username}
                        </Text>
                        <View style={[
                            styles.rowFlex,
                            styles.points
                        ]}>
                            <Ionicons
                                name='ribbon-outline'
                                size={22}
                                color={'#085D0E'}
                            />
                            <Text style={{
                                fontSize: 15,
                                marginLeft: 6
                            }}>
                                {profile.points} puntos
                            </Text>
                        </View>
                    </View>
                    <View style={[
                        styles.rowFlex,
                        styles.followBtn
                    ]}>
                        <Ionicons
                            name='add-circle-outline'
                            size={18}
                            color={'#085D0E'}
                        />
                        <Text
                            style={{
                                fontSize: 15,
                                color: '#085D0E',
                                fontWeight: 'bold',
                                marginLeft: 4
                            }}
                        >
                            Seguir
                        </Text>
                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <View style={styles.followers}>
                        <View style={[
                            styles.rowFlex,
                            styles.followersBox
                        ]}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>
                                {profile.followers.length}
                            </Text>
                            <Text style={{
                                marginLeft: 4
                            }}>
                                seguidores
                            </Text>
                        </View>
                        <View style={[
                            styles.rowFlex,
                            styles.followersBox
                        ]}>
                            <Text style={{
                                fontWeight: 'bold'
                            }}>
                                {profile.following.length}
                            </Text>
                            <Text style={{
                                marginLeft: 4
                            }}>
                                seguidos
                            </Text>
                        </View>
                    </View>
                    <View>
                        <Text style={styles.title}>
                            Últimas reseñas
                        </Text>
                        <View style={styles.greenBox}>
                            <View style={styles.rowFlex}>
                                <Entypo
                                    name='shop'
                                    size={25}
                                    color={'#3E5749'}
                                />
                                <Text style={styles.shopName}>
                                    Fruteria Taronja
                                </Text>
                            </View>
                            <View style={styles.commentsBox}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        color: '#353535'
                                    }}
                                >
                                    Hortalizas increíbles
                                </Text>
                                <Text style={{marginTop: 6}}>
                                    Las hortalizas que vende son frescas y sabrosas. Además el trato al cliente es excelente.
                                </Text>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.title}>
                        Visitados recientemente
                    </Text>
                    <View style={styles.recentShop}>
                        <Image
                            source={mercatUPV}
                            style={styles.thumbnail}
                        />
                        <View 
                            style={styles.shopDesc}
                        >
                            <Text
                                style={{
                                    fontSize: 15,
                                    fontWeight: 'bold',
                                    color: '#085D0E'
                                }}
                            >
                                Mercat UPV
                            </Text>
                            <Text style={{marginTop: 6}}>
                                Mercado agro ecológico de la UPV. Abierto todos los jueves en el Ágora
                            </Text>
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
        color: '#353535'
    },
    points: {
        marginTop: 8
    },
    followBtn: {
        backgroundColor: '#A0D5A4',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 8
    },
    followers: {
        padding: 8,
        borderRadius: 6,
        backgroundColor: '#e8e8e8',
        flexDirection: 'row',
        justifyContent: 'space-around'
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
    shopName: {
        color: '#3E5749',
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft: 10
    },
    commentsBox: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 8,
        marginTop: 10
    },
    recentShop: {
        flexDirection: 'row'
    },
    shopDesc: {
        marginLeft: 20,
        width: width - 180
    },
    thumbnail: {
        width: 100,
        height: 100
    },
});

export default PublicProfile;
