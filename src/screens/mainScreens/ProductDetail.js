import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../componets/Container'
import { Images } from '../../assets/Images/Index'
import { calculateAverageRating, responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import SVGIcon from '../../componets/SVGIcon'
import icons from '../../assets/icons'
import { Button } from '../../componets/Button'
import Swiper from 'react-native-swiper'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { addToCart } from '../../redux/Slice'

const ProductDetail = ({ route }) => {
    const [quantity, setQuantity] = useState(1)
    const product_detail = route?.params?.detail;
    const url = 'https://appsdemo.pro/Texas_Server/';

    const { cart } = useSelector(state => state.persistedData)
    console.log('detail ====>', cart)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const onQuantityPress = (type) => {
        if (type === 'add') {
            setQuantity(quantity + 1)
        } else {
            if (quantity > 0) {
                setQuantity(quantity - 1)
            }
        }
    }

    const onAddtoCart = async () => {
        const cartDetails = {
            id: product_detail?._id,
            name: product_detail?.productTitle,
            desc: product_detail?.productDescp,
            price: product_detail?.productPrice,
            quantity: quantity != 1 ? quantity : 1,
            image: `https://appsdemo.pro/Texas_Server/${product_detail?.productImage[0]}`,
        }
        const details = [...cart, cartDetails]
        // return console.log(details)
        const index = cart?.findIndex(item => item.id == product_detail?._id)
        if (cart[index]?.id == product_detail?._id) {
            const updatedCart = cart.map((item, i) => {
                if (i == index) {
                    return {
                        ...item,
                        quantity: quantity !== 1 ? quantity : item.quantity + 1,
                    };
                } else {
                    return item;
                }
            });
            await dispatch(addToCart(updatedCart));
            navigation.navigate('Cart')
        } else {
            await dispatch(addToCart(details))
            navigation.navigate('Cart')
        }
    }

    return (
        
        <Container>
            <ScrollView style={{flexGrow:1}}>
            <View style={styles.swipeWrapper}>
                <Swiper
                    loadMinimal
                    loadMinimalSize={3}
                    // loop={false}
                    paginationStyle={{ bottom: responsiveHeight(0) }}
                    horizontal={true}
                    activeDotColor={'white'}
                    dotColor='gray'
                // autoplay
                // autoplayTimeout={3}
                // autoplayDirection
                >
                    {product_detail?.productImage.map((item, i) => {
                        // return console.log(item)
                        return (
                            <Image
                                source={{ uri: url + item }}
                                resizeMode='cover'
                                style={styles.imageStyle}
                            />
                        )
                    })}
                </Swiper>
            </View>
            <View style={styles.subContainer}>
                <Text style={styles.productText}>{product_detail?.productTitle}</Text>
                <View style={styles.reviewGroup}>
                    <SVGIcon
                        image={icons.star}
                    />
                    <Text style={styles.ratingText}>{calculateAverageRating(product_detail?.AvaRating, product_detail?.TotalNumberOfRating)}<Text style={[styles.ratingText, { fontWeight: '100' }]}>  (1120 views)</Text></Text>
                </View>
                <Text style={[styles.ratingText, { marginTop: responsiveHeight(2.5) }]}>{product_detail?.productDescp}</Text>
                <View style={styles.quantityView}>
                    <View style={styles.iconRow}>
                        <TouchableOpacity onPress={() => onQuantityPress('add')}>
                            <SVGIcon
                                image={icons.add}
                            />
                        </TouchableOpacity>
                        <Text style={[styles.ratingText, { fontWeight: 'bold', fontSize: responsiveFontSize(2.3) }]}>{quantity}</Text>
                        <TouchableOpacity onPress={() => onQuantityPress('minus')}>
                            <SVGIcon
                                image={icons.minus}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.endContainer}>
                    <Text style={styles.price}>${product_detail?.productPrice}</Text>
                    <Button
                        color={Colors.white}
                        title={'Add To Cart'}
                        onPress={() => onAddtoCart()}
                        textStyle={{ color: Colors.black }}
                        buttonStyle={styles.buttonStyle}
                    />
                </View>
            </View>
            </ScrollView>
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
        height: responsiveHeight(23),
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
    swipeWrapper: {
        height: responsiveHeight(48),
    }

})