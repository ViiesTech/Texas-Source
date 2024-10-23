import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Images } from '../../assets/Images/Index'
import { responsiveFontSize, responsiveHeight } from '../../utils'
import { Input } from '../../componets/Input'
import { Button } from '../../componets/Button'
import { Colors } from './../../assets/Utils/Colors';
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { useResetPasswordMutation } from '../../redux/Services'
import { useNavigation } from '@react-navigation/native'

const ChangePassword = ({ route }) => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [resetPassword, { isLoading }] = useResetPasswordMutation()

    const screenType = route?.params?.type
    const id = route?.params?.user_id

    const navigation = useNavigation()


    const onResetPassword = async () => {
        if (!newPassword) {
            return ShowToast('Please enter your new password')
        } else if (newPassword.length < 6) {
            return ShowToast('Password is too short')
        } else if (newPassword != confirmPassword) {
            return ShowToast('Password does not match')
        } else {
            if (screenType === 'reset') {
                const data = {
                    id: id,
                    password: newPassword
                }
                await resetPassword(data).unwrap().then((res) => {
                    if (res.success) {
                        navigation.navigate('login')
                        return ShowToast(res.message)
                    } else {
                        return ShowToast(res.message)
                    }
                }).catch((error) => {
                    console.log('reset password api error ========>', error)
                    return ShowToast('Some problem occured')
                })
            }
        }
    }

    return (
        <ImageBackground style={{ flex: 1 }} source={Images.background}>
            <ImageBackground style={{ flex: 1 }} source={Images.layer}>
                <View style={{ alignItems: 'center', padding: 30 }}>
                    <Image source={Images.logo2} />
                </View>
                <ScrollView contentContainerStyle={styles.background}>
                    <Text style={styles.boldText}>Create A New</Text>
                    <Text style={styles.lightText}>Password</Text>
                    <Text style={styles.desc}>Create a new password to secure your account. Confirm it below to continue.</Text>
                    <Input
                        placeHolder={'New Password'}
                        value={newPassword}
                        secureTextEntry={true}
                        onChangeText={text => setNewPassword(text)}
                        style={{ marginTop: responsiveHeight(5), marginBottom: responsiveHeight(3) }}
                    />
                    <Input
                        placeHolder={'Confirm Password'}
                        value={confirmPassword}
                        secureTextEntry={true}
                        onChangeText={text => setConfirmPassword(text)}
                        style={{ marginBottom: responsiveHeight(4) }}
                    />
                    <Button
                        color={Colors.secondary}
                        loading={isLoading}
                        onPress={() => onResetPassword()}
                        title={'Reset Password'}
                    />
                </ScrollView>
            </ImageBackground>
        </ImageBackground>
    )
}

export default ChangePassword

const styles = StyleSheet.create({
    background: {
        backgroundColor: Colors.background,
        width: '100%',
        flexGrow: 1,
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