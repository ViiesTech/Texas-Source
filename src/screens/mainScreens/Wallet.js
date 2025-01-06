import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
import Card from '../../componets/Card'
import { Colors } from '../../assets/Utils/Colors'
import Plus from 'react-native-vector-icons/AntDesign'
import HistoryCard from '../../componets/HistoryCard'
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from '../../componets/Button'
import { useAttachPaymentMutation, useCreateCustomerMutation, useCreateSetupIntentMutation, useGetAllCardsMutation } from '../../redux/Services'
import { useSelector } from 'react-redux'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { CardField, confirmSetupIntent } from '@stripe/stripe-react-native'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../componets/Loader'

const Wallet = () => {
  const [cardDetails, setCardDetails] = useState([])
  const [cardFields, setCardFields] = useState(null)

  const [createCustomer] = useCreateCustomerMutation()
  const [createSetupIntent, { isLoading }] = useCreateSetupIntentMutation()
  const [getAllCards, { isLoading: cardLoading }] = useGetAllCardsMutation()
  const [attachPayment] = useAttachPaymentMutation()

  const { user, customer_id } = useSelector(state => state.persistedData)
  // console.log('email', cardDetails)

  const navigation = useNavigation()

  const sheetRef = useRef()

  useEffect(() => {

    if (customer_id) {
      fetchAllCards()
    }

  }, [])

  const fetchAllCards = async () => {
    await getAllCards({ customer_id }).unwrap().then((res) => {
      console.log('response =====>', res)
      if (res?.cards) {
        setCardDetails(res?.cards)
      }
    }).catch(error => {
      console.log('failed to fetch cards =======>', error)
      // return ShowToast('Some problem occured')
    })
  }

  const onOpenCardSheet = async () => {
    sheetRef?.current.open()
  }

  const renderPaymentHistory = () => {
    return (
      <View style={styles.containerStyle}>
        <View style={styles.paymentContainer}>
          <Text style={styles.heading}>Payment</Text>
          <Text style={styles.heading}>view All</Text>
        </View>
        <View style={styles.historyContainer}>
          <HistoryCard />
        </View>
      </View>
    )
  }


  const onAddCard = async () => {
    if (!cardFields?.complete) {
      sheetRef?.current.close()
      return ShowToast('Please fill in complete card details');
    } else {
      // alert('hhhh')
      await createCustomer({ email: user?.email }).unwrap().then(async res => {
        console.log('response of creating customer ======>', res)
        if (res?.customerId) {
          const customerId = res.customerId
          await createSetupIntent({ customerId: customerId }).unwrap().then(async (res) => {
            // console.log('client secret key =========>', res)
            if (res?.clientSecret) {
              const { error, setupIntent } = await confirmSetupIntent(res.clientSecret, {
                paymentMethodType: 'Card',
                paymentMethodData: {
                  billingDetails: { name: user?.name },
                },
              });
              if (error) {
                console.error('Setup Intent Confirmation Failed:', error);
                sheetRef?.current.close()
                return ShowToast('Failed to add card. Try again.');
              } else if (setupIntent?.status === 'Succeeded') {
                console.log('Card added successfully:', setupIntent);
                const methodId = setupIntent?.paymentMethodId
                await attachPayment({ customerId, methodId }).unwrap().then((res) => {
                  console.log('response', res)
                  if (res?.success) {
                    sheetRef?.current.close()
                    navigation.goBack()
                    return ShowToast('Card added successfully!');
                  } else {
                    console.log('success false condition of attach payment', res.message)
                  }
                }).catch((error) => {
                  console.log('failed to attach payment method', error)
                })
              }
            }
          }).catch((error) => {
            console.log('failed to create setup intent', error)
          })
        }
      }).catch((error) => {
        console.log('failed to create customer', error)
        sheetRef?.current.close()
        return ShowToast('Some problem occured')
      })
    }
  }

  return (
    <Container>
      <Header leftArrow={true} headerText={'Wallet'} />
      <ScrollView contentContainerStyle={styles.subContainer}>
        {cardLoading ?
          <Loader size={'large'} />
          :
          cardDetails?.length < 1 ?
            <Text style={styles.message}>No cards in your wallet</Text>
            :
            cardDetails?.map((item) => {
              return (
                <Card
                  type={item.card.brand}
                  cardNumber={item.card.last4}
                  cardHolder={item.billing_details.name}
                  expiry={`0${item.card.exp_month}/${item.card.exp_year.toString().substring(2, 4)}`}
                />
              )
            })}
        {/* {renderPaymentHistory()} */}
      </ScrollView>
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onOpenCardSheet()}>
        <Plus name={'plus'} color={Colors.secondary} size={30} />
      </TouchableOpacity>
      <RBSheet
        ref={sheetRef}
        closeOnPressBack
        draggable
        height={responsiveHeight(53)}
        openDuration={250}
        customStyles={{
          container: {
            backgroundColor: Colors.background,
            paddingTop: responsiveHeight(2),
          },
        }}>
        <ScrollView contentContainerStyle={styles.contentStyle}>
          <Text style={[styles.heading, { fontSize: responsiveHeight(2.5), textAlign: 'center', marginBottom: responsiveHeight(2.3) }]}>Adding A Card</Text>
          <Text style={styles.desc}>Securely add your card details to enable seamless transactions and enjoy a hassle-free payment experience.</Text>
          <CardField
            postalCodeEnabled={false}
            placeholders={{
              number: '4242 4242 4242 4242',
            }}
            cardStyle={styles.cardStyle}
            onCardChange={(details) => {
              console.log(details)
              setCardFields(details)
            }}
            style={styles.cardField}
          />
          <Button
            buttonStyle={{ width: responsiveWidth(80) }}
            loading={isLoading} color={Colors.secondary}
            title={'Add Card'} onPress={() => onAddCard()}
          />
        </ScrollView>
      </RBSheet>
    </Container>
  )
}

export default Wallet

const styles = StyleSheet.create({
  subContainer: {
    alignItems: 'center',
    paddingTop: responsiveHeight(4)
  },
  buttonStyle: {
    position: 'absolute',
    backgroundColor: Colors.background,
    borderWidth: 1,
    bottom: responsiveHeight(7),
    right: responsiveHeight(5),
    borderColor: Colors.secondary,
    height: responsiveHeight(7),
    width: responsiveHeight(7),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100
  },
  containerStyle: {
    paddingTop: responsiveHeight(4),
    width: responsiveWidth(87),
  },
  paymentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  heading: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: responsiveHeight(2)
  },
  historyContainer: {
    paddingTop: responsiveHeight(4)
  },
  contentStyle: {
    paddingBottom: responsiveHeight(10),
    paddingTop: responsiveHeight(3),
    alignItems: 'center',
  },
  inputStyle: {
    borderWidth: 1,
    width: responsiveWidth(85),
    marginBottom: responsiveHeight(4)
  },
  cardField: {
    height: responsiveHeight(6),
    width: responsiveWidth(80),
    marginVertical: responsiveHeight(4),
    borderWidth: 1,
    borderRadius: 15,
  },
  cardStyle: {
    borderColor: 'white',
    borderRadius: 8,
    fontSize: responsiveFontSize(2),
    placeholderColor: 'black',
    textColor: 'black',
  },
  desc: {
    color: Colors.white,
    width: responsiveWidth(90),
    fontSize: responsiveFontSize(2),
    textAlign: 'center'
  },
  message: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2)
  }
})