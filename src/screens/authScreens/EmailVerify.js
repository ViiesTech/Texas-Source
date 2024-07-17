import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets/Images/Index';
import {Button} from '../../componets/Button';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

const Signup = ({navigation}) => {
  const CELL_COUNT = 5;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <ImageBackground style={{flex: 1}} source={Images.background}>
      <ImageBackground style={{flex: 1}} source={Images.layer}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{alignItems: 'center', padding: 30}}>
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
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
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
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                autoComplete={Platform.select({
                  android: 'sms-otp',
                  default: 'one-time-code',
                })}
                testID="my-code-input"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              <View style={{alignItems: 'center'}}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'light',
                    marginTop: 30,
                  }}>
                  00:32
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 'light',
                    marginTop: 40,
                  }}>
                  Didn't receive a code?
                </Text>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    marginTop: 15,
                  }}>
                  Resend Code
                </Text>
              </View>
              <View style={{marginTop: 30}}>
                <Button
                  navigation={navigation}
                  navigateTo={'verified'}
                  color={'#29CF6E'}
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
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},

  codeFieldRoot: {marginTop: 20, gap: 10},
  cell: {
    flex: 1,
    color: 'white',
    height: 65,
    // padding: 15,
    textAlign:'center',
    paddingTop:15,
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
