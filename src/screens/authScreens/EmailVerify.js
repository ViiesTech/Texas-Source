import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../assets/Images/Index';
import { Button } from '../../componets/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { responsiveHeight } from '../../utils';
import { useForgetPasswordMutation, useVerifyOTPMutation } from '../../redux/Services';
import { ShowToast } from '../../GlobalFunctions/ShowToast';
import { useNavigation } from '@react-navigation/native';

const Signup = ({ route }) => {
  const OTP = route?.params?.OTP
  const email = route?.params?.email
  const id = route?.params?.id


  const CELL_COUNT = 4;
  const [code, setCode] = useState(OTP?.toString());
  const [timer, setTimer] = useState(60)
  const ref = useBlurOnFulfill({ code, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    code,
    setCode,
  });


  const [forgetPassword] = useForgetPasswordMutation();
  const [verifyOTP, { isLoading }] = useVerifyOTPMutation()

  const navigation = useNavigation()


  const startTimer = () => {
    let interval = setInterval(() => {
      setTimer(prevTimer => {
        const seconds = prevTimer > 0 && prevTimer - 1
        if (seconds === 0) {
          clearInterval(interval)
          setTimer(60)
        }
        return seconds
      })
    }, 1000)
    return () => clearInterval(interval)
  }

  const onResendCode = async () => {
    startTimer()
    setCode('')
    const data = {
      email: email
    }
    await forgetPassword(data).unwrap().then((res) => {
      if (res.success) {
        setCode(res.OTP.toString())
        return ShowToast('OTP Sent Successfully')
      } else {
        return ShowToast(res.message)
      }
    }).catch((error) => {
      console.log('forget password api error ===========>', error)
      return ShowToast('Some problem occured')
    })
  }

  const onVerifyPress = async () => {
    if (code && id) {
      await verifyOTP({ code, id }).unwrap().then((res) => {
        if (res.success) {
          navigation.navigate('ChangePassword',{type: 'reset', user_id: id})
          return ShowToast(res.message)
        } else {
          console.log(res.message)
          return ShowToast(res.message)
        }
      }).catch((error) => {
        console.log('otp verify api error ====================>', error)
        return ShowToast('Some problem occured')
      })
    }
  }


  return (
    <ImageBackground style={{ flex: 1 }} source={Images.background}>
      <ImageBackground style={{ flex: 1 }} source={Images.layer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <View style={{ alignItems: 'center', padding: 30 }}>
            <Image source={Images.logo2} />
          </View>
          <View
            style={{
              backgroundColor: '#00190A',
              width: '100%',
              flex: 1,
              paddingVertical: 40,
              paddingHorizontal: 30,
              borderTopEndRadius: 70,
              borderTopLeftRadius: 70,
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Email
            </Text>
            <Text
              style={{
                color: 'white',
                fontSize: 14,
                fontWeight: 'light',
                marginTop: 20,
              }}>
              An email has been sent to your registered email address. Enter
              the verification code below:
            </Text>
            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={setCode}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFieldRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              autoComplete={Platform.select({
                android: 'sms-otp',
                default: 'one-time-code',
              })}
              testID="my-code-input"
              renderCell={({ index, symbol, isFocused }) => (
                <Text
                  key={index}
                  style={[styles.cell, isFocused && styles.focusCell]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              )}
            />
            {timer < 60 ?
              <>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: 'light',
                    marginTop: 30,
                  }}>
                  {timer > 10 ? `0:${timer}` : timer}
                </Text>
                {/* <Text
                style={{
                  color: 'white',
                  fontSize: 14,
                  fontWeight: 'light',
                  marginTop: 40,
                }}>
                Didn't receive a code?
              </Text> */}
              </> : <>
                <TouchableOpacity onPress={() => onResendCode()}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: responsiveHeight(4.5),
                    }}>
                    Resend Code
                  </Text>
                </TouchableOpacity>
              </>
            }
            <View style={{ marginTop: 30 }}>
              <Button
                navigation={navigation}
                navigateTo={'verified'}
                loading={isLoading}
                color={'#29CF6E'}
                onPress={() => onVerifyPress()}
                title={'Verify'}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Signup;
const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: 'center', fontSize: 30 },

  codeFieldRoot: { marginTop: 20, gap: 10 },
  cell: {
    flex: 1,
    color: 'white',
    height: 65,
    // padding: 15,
    textAlign: 'center',
    paddingTop: 15,
    // lineHeight: 38,
    borderRadius: 10,
    fontSize: 24,
    borderWidth: 2,
    borderColor: '#fff',
  },
  focusCell: {
    borderColor: '#fff',
    color: 'white',
  },
});
