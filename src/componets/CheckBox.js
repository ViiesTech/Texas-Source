import { StyleSheet, Text, View } from 'react-native'
import BouncyCheckbox from "react-native-bouncy-checkbox";
import React from 'react'
import { Colors } from '../assets/Utils/Colors';
import { responsiveFontSize, responsiveHeight } from '../utils';
import Card from 'react-native-vector-icons/AntDesign'
import Cash from 'react-native-vector-icons/MaterialCommunityIcons'
import Pay from 'react-native-vector-icons/FontAwesome5'

const Checkbox = (props) => {
    return (
        <View style={[styles.wrapper, props.style]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                <View style={styles.boxBorder}>
                    <BouncyCheckbox
                        size={16}
                        fillColor={Colors.secondary}
                        unFillColor="transparent"
                        disableBuiltInState
                        style={{ marginLeft: responsiveHeight(1.8) }}
                        innerIconStyle={{ display: 'none' }}
                        onPress={(isChecked) => { console.log(isChecked) }}
                    />
                </View>
                <Text style={styles.label}>{props?.text}</Text>
            </View>
            {props.cash
                ?
                <Cash
                    name={'cash-check'}
                    color={Colors.secondary}
                    size={25}
                />
                :
                props.apple_pay ?
                    <Pay
                        name={'cc-apple-pay'}
                        color={Colors.secondary}
                        size={25}
                    />
                    :
                    props?.google_pay ?
                        <Pay
                            name={'google-pay'}
                            color={Colors.secondary}
                            size={25}
                        />
                        :
                        <Card
                            name={'creditcard'}
                            color={Colors.secondary}
                            size={25}
                        />
            }
        </View>
    )
}

export default Checkbox

const styles = StyleSheet.create({
    wrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boxBorder: {
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: responsiveHeight(3),
        width: responsiveHeight(3),
        borderColor: Colors.black,
        borderRadius: 100
    },
    label: {
        color: Colors.black,
        fontSize: responsiveFontSize(1.8)
    }
})