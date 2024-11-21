import { View, Text, ImageBackground, Image, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../assets/Images/Index';
import { Input } from '../../componets/Input';
import { Button } from '../../componets/Button';
import { useNavigation } from '@react-navigation/native';
import { useLoginMutation } from '../../redux/Services';
import { ShowToast } from '../../GlobalFunctions/ShowToast';

const Login = () => {
  const [state, setState] = useState({
    email: '',
    password: ''
  })

  const [login, { isLoading }] = useLoginMutation()

  const navigation = useNavigation()

  console.log(state)

  const onChangeField = (value, text) => {
    setState(prevState => ({
      ...prevState,
      [value]: text
    }))
  }

  const onSignIn = async () => {
    if (!state.email) {
      return ShowToast('Please enter your email')
    } else if (!state.email) {
      return ShowToast('Please enter your password')
    } else {
      const data = {
        email: state.email,
        password: state.password
      }
      await login(data).unwrap().then((res) => {
        if (res.success) {
          return ShowToast('Login successfully')
        } else {
          return ShowToast(res.message)
        }
      }).catch((error) => {
        console.log('login api error =========>', error)
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
              padding: 40,
              borderTopEndRadius: 70,
              borderTopLeftRadius: 70,
            }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              Sign In with email
            </Text>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              or username
            </Text>
            <View>
              <View style={{ marginTop: 20 }}>
                <Input
                  value={state.email}
                  keyboardType={'email-address'}
                  placeHolder={'email'}
                  onChangeText={(text) => onChangeField('email', text)}
                />
              </View>
              <View style={{ marginTop: 20 }}>
                <Input
                  placeHolder={'password'}
                  secureTextEntry={true}
                  onChangeText={(text) => onChangeField('password', text)}
                  value={state.password}
                />
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
                <Text
                  style={{
                    textAlign: 'right',
                    color: 'white',
                    marginVertical: 20,
                    fontWeight: '500',
                  }}>
                  Forgot Password
                </Text>
              </TouchableOpacity>
              <Button
                onPress={() => onSignIn()}
                loading={isLoading}
                color={'#29CF6E'}
                title={'Sign In'}
              />
              <View
                style={{
                  backgroundColor: 'white',
                  height: 1,
                  width: '100%',
                  marginTop: 20,
                }}></View>
              <View style={{ marginTop: 30 }}>
                <Button
                  onPress={() => navigation.navigate('signup')}
                  navigateTo="signup"
                  color="#000000"
                  title="Create an account"
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Login;
