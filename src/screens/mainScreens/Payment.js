import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import Checkbox from '../../componets/CheckBox'
import CardInput from '../../componets/CardInput'
import { Button } from '../../componets/Button'
import { useGetAllCardsMutation, usePaymentMutation } from '../../redux/Services'
import { useDispatch, useSelector } from 'react-redux'
import Modal from 'react-native-modal'
import Loader from '../../componets/Loader'
import Card from '../../componets/Card'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { useNavigation } from '@react-navigation/native'
import { removeFromCart } from '../../redux/Slice'


const Payment = ({ route }) => {
    const [state, setState] = useState({
        card_holder: '',
        card_number: '',
        card_expiry: '',
        card_methodId: ''
    })
    const [modalVisible, setModalVisible] = useState(false)
  
    const [cardDetail, setCardDetail] = useState([])
    const [debitCard, setDebitCard] = useState(false)
  

    const [getAllCards, { isLoading: cardLoading }] = useGetAllCardsMutation()
    const [payment, { isLoading: paymentLoading }] = usePaymentMutation()
    // const [addReview, { isLoading: reviewLoading }] = useAddReviewMutation()
    const { customer_id } = useSelector(state => state.persistedData)

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const total = route?.params?.grandTotal;
    const productData = route?.params?.product;

    // console.log(productData)

    useEffect(() => {

        if (modalVisible) {
            fetchAllCards()
        }

    }, [modalVisible])
    console.log('total and product =>>>',productData)

    const onChangeValue = (field, text) => {
        setState(prevState => ({
            ...prevState,
            [field]: text
        }))
    }


    const fetchAllCards = async () => {
        await getAllCards({ customer_id }).unwrap().then((res) => {
            console.log('response =====>', res)
            if (res?.cards) {
                setCardDetail(res?.cards)
            }
        }).catch(error => {
            console.log('failed to fetch cards =======>', error)
            return ShowToast('Some problem occured')
        })
    }

    const onPressCard = () => {
        setModalVisible(!modalVisible)
    }

    const onChooseCard = (card) => {
        setState({
            card_holder: card.billing_details.name,
            card_number: card.card.last4,
            card_expiry: `0${card.card.exp_month}/${card.card.exp_year.toString().substring(2, 4)}`,
            card_methodId: card.id
        })
        setModalVisible(!modalVisible)
    }

    const onPayment = async () => {
        if (!state.card_holder) {
            return ShowToast('Please enter the card details')
        }
        else if (!debitCard) {
            return ShowToast('Please select the debit card')
        } else {
            const data = {
                amount: total,
                customerId: customer_id,
                paymentMethodId: state.card_methodId,
                product: productData,
                grandTotal: total
            }
            await payment(data).unwrap().then(async (res) => {
                console.log('response of payment api =====>', res)
                if (res.clientSecret) {
                    // return setReviewVisible(!reviewVisible)
                    await dispatch(removeFromCart())
                    navigation.navigate('explore1')
                    return ShowToast('Payment successfull')
                }
            }).catch((error) => {
                console.log('failed to purchase product =========>', error)
                return ShowToast('Some problem occured')
            })
        }
    }

    // const onGiveReview = async () => {
    //     alert('working in progress')
    //     const data = {
    //         productID: '',
    //         stars: rating
    //     }
    //     await addReview().unwrap().then((res) => {

    //     }).catch((error) => {
    //         console.log('error giving review ======>',error)
    //         return ShowToast('Some problem occured')
    //     })
    // }

    const renderCardList = () => {
        return (
            <Modal
                animationInTiming={500}
                animationOutTiming={500}
                animationIn={'slideInUp'}
                animationOut={'slideOutDown'}
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(!modalVisible)}
                style={{ margin: 0 }}
            >
                <View style={styles.modalContainer}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {cardLoading ?
                            <Loader size={'large'} />
                            :
                            cardDetail?.length < 1 ?
                                <Text style={styles.message}>No cards in your wallet</Text>
                                :
                                cardDetail?.map((item) => {
                                    return (
                                        <Card
                                            onCardPress={() => onChooseCard(item)}
                                            type={item.card.brand}
                                            cardNumber={item.card.last4}
                                            cardHolder={item.billing_details.name}
                                            expiry={`0${item.card.exp_month}/${item.card.exp_year.toString().substring(2, 4)}`}
                                        />
                                    )
                                })}
                    </ScrollView>
                </View>
            </Modal>
        )
    }

  
    return (
        <Container>
            <Header leftArrow={true} headerText={'Payment'} />
            <View style={styles.paymentView}>
                <View style={styles.paymentCard}>
                    <Text style={styles.title}>Choose a Payment method</Text>
                    <Checkbox onSelectCard={() => onPressCard()} text={'Select Debit Card'} style={{ marginTop: responsiveHeight(2) }} />
                    <View style={styles.inputWrapper}>
                        <CardInput
                            placeholder={'Card Holder'}
                            value={state.card_holder}
                            label={'Card Holder First Name and Last Name'}
                            onChangeText={(text) => onChangeValue('card_holder', text)}
                        />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <CardInput
                                placeholder={'Last Digits'}
                                value={state.card_number}
                                length={4}
                                label={'Card Number'}
                                style={{ width: responsiveWidth(40) }}
                                onChangeText={(text) => onChangeValue('card_number', text)}
                            />
                            <CardInput
                                placeholder={'MM/YYYY'}
                                value={state.card_expiry}
                                length={16}
                                style={{ width: responsiveWidth(40) }}
                                label={'Expiration Number'}
                                onChangeText={(text) => onChangeValue('card_expiry', text)}
                            />
                            {/* <CardInput
                                placeholder={'***'}
                                value={state.card_cvc}
                                length={3}
                                secureTextEntry={true}
                                style={{ width: responsiveWidth(40) }}
                                label={'CVC Code'}
                                onChangeText={(text) => onChangeValue('card_cvc', text)}
                            /> */}
                        </View>
                    </View>
                    <Checkbox onChecked={(checked) => setDebitCard(checked)} box={true} text={'Card Debit Card'} style={{ marginTop: responsiveHeight(2) }} cash={true} />
                    <Checkbox box={true} text={'Apple Pay'} apple_pay={true} style={{ marginTop: responsiveHeight(2) }} />
                    <Checkbox box={true} text={'Google Pay'} google_pay={true} style={{ marginTop: responsiveHeight(2) }} />
                    <Button onPress={() => onPayment()} loading={paymentLoading} color={Colors.secondary} buttonStyle={{ marginTop: responsiveHeight(6) }} title={'Pay Now'} />
                </View>
            </View>
            {renderCardList()}
            {/* {renderReviewModal()} */}
        </Container >
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
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        margin: 0,
        alignItems: 'center',
        paddingTop: responsiveHeight(4),
        width: responsiveWidth(100),
        height: responsiveHeight(60),
        backgroundColor: Colors.background,
        borderTopLeftRadius: 60,
        borderTopRightRadius: 60
    },
    message: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: responsiveFontSize(2.5)
    },
    reviewContainer: {
        backgroundColor: Colors.background,
        borderRadius: 10,
        margin: responsiveHeight(2),
        flex: 0.45,
    },
    subContainer: {
        paddingTop: responsiveHeight(3),
        alignItems: 'center',
    },
    heading: {
        color: Colors.white,
        fontWeight: 'bold',
        marginBottom: responsiveHeight(3),
        fontSize: responsiveFontSize(2.5)
    },
    desc: {
        textAlign: 'center',
        color: Colors.white,
        width: responsiveWidth(70),
        fontSize: responsiveFontSize(2)
    }
})