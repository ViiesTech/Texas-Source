import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import Checkbox from '../../componets/CheckBox'
import CardInput from '../../componets/CardInput'
import { Button } from '../../componets/Button'

const Payment = () => {
    const [state, setState] = useState({
        card_holder: '',
        card_number: '',
        card_expiry: '',
        card_cvc: ''
    })

    const onChangeValue = (field, text) => {
        setState(prevState => ({
            ...prevState,
            [field]: text
        }))
    }

    return (
        <Container>
            <Header leftArrow={true} headerText={'Payment'} />
            <View style={styles.paymentView}>
                <View style={styles.paymentCard}>
                    <Text style={styles.title}>Choose a Payment method</Text>
                    <Checkbox style={{ marginTop: responsiveHeight(2) }} />
                    <View style={styles.inputWrapper}>
                        <CardInput
                            placeholder={'Card Number'}
                            value={state.card_number}
                            length={16}
                            label={'Card Number'}
                            onChangeText={(text) => onChangeValue('card_number', text)}
                        />
                        <CardInput
                            placeholder={'Card Holder'}
                            value={state.card_holder}
                            label={'Card Holder First Name and Last Name'}
                            onChangeText={(text) => onChangeValue('card_holder', text)}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CardInput
                                placeholder={'MM/YYYY'}
                                value={state.card_expiry}
                                length={16}
                                style={{ width: responsiveWidth(40) }}
                                label={'Expiration Number'}
                                onChangeText={(text) => onChangeValue('card_expiry', text)}
                            />
                            <CardInput
                                placeholder={'***'}
                                value={state.card_cvc}
                                length={3}
                                secureTextEntry={true}
                                style={{ width: responsiveWidth(40) }}
                                label={'CVC Code'}
                                onChangeText={(text) => onChangeValue('card_cvc', text)}
                            />
                        </View>
                    </View>
                    <Checkbox text={'Card Debit Card'} style={{ marginTop: responsiveHeight(2) }} cash={true} />
                    <Checkbox text={'Apple Pay'} apple_pay={true} style={{ marginTop: responsiveHeight(2) }} />
                    <Checkbox text={'Google Pay'} google_pay={true} style={{ marginTop: responsiveHeight(2) }} />
                    <Button color={Colors.secondary} buttonStyle={{ marginTop: responsiveHeight(6) }} title={'Pay Now'} />
                </View>
            </View>
        </Container>
    )
}

export default Payment

const styles = StyleSheet.create({
    paymentView: {
        alignItems: 'center',
        paddingTop: responsiveHeight(2)
    },
    paymentCard: {
        padding: responsiveHeight(2),
        width: responsiveWidth(90),
        borderRadius: 15,
        backgroundColor: Colors.white
    },
    title: {
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2)
    },
    inputWrapper: {
        paddingTop: responsiveHeight(3)
    }
})