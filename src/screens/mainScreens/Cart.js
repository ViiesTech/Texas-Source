import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import CartProduct from '../../componets/CartProduct'
import { cartItems, responsiveHeight } from '../../utils'
import ModalComponent from '../../componets/Modal'

const Cart = () => {
    const [modalVisible, setModalVisible] = useState(false)

    return (
        <Container>
            <Header leftArrow={true} headerText={'Cart'} />
            <View style={styles.cartWrapper}>
                {cartItems.map((item) => (
                    <CartProduct onCardPress={() => setModalVisible(!modalVisible)} image={item.image} name={item.name} price={item.price} desc={item.desc} />
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