import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Utils/Colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import Icon from 'react-native-vector-icons/AntDesign'

const CartProduct = ({ name, image, desc, price, onCardPress, count, onQuantityPress }) => {
    return (
        <TouchableOpacity style={styles.cardStyle} onPress={onCardPress}>
            <View style={{ flexDirection: 'row', gap: responsiveHeight(2) }}>
                <Image
                    source={image}
                    style={styles.imageStyle}
                />
                <View style={styles.textWrapper}>
                    <Text style={styles.productText}>{name}</Text>
                    <Text style={styles.desc}>{desc}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Text style={styles.price}>€{price}</Text>
                        <View style={{ flexDirection: 'row', gap: responsiveHeight(1.3) }}>
                            <TouchableOpacity style={styles.incrementView} onPress={() => onQuantityPress('add')}>
                                <Icon
                                    name={'plus'}
                                    color={Colors.white}
                                    size={20}
                                />
                            </TouchableOpacity>
                            <Text style={styles.count}>{count}</Text>
                            <TouchableOpacity style={styles.incrementView} onPress={() => onQuantityPress('minus')}>
                                <Icon
                                    name={'minus'}
                                    color={Colors.white}
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.checkView}>
                <Icon
                    name={'check'}
                    color={Colors.white}
                    size={20}
                />
            </View>
        </TouchableOpacity>
    )
}

export default CartProduct

const styles = StyleSheet.create({
    cardStyle: {
        backgroundColor: Colors.white,
        marginBottom: responsiveHeight(2),
        borderRadius: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: responsiveHeight(1.5)
    },
    imageStyle: {
        borderRadius: 20,
        height: responsiveHeight(12),
        width: responsiveWidth(24)
    },
    textWrapper: {
        paddingTop: responsiveHeight(1.5)
    },
    productText: {
        color: Colors.black,
        fontSize: responsiveFontSize(2),
        marginBottom: responsiveHeight(0.5),
        fontWeight: 'bold'
    },
    desc: {
        color: Colors.textColor,
        width: responsiveWidth(56),
        marginBottom: responsiveHeight(0.5),
    },
    price: {
        color: Colors.black,
        fontWeight: 'bold',
    },
    incrementView: {
        backgroundColor: Colors.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        borderRadius: 100,
        width: 25
    },
    count: {
        color: Colors.black,
        fontWeight: 'bold'
    },
    checkView: {
        backgroundColor: 'gray',
        height: responsiveHeight(3),
        borderRadius: 7,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: -responsiveHeight(5),
        width: responsiveHeight(3),
    }
})