import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../assets/Images/Index'
import { Colors } from '../../assets/Utils/Colors'
import { Input } from '../../componets/Input'
import { responsiveFontSize, responsiveHeight } from '../../utils'
import { Button } from '../../componets/Button'
import { useForgetPasswordMutation } from '../../redux/Services'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { useNavigation } from '@react-navigation/native'

const ForgetPassword = () => {
    const [email, setEmail] = useState('')

    const [forgetPassword, { isLoading }] = useForgetPasswordMutation()

    const navigation = useNavigation()

    const onSendEmail = async () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!email) {
            return ShowToast('Please enter your email')
        } else if (!emailRegex.test(email)) {
            return ShowToast('Please enter valid email')
        } else {
            const data = {
                email: email
            }
            await forgetPassword(data).unwrap().then((res) => {
                if (res.success) {
                    navigation.navigate('emailVerify', { OTP: res?.OTP, email: email, id: res?.id })
                    return ShowToast('OTP Sent Successfully')
                } else {
                    return ShowToast(res.message)
                }
            }).catch((error) => {
                console.log('forget password api error ===============>', error)
                return ShowToast('Some problem occured')
            })
        }
    }


    return (
        <ImageBackground style={{ flex: 1 }} source={Images.background}>
            <ImageBackground style={{ flex: 1 }} source={Images.layer}>
                <View style={{ alignItems: 'center', padding: 30 }}>
                    <Image source={Images.logo2} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.backgroundStyle}>
                    <Text style={styles.boldText}>Reset Your</Text>
                    <Text style={styles.lightText}>Password</Text>
                    <Text style={styles.desc}>Enter your email address, and we’ll send you instructions to reset your password.</Text>
                    <Input
                        placeHolder={'Email'}
                        value={email}
                        keyboardType={'email-address'}
                        style={{ marginTop: responsiveHeight(6) }}
                        onChangeText={(text) => setEmail(text)}
                    />
                    <Button
                        color={Colors.secondary}
                        title={'Send Email'}
                        loading={isLoading}
                        onPress={() => onSendEmail()}
                        buttonStyle={{ marginTop: responsiveHeight(4) }}
                    />
                </ScrollView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    backgroundStyle: {
        backgroundColor: Colors.background,
        width: '100%',
        flex: 1,
        padding: 40,
        borderTopEndRadius: 70,
        borderTopLeftRadius: 70,
    },
    boldText: {
        color: Colors.white,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: responsiveHeight(3),
        fontSize: responsiveFontSize(4.5)
    },
    lightText: {
        fontSize: responsiveFontSize(4.5),
        marginBottom: responsiveHeight(3),
        textAlign: 'center',
        fontWeight: 'light',
        color: Colors.white
    },
    desc: {
        color: Colors.white,
        fontSize: responsiveFontSize(1.9),
        textAlign: 'center',
    }
})