import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../assets/Images/Index';
import { Input } from '../../componets/Input';
import { Button } from '../../componets/Button';
import { responsiveFontSize, responsiveHeight } from '../../utils';
import { useRegisterMutation } from '../../redux/Services';
import { ShowToast } from '../../GlobalFunctions/ShowToast';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    company_name: '',
    phone: '',
  });


  const [register, { isLoading }] = useRegisterMutation()

  const { role } = useSelector(state => state.persistedData)

  const navigation = useNavigation()

  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return { ...oldForm, [key]: changedText };
    });
  };
  const handleRegister = async () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!form.company_name) {
      return ShowToast('Please provide your company name')
    } else if (!form.name) {
      return ShowToast('Please provide your name')
    } else if (!form.email) {
      return ShowToast('Please provide your email')
    } else if (!emailRegex.test(form.email)) {
      return ShowToast('Please provide a valid email')
    } else if (form.password.length < 6) {
      return ShowToast('Password is too short')
    } else if (form.password != form.confirmPassword) {
      return ShowToast('Password does not match')
    } else if (!checked) {
      return ShowToast('Please accept all the terms and conditions')
    } else {
      const data = {
        name: form.name,
        email: form.email,
        password: form.email,
        phone: form.phone,
        role: role,
        companyName: form.company_name
      }

      await register(data).unwrap().then((res) => {
        if (res.success) {
          navigation.navigate('login')
          return ShowToast(res.message)
        } else {
          // console.log(res.message)
          return ShowToast(res.message)
        }
      }).catch((error) => {
        console.log('signup api error ===========>', error)
        return ShowToast('Some problem occured')
      })
    }
  };

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
              padding: 40,
              borderTopEndRadius: 70,
              borderTopLeftRadius: 70,
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Create an account
            </Text>

            <View style={{ paddingTop: responsiveHeight(2.5) }}>
              <Input
                onChangeText={text => onChangeText(text, 'company_name')}
                value={form.company_name}
                style={styles.inputStyle}
                placeHolder={'Company Name'}
              />
              <Input
                onChangeText={text => onChangeText(text, 'name')}
                value={form.name}
                style={styles.inputStyle}
                placeHolder={'Full Name'}
              />
              <Input
                onChangeText={text => onChangeText(text, 'email')}
                keyboardType={'email-address'}
                value={form.email}
                placeHolder={'Email Address'}
                style={styles.inputStyle}
              />
              <Input
                onChangeText={text => onChangeText(text, 'phone')}
                keyboardType={'numeric'}
                value={form.phone}
                style={styles.inputStyle}
                placeHolder={'Phone'}
              />
              <Input
                onChangeText={text => onChangeText(text, 'password')}
                value={form.password}
                style={styles.inputStyle}
                secureTextEntry={true}
                placeHolder={'Password'}
              />
              <Input
                onChangeText={text => onChangeText(text, 'confirmPassword')}
                value={form.confirmPassword}
                secureTextEntry={true}
                style={styles.inputStyle}
                placeHolder={'Re-type Password'}
              />

              <TouchableOpacity
                onPress={() => setChecked(!checked)}
                style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <TouchableOpacity
                  onPress={() => setChecked(!checked)}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    padding: 5,
                    marginVertical: responsiveHeight(2)
                  }}>
                  {checked ? (
                    <View
                      style={{
                        backgroundColor: 'black',
                        width: '100%',
                        height: '100%',
                        borderRadius: 10,
                      }}></View>
                  ) : null}
                </TouchableOpacity>
                <Text style={{ color: 'white' }}>
                  I have read and accept the{' '}
                  <Text style={{ fontWeight: 'bold' }}>terms and conditions</Text>
                </Text>
              </TouchableOpacity>
              <Button
                onPress={() => handleRegister()}
                navigation={navigation}
                navigateTo={'emailVerify'}
                color={'#29CF6E'}
                loading={isLoading}
                title={'Create an account'}
              />
              <TouchableOpacity onPress={() => navigation.navigate('login')}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: 'white',
                    marginTop: responsiveHeight(2),
                    fontSize: responsiveFontSize(1.8),
                    fontWeight: '500',
                  }}>
                  Already have an account ? Login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Signup;

const styles = StyleSheet.create({
  inputStyle: {
    marginBottom: responsiveHeight(2)
  }
})
