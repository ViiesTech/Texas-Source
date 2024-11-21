import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { responsiveHeight, responsiveWidth } from '../utils'
import { Colors } from '../assets/Utils/Colors'

const ProductCard = (props) => {
    return (
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={props.onPress}
            style={[{
                backgroundColor: 'white',
                borderRadius: 10,
                alignSelf: 'center',
                width: responsiveWidth(40),
                padding: responsiveHeight(1),
                // flex: 1
            }, props.style]}>
            <Image source={props.pic} style={{ width: responsiveWidth(36), height: responsiveHeight(20) }} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                }}>
                <Text style={{ color: 'black', fontWeight: 'bold', width: responsiveWidth(25) }}>{props.title}</Text>
                {/* <View> */}
                <Text style={{ color: 'black', fontWeight: 'bold' }}>${props.price}</Text>
                {/* </View> */}
            </View>
            {props?.icons &&
                <View style={{ marginTop: responsiveHeight(0.5), alignItems: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', gap: 10 }}>
                        <TouchableOpacity onPress={props?.onDelete}>
                            <Icon
                                name={'delete'}
                                color={Colors.black}
                                size={15}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={props?.onEdit}>
                            <Icon
                                name={'edit'}
                                color={Colors.black}
                                size={15}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({})