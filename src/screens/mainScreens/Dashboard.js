import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { orders, responsiveFontSize, responsiveHeight } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import Option from 'react-native-vector-icons/Ionicons'
import Clock from 'react-native-vector-icons/AntDesign'
import { useGetOwnerOrdersMutation } from '../../redux/Services'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import OrdersCard from '../../componets/OrdersCard'
import Loader from '../../componets/Loader'

const Dashboard = () => {
    const [ownerOrders, setOwnerOrders] = useState([])
    const [getOwnerOrders, { isLoading }] = useGetOwnerOrdersMutation()


    useEffect(() => {

        fetchOwnerOrders()

    }, [])

    const fetchOwnerOrders = async () => {
        await getOwnerOrders().unwrap().then((res) => {
            console.log('response =====>', res)
            setOwnerOrders(res)
        }).catch((error) => {
            console.log('failed to get user orders =======>', error)
            return ShowToast('Some problem occured')
        })
    }


    return (
        <Container>
            <Header leftArrow={true} headerText={'Dashboard'} />
            <ScrollView contentContainerStyle={styles.subContainer}>
                <View style={styles.totalEarningView}>
                    <Text style={styles.heading}>Total Earning</Text>
                    <Text style={styles.price}>$209.21</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: responsiveHeight(4) }}>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Option
                                name={'options-outline'}
                                color={Colors.black}
                                size={23}
                            />
                            <Text style={styles.text}>Lorem ipsum</Text>
                        </View>
                        <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                            <Clock
                                name={'clockcircle'}
                                color={Colors.black}
                                size={23}
                            />
                            <Text style={styles.text}>Lorem ipsum</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingTop: responsiveHeight(4) }}>

                    {/* {isLoading ?
                        <Loader size={'large'} />
                        :
                        ownerOrders?.length < 1 ?
                            <Text style={styles.message}>No Orders Here...</Text>
                            :
                            ownerOrders.map((item) => (
                                <OrdersCard
                                    owner={true}
                                    price={item?.price}
                                    title={item?.title}
                                    date={item?.date}
                                />
                            ))} */}
                </View>
            </ScrollView>
        </Container>
    )
}

export default Dashboard;

const styles = StyleSheet.create({
    subContainer: {
        padding: responsiveHeight(2)
    },
    totalEarningView: {
        borderRadius: 15,
        padding: responsiveHeight(3.5),
        backgroundColor: Colors.white
    },
    heading: {
        textAlign: 'center',
        color: Colors.black,
        marginBottom: responsiveHeight(1),
        fontSize: responsiveFontSize(2)
    },
    price: {
        textAlign: 'center',
        color: Colors.black,
        fontWeight: 'bold',
        fontSize: responsiveFontSize(2.5)
    },
    text: {
        color: Colors.black,
        fontSize: responsiveFontSize(1.9)
    }
})