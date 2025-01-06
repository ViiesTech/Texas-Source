import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '../assets/Utils/Colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth, statusData } from '../utils'
import Picker from './Picker'
import StarRating from 'react-native-star-rating-widget'

const OrdersCard = (props) => {
  const [status, setStatus] = useState('')
  return (
    <TouchableOpacity onPress={props?.onPress} style={[styles.orderView, props?.style]}>
      <View style={{ flexDirection: 'row', gap: 15 }}>
        <Image
          source={props.image}
          style={styles.imageStyle}
        />
        <View style={{ paddingTop: responsiveHeight(1.4) }}>
          <Text style={styles.titleName}>{props?.title}</Text>
          <Text style={styles.price}>€{props?.price}</Text>
        </View>
      </View>
      <View>
        {props?.owner ?
          <View style={{ zIndex: 999 }}>
            <Picker value={status} setValue={(val) => setStatus(val)} placeholderText={{ color: Colors.white, fontSize: responsiveFontSize(1.5) }} listStyle={{ backgroundColor: Colors.black, height: responsiveHeight(20), maxHeight: responsiveHeight(20) }} iconStyle={{ tintColor: Colors.white }} containerStyle={{ width: responsiveWidth(30) }} style={{ backgroundColor: Colors.black, borderWidth: 0 }} placeholder={'status'} items={statusData} />
          </View>
          :
          <View style={[styles.statusView, { backgroundColor: props?.status === 'cancel' ? 'red' : props?.status === 'neworder' ? 'yellow' : props?.status === 'pending' ? '#5fe3f5' : props?.status === 'accepted' && '#15eb8b' }]}>
            <Text style={styles.statusText}>{props?.status}</Text>
          </View>
        }
        <Text style={styles.date}>{props?.date}</Text>
        <View style={{ alignItems: 'flex-end', marginRight: responsiveHeight(1) }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{color: Colors.black,fontSize: responsiveFontSize(1.6)}}>{props?.rating.toFixed(1)}</Text>
            <StarRating starSize={16} maxStars={1} rating={props?.rating} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
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