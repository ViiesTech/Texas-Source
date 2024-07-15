import {
  View,
  Text,
  ImageBackground,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Images} from '../../assets/Images/Index';
import {SocialButton} from '../../componets/SocialButtons';

const SocialLogin = ({navigation}) => {
  return (
    <ImageBackground style={{flex: 1}} source={Images.background}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{flexGrow: 1, backgroundColor: '#00190A', opacity: 0.8}}>
        <View style={{alignItems: 'center', padding: 30}}>
          <Image source={Images.logo2} />
        </View>
        <View
          style={{
            backgroundColor: '#00190A',
            borderTopEndRadius: 70,
            borderTopLeftRadius: 70,
            flex: 1,
          }}>
          <View
            style={{
              backgroundColor: '#00190A',
              width: '100%',
              flex: 1,
              borderTopEndRadius: 70,
              borderTopLeftRadius: 70,
            }}>
            <View
              style={{flex: 1, paddingVertical: 40,paddingHorizontal:25,}}>
              <View style={{alignItems: 'center'}}>
                <Text style={styles.lightText}>Innovative</Text>
                <Text style={styles.boldText}>Manufacturing</Text>
                <Text style={styles.lightText}>Solutions on</Text>
                <Text style={styles.boldText}>The Market.</Text>
              </View>
              <View style={{gap: 15, marginTop: 30}}>
                <SocialButton
                  navigation={navigation}
                  name={'apple'}
                  textColor={'white'}
                  backgrounndColor={'black'}
                  title={'Continue with Apple'}
                />
                <SocialButton
                  navigation={navigation}
                  name={'google'}
                  textColor={'black'}
                  backgrounndColor={'white'}
                  title={'Continue with Google'}
                />
                <SocialButton
                  navigation={navigation}
                  name={'facebook'}
                  textColor={'white'}
                  backgrounndColor={'#1878F3'}
                  title={'Continue with Facebook'}
                />
              </View>
              <Text
                style={{textAlign: 'center', color: 'white', marginTop: 20}}>
                By registering, you agree to our
                <Text style={{fontWeight: 'bold'}}>
                  {' '}
                  Terms of Service, Privacy Policy and Cookie Policy.
                </Text>
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  marginTop: 30,
                  fontSize: 18,
                  fontWeight: '500',
                }}>
                Recover my account
              </Text>
              <View></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default SocialLogin;

const styles = StyleSheet.create({
  lightText: {
    fontSize: 40,
    fontWeight: 'light',
    color: 'white',
  },
  boldText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
  },
});
