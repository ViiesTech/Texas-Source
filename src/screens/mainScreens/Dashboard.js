import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { responsiveFontSize, responsiveHeight } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import Option from 'react-native-vector-icons/Ionicons'
import Clock from 'react-native-vector-icons/AntDesign'

const Dashboard = () => {
    return (
        <Container>
            <Header leftArrow={true} headerText={'Dashboard'} />
            <View style={styles.subContainer}>
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
            </View>
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