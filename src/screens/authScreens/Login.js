import {View, Text, ImageBackground, Image, ScrollView} from 'react-native';
import React from 'react';
import {Images} from '../../assets/Images/Index';
import {Input} from '../../componets/Input';
import {Button} from '../../componets/Button';

const Login = ({navigation}) => {
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
                padding: 40,
                borderTopEndRadius: 70,
                borderTopLeftRadius: 70,
              }}>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                Sign In with email
              </Text>
              <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
                or username
              </Text>
              <View>
                <View style={{marginTop: 20}}>
                  <Input placeHolder={'username or email'} />
                </View>
                <View style={{marginTop: 20}}>
                  <Input placeHolder={'password'} />
                </View>
                <Text
                  style={{
                    textAlign: 'right',
                    color: 'white',
                    marginVertical: 20,
                    fontWeight: '500',
                  }}>
                  Forgot Password
                </Text>
                <Button
                  navigation={navigation}
                  navigateTo={'mainStack'}
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
                <View style={{marginTop: 30}}>
                  <Button
                  onPress={()=>navigation.navigate('signup')}
                    navigation={navigation}
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
