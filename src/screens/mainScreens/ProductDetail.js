import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../componets/Container'
import { Images } from '../../assets/Images/Index'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import SVGIcon from '../../componets/SVGIcon'
import icons from '../../assets/icons'
import { Button } from '../../componets/Button'

const ProductDetail = () => {
    
    return (
        <Container>
            <Image
                source={Images.detail}
                resizeMode='cover'
                style={styles.imageStyle}
            />
            <View style={styles.subContainer}>
                <Text style={styles.productText}>Product Name</Text>
                <View style={styles.reviewGroup}>
                    <SVGIcon
                        image={icons.star}
                    />
                    <Text style={styles.ratingText}>5.0  <Text style={[styles.ratingText, { fontWeight: '100' }]}>(1120 views)</Text></Text>
                </View>
                <Text style={[styles.ratingText, { marginTop: responsiveHeight(2.5) }]}>description of machine about its working
                    and its functions. How it is useful for
                    humans . Its perfections, benefits and
                    many other things.</Text>
                <View style={styles.quantityView}>
                    <View style={styles.iconRow}>
                        <SVGIcon
                            image={icons.add}
                        />
                        <Text style={[styles.ratingText, { fontWeight: 'bold', fontSize: responsiveFontSize(2.3) }]}>2</Text>
                        <SVGIcon
                            image={icons.minus}
                        />
                    </View>
                </View>
                <View style={styles.endContainer}>
                    <Text style={styles.price}>$137.98</Text>
                    <Button
                        color={Colors.white}
                        title={'Add To Cart'}
                        textStyle={{ color: Colors.black }}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
            </View>
        </Container>
    )
}

export default ProductDetail

const styles = StyleSheet.create({
    imageStyle: {
        height: responsiveHeight(47),
        width: responsiveWidth(100)
    },
    subContainer: {
        padding: responsiveHeight(3)
    },
    productText: {
        color: Colors.white,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.4)
    },
    reviewGroup: {
        paddingTop: responsiveHeight(1),
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    ratingText: {
        color: Colors.white
    },
    quantityView: {
        height: responsiveHeight(20),
        justifyContent: 'center',
        position: 'relative'
    },
    iconRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    buttonStyle: {
        width: responsiveWidth(50)
    },
    endContainer: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: responsiveHeight(4)
    },
    price: {
        fontWeight: 'bold',
        color: Colors.white,
        fontSize: responsiveFontSize(3.3)
    },


})