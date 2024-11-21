import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from '../utils'
import { Colors } from '../assets/Utils/Colors'

const CardInput = (props) => {
    return (
        <View style={styles.inputWrapper}>
            <Text style={styles.heading}>{props?.label}</Text>
            <TextInput
                placeholder={props?.placeholder}
                value={props?.value}
                onChangeText={props?.onChangeText}
                maxLength={props?.length}
                keyboardType={props?.keyboardType}
                secureTextEntry={props?.secureTextEntry}
                placeholderTextColor={Colors.black}
                style={[styles.inputStyle, props?.style]}
            />
        </View>
    )
}

export default CardInput

const styles = StyleSheet.create({
    inputWrapper: {
        marginBottom: responsiveHeight(2.5)
    },
    heading: {
        color: Colors.black,
        fontSize: responsiveFontSize(1.8),
        marginBottom: responsiveHeight(1.5)
    },
    inputStyle: {
        backgroundColor: 'lightgray',
        color: Colors.black,
        paddingHorizontal: responsiveHeight(2),
        borderRadius: 10,
    }
})