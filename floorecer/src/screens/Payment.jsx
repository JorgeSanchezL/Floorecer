import React from 'react'
import { SafeAreaView, StyleSheet, View, Text,
    TouchableOpacity, Alert } from 'react-native';
import { useForm } from 'react-hook-form';
import { BACKEND_URL } from '@env';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import CustomTextInput from '../components/CustomTextInput';

const Payment = ({ navigation, route }) => {
    const { plan } = route.params;

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const api_call = await fetch(`http://192.168.1.143/payments`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    // the 'uid' will come from register screen
                    // put some uid from firestore to test it
                    uid: '1JhCe6jIwlheYfXT1of8gJI8q693',
                    subsType: plan != 0 ? 2 : 1
                })
            });
            const response = await api_call.json();

            if (response.payed) {
                reset();
                navigation.navigate('newBusiness');
            } else { throw -1; }
        } catch (e) { 
            Alert.alert('Error de red',
                'Ha ocurrido un problema al realizar el pago');
        }
    }

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
                    Pasarela de pago
                </Text>
            </View>
            <View style={styles.box}>
                <View>
                    <Text style={styles.header}>
                        Productos
                    </Text>
                    <View style={[
                        styles.textBlock,
                        {
                            borderBottomWidth: 1,
                            borderBottomColor: '#afafaf',
                            paddingBottom: 10
                        }
                    ]}>
                        <Text style={{fontWeight: 'bold'}}>1 x</Text>
                        <Text> Suscripción "{plan != 0 ? 'Premium' : 'Basic'}"</Text>
                    </View>
                    <View style={styles.textBlock}>
                        <Text style={{fontWeight: 'bold'}}>Importe:</Text>
                        <Text> {plan != 0 ? '49.99' : '29.99'} € / trimestre</Text>
                    </View>
                </View>
                <CustomTextInput
                    control={control}
                    name='cardholder'
                    rules={{
                        required: 'Es necesario el titular de la tarjeta',
                        minLength: {
                            value: 8,
                            message: 'El nombre del titular debe estar completo'
                        }
                    }}
                    placeholder='Titular de la tarjeta'
                    icon={'person'}
                    style={{marginTop: 25}}
                />
                { errors.cardholder &&
                    <Text style={styles.textError}>
                        { errors.cardholder.message }
                    </Text> }
                <CustomTextInput
                    control={control}
                    name='cardnumber'
                    rules={{
                        required: 'El número de tarjeta es necesario',
                        minLength: {
                            value: 16,
                            message: 'El número de tarjeta tiene 16 dígitos'
                        },
                        maxLength: {
                            value: 16,
                            message: 'El número de tarjeta tiene 16 dígitos'
                        }
                    }}
                    placeholder='Número de la tarjeta'
                    icon={'card-outline'}
                    style={{marginTop: 20}}
                />
                { errors.cardnumber &&
                    <Text style={styles.textError}>
                        { errors.cardnumber.message }
                    </Text> }
                <View style={styles.inputs}>
                    <CustomTextInput
                        control={control}
                        name='month'
                        rules={{
                            required: 'El mes de la tarjeta es necesario',
                            minLength: {
                                value: 2,
                                message: 'El mes tiene formato de 2 dígitos'
                            },
                            maxLength: {
                                value: 2,
                                message: 'El mes tiene formato de 2 dígitos'
                            }
                        }}
                        placeholder='MM'
                        width={60}
                    />
                    <CustomTextInput
                        control={control}
                        name='year'
                        rules={{
                            required: 'El año de la tarjeta es necesario',
                            minLength: {
                                value: 2,
                                message: 'El año tiene formato de 2 dígitos'
                            },
                            maxLength: {
                                value: 2,
                                message: 'El año tiene formato de 2 dígitos'
                            }
                        }}
                        placeholder='AA'
                        width={60}
                    />
                    <CustomTextInput
                        control={control}
                        name='cvc'
                        rules={{
                            required: 'El CVC de la tarjeta es necesario',
                            minLength: {
                                value: 3,
                                message: 'El CVC tiene formato de 3 dígitos'
                            },
                            maxLength: {
                                value: 3,
                                message: 'El CVC tiene formato de 3 dígitos'
                            }
                        }}
                        placeholder='CVC'
                        width={60}
                    />
                </View>
                { (errors.month || errors.year || errors.cvc) &&
                    <Text style={[
                        styles.textError,
                        {marginTop: 6}
                    ]}>
                        {
                            errors.month
                                ? errors.month.message
                                : ( errors.year
                                    ? errors.year.message
                                    : errors.cvc.message )
                        }
                    </Text> }
            </View>
            <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                activeOpacity={0.8}
                style={styles.button}
            >
                <Text style={styles.textBtn}>
                    Pagar
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
    header: {
        color: '#489752',
        fontWeight: 'bold',
        fontSize: 18
    },
    box: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 25
    },
    textBlock: {
        flexDirection: 'row',
        marginTop: 8
    },
    button: {
        backgroundColor: '#29AB7E',
        padding: 15,
        borderRadius: 8,
        marginHorizontal: 25,
        marginTop: 25,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20
    },
    textBtn: {
        color: '#fff',
        fontSize: 18,
    },
    textError: {
        color: '#D12727',
        fontSize: 13,
        marginTop: 2,
        marginBottom: -5
    }
});

export default Payment;