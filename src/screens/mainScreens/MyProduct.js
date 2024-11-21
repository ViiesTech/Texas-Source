import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { responsiveFontSize, responsiveHeight } from '../../utils'
import ProductCard from '../../componets/ProductCard'
import { useDeleteProductMutation, useLazyMyProductsQuery } from '../../redux/Services'
import Loader from './../../componets/Loader';
import { Colors } from '../../assets/Utils/Colors'
import { Images } from '../../assets/Images/Index'
import { useSelector } from 'react-redux'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import SpinLoader from '../../componets/SpinLoader'
import { useNavigation } from '@react-navigation/native'


const MyProduct = () => {

    const [myProducts, { data, isLoading }] = useLazyMyProductsQuery()
    const [deleteProduct, { isLoading: deleteLoading }] = useDeleteProductMutation()
    const { baseUrl } = useSelector(state => state.persistedData)

    // console.log('api response', data?.myProducts)

    const navigation = useNavigation()

    useEffect(() => {

        myProducts()

    }, [deleteLoading])

    const renderMyProducts = () => {
        return (
            <FlatList
                data={data?.myProducts}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                ListEmptyComponent={listEmptyComponent}
                renderItem={renderItem}
            />
        )
    }

    const onEditProduct = (product) => {
        const updatedProduct = {
            ...product,
            productImage: product?.productImage.map(uri => `https://appsdemo.pro/Texas_Server/${uri}`)
        }
        navigation.navigate('AddProduct', { product: updatedProduct })
    }

    const onDeleteProduct = async (id) => {
        const data = {
            productId: id
        }
        await deleteProduct(data).unwrap().then((res) => {
            console.log('successfully deleted the product =====>', res)
        }).catch((error) => {
            console.log('error deleting product =========>', error)
            return ShowToast('Some problem occured')
        })
    }

    const renderItem = ({ item }) => {
        return (
            <ProductCard
                onEdit={() => onEditProduct(item)}
                onDelete={() => onDeleteProduct(item?._id)}
                price={item.productPrice}
                pic={item?.productImage ? { uri: `https://appsdemo.pro/Texas_Server/${item?.productImage[0]}` } : Images.dummy}
                title={item.productTitle}
                icons={true}
                style={{ marginHorizontal: responsiveHeight(0.5), marginBottom: responsiveHeight(4) }}
            />
        )
    }

    const listEmptyComponent = () => {
        return (
            isLoading ?
                <Loader size={'large'} color={Colors.secondary} />
                :
                <Text style={styles.messageStyle}>{'No Products here...'}</Text>
        )
    }

    return (
        <Container>
            <Header leftArrow={true} headerText={'My Product'} />
            <View style={styles.subContainer}>
                {renderMyProducts()}
            </View>
            <SpinLoader
                er handleSpinner={deleteLoading} />
        </Container>
    )
}

export default MyProduct

const styles = StyleSheet.create({
    subContainer: {
        padding: responsiveHeight(3)
    },
    messageStyle: {
        color: Colors.white,
        fontSize: responsiveFontSize(2.5),
        marginVertical: responsiveHeight(7),
        textAlign: 'center',
    }
})