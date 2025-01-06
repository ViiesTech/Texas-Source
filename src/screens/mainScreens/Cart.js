import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import CartProduct from '../../componets/CartProduct'
import { responsiveFontSize, responsiveHeight } from '../../utils'
import ModalComponent from '../../componets/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/Slice'
import { Button } from '../../componets/Button'
import { Colors } from '../../assets/Utils/Colors'
import { useNavigation } from '@react-navigation/native'

const Cart = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [grandTotal, setGrandTotal] = useState(null)

    const { cart } = useSelector(state => state.persistedData)
    const dispatch = useDispatch()
    const navigation = useNavigation()

    // console.log('cartttt', cart)

    useEffect(() => {

        calculateTotal()

    }, [])

    const onQuantityIncrease = (type, index) => {
        if (type === 'add') {
            const updatedCart = cart.map(item => {
                if (
                    item.id ===
                    cart[index]?.id
                ) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                    };
                }
                return item;
            });
            dispatch(addToCart(updatedCart));
        } else {
            const updatedCart = cart.map(item => {
                if (
                    item.id ===
                    cart[index]?.id
                ) {
                    return {
                        ...item,
                        quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
                    };
                }
                return item;
            });
            dispatch(addToCart(updatedCart));
        }
    }

    const calculateTotal = () => {
        const total = cart?.reduce((total, item) => total + item.price * item.quantity, 0);
        setGrandTotal(total)
    }

    const totalQuantity = () => {
        return cart?.reduce((total, item) => total + item.quantity, 0)
    }

    const onRemoveProduct = async (product) => {
        const updatedProduct = cart?.filter((item) => item.id != product.id)
        await dispatch(addToCart(updatedProduct))
    }

    const onPlaceOrder = () => {
        const selectedInfo = cart?.map((item) => ({
            id: item.id,
            quantity: item.quantity,
            price: item.price,
            OwnerId: item.owner_id
        }))
        navigation.navigate('Payment', { product: selectedInfo, grandTotal: grandTotal })
    }

    return (
        <Container>
            <Header leftArrow={true} headerText={'Cart'} />
            <View style={styles.cartWrapper}>
                {cart?.length < 1 ?
                    <Text style={styles.message}>No Items Here</Text>
                    :
                    <>
                        {cart.map((item, index) => (
                            <CartProduct onCrossPress={() => onRemoveProduct(item)} onQuantityPress={(type) => onQuantityIncrease(type, index)} count={item.quantity} image={{ uri: item.image }} name={item.name} price={item.price} desc={item.desc} />
                        ))}
                        <ModalComponent onOrderPress={() => onPlaceOrder()} total_quantity={totalQuantity()} totalPrice={grandTotal} cartConfirmation={true} backdropPress={() => setModalVisible(!modalVisible)} isModalVisible={modalVisible} />
                        <Button onPress={() => setModalVisible(!modalVisible)} title={'Buy Now'} color={Colors.secondary} buttonStyle={{ marginTop: responsiveHeight(5) }} />
                    </>
                }

            </View>
        </Container>
    )
}

export default Cart

const styles = StyleSheet.create({
    cartWrapper: {
        padding: responsiveHeight(2)
    },
    message: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: responsiveHeight(5),
        fontSize: responsiveFontSize(2.2)
    }
})