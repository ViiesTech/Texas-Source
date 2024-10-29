import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { responsiveHeight } from '../utils'
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
                padding: 10,
                flex: 1
            }, props.style]}>
            <Image source={props.pic} style={{ width: '100%' }} />
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: 5,
                }}>
                <Text style={{ color: 'black', fontWeight: 'bold' }}>{props.title}</Text>
                <View>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>{props.price}</Text>
                   {props?.icons &&
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: responsiveHeight(0.5) }}>
                        <Icon
                            name={'delete'}
                            color={Colors.black}
                            size={15}
                        />
                        <Icon
                            name={'edit'}
                            color={Colors.black}
                            size={15}
                        />
                    </View>
                    } 
                </View>

            </View>
        </TouchableOpacity>
    )
}

export default ProductCard

const styles = StyleSheet.create({})