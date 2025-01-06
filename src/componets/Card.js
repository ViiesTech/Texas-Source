import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Utils/Colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import { Images } from '../assets/Images/Index'

const Card = ({ type, cardHolder, expiry, cardNumber, onCardPress }) => {
  return (
    <TouchableOpacity onPress={onCardPress} style={styles.cardContainer}>
      <Text style={styles.cardHolder}>{cardHolder}</Text>
      <Text style={styles.cardHolder}>{expiry}</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.cardHolder}>{cardNumber}</Text>
        <Image style={[styles.imageStyle, type === 'mastercard' && { height: responsiveHeight(4), width: responsiveHeight(6.5) }]} source={type === 'visa' ? Images.visa : type === 'mastercard' ? Images.mastercard : Images.american_express} />
      </View>
    </TouchableOpacity>
  )
}

export default Card

const styles = StyleSheet.create({
  cardContainer: {
    paddingHorizontal: responsiveHeight(3),
    marginBottom: responsiveHeight(4),
    paddingVertical: responsiveHeight(2),
    width: responsiveWidth(87),
    borderWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 15,
  },
  cardHolder: {
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(2),
    fontSize: responsiveFontSize(2.5)
  },
  imageStyle: {
    height: responsiveHeight(3),
    width: responsiveHeight(5.5),
    alignSelf: 'flex-end',
  }
})