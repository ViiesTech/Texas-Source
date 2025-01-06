import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../assets/Utils/Colors'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils'
import { Images } from '../assets/Images/Index'

const HistoryCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <Image source={Images.image1} style={styles.imageStyle} />
                <View style={styles.textContainer}>
                    <Text style={styles.name}>Company Name</Text>
                    <View style={{ alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', width: responsiveWidth(55) }}>
                        <Text style={styles.desc}>It is a long established fact that a reader will be distracted.</Text>
                        <Text style={styles.date}>Date:20-4-2016</Text>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.price}>€25.00</Text>
            </View>
        </View>
    )
}

export default HistoryCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: responsiveWidth(87),
        paddingHorizontal: responsiveHeight(1),
        paddingVertical: responsiveHeight(2),
        borderRadius: 10,
    },
    subContainer: {
        flexDirection: 'row',
        gap: 5
    },
    imageStyle: {
        height: responsiveHeight(7),
        borderRadius: 10,
        width: responsiveHeight(7)
    },
    textContainer: {
        marginLeft: responsiveHeight(0.5)
    },
    name: {
        color: Colors.black,
        fontSize: responsiveFontSize(1.9)
    },
    desc: {
        color: Colors.black,
        width: responsiveWidth(45),
        fontSize: responsiveFontSize(1.5),
        marginTop: responsiveHeight(0.5)
    },
    price: {
        color: Colors.black,
        textAlign: 'right',
        fontSize: responsiveFontSize(1.8)
    },
    date: {
        color: Colors.textColor,
        marginTop: responsiveHeight(2.7),
        fontSize: responsiveFontSize(1.5)
    }
})