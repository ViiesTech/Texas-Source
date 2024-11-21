import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import CartProduct from '../../componets/CartProduct'
import { responsiveHeight } from '../../utils'
import ModalComponent from '../../componets/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../../redux/Slice'

const Cart = () => {
    const [modalVisible, setModalVisible] = useState(false)

    const { cart } = useSelector(state => state.persistedData)
    const dispatch = useDispatch()

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

    return (
        <Container>
            <Header leftArrow={true} headerText={'Cart'} />
            <View style={styles.cartWrapper}>
                {cart.map((item, index) => (
                    <CartProduct onQuantityPress={(type) => onQuantityIncrease(type, index)} onCardPress={() => setModalVisible(!modalVisible)} count={item.quantity} image={{ uri: item.image }} name={item.name} price={item.price} desc={item.desc} />
                ))}
                <ModalComponent cartConfirmation={true} backdropPress={() => setModalVisible(!modalVisible)} isModalVisible={modalVisible} />
            </View>
        </Container>
    )
}

export default Cart

const styles = StyleSheet.create({
    cartWrapper: {
        padding: responsiveHeight(2)
    }
})