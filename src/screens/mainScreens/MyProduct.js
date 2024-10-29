import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { exploreCard, responsiveHeight } from '../../utils'
import ProductCard from '../../componets/ProductCard'

const renderMyProducts = () => {
    return (
        <FlatList
            data={exploreCard}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={renderItem}
        />
    )
}

const renderItem = ({ item }) => {
    return (
        <ProductCard
            price={item.price}
            pic={item.pic}
            title={item.title}
            icons={true}
            style={{ marginHorizontal: responsiveHeight(0.5), marginBottom: responsiveHeight(4) }}
        />
    )
}

const MyProduct = () => {
    return (
        <Container>
            <Header leftArrow={true} headerText={'My Product'} />
            <View style={styles.subContainer}>
                {renderMyProducts()}
            </View>
        </Container>
    )
}

export default MyProduct

const styles = StyleSheet.create({
    subContainer: {
        padding: responsiveHeight(3)
    }
})