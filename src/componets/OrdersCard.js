import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Utils/Colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import { Images } from '../assets/Images/Index'

const OrdersCard = (props) => {
  return (
    <View style={styles.orderView}>
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <Image
          source={Images.image4}
          style={styles.imageStyle}
        />
        <View style={{ paddingTop: responsiveHeight(1.4) }}>
          <Text style={styles.titleName}>{props?.title}</Text>
          <Text style={styles.price}>€{props?.price}</Text>
        </View>
      </View>
      <View>
        <View style={[styles.statusView, { backgroundColor: props?.status === 'cancel' ? 'red' : props?.status === 'shipping' ? 'yellow' : props?.status === 'pending' ? '#5fe3f5' : props?.status === 'accepted' && '#15eb8b' }]}>
          <Text style={styles.statusText}>{props?.status}</Text>
        </View>
        <Text style={styles.date}>{props?.date}</Text>
      </View>
    </View>
  )
}

export default OrdersCard

const styles = StyleSheet.create({
  orderView: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    marginBottom: responsiveHeight(2),
    justifyContent: 'space-between',
    padding: responsiveHeight(1.5),
    borderRadius: 15
  },
  imageStyle: {
    borderRadius: 10,
    height: responsiveHeight(10),
    width: responsiveHeight(10)
  },
  titleName: {
    color: Colors.black,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(1),
    fontSize: responsiveFontSize(2)
  },
  price: {
    color: Colors.black,
    fontSize: responsiveFontSize(1.8)
  },
  statusView: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    marginTop: responsiveHeight(1.2),
    height: responsiveWidth(6),
    width: responsiveWidth(25)
  },
  statusText: {
    color: Colors.black,
    fontSize: responsiveFontSize(1.7)
  },
  date: {
    color: Colors.black,
    marginTop: responsiveHeight(1),
    marginRight: responsiveHeight(2),
    textAlign: 'right'
  }
})