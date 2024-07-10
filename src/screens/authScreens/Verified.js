import {View, Text, ImageBackground, Image} from 'react-native';
import React from 'react';
import {Images} from '../../assets/Images/Index';
import {Input} from '../../componets/Input';
import {Button} from '../../componets/Button';

const Verified = ({navigation}) => {
  return (
    <ImageBackground style={{flex: 1}} source={Images.background}>
      <View style={{flex: 1, backgroundColor: '#00190A', opacity: 0.8}}>
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
              padding: 40,
              justifyContent:'center',
              alignItems:'center',
              borderTopEndRadius: 70,
              borderTopLeftRadius: 70,
            }}>
              <Image source={Images.verified}/>
              <Text style={{color:'white',alignSelf:'center',textAlign:'center',marginTop:20,marginBottom:30,fontWeight:'bold',fontSize:18}}>Successfully{'\n'}Verified</Text>
            <Button navigation={navigation} navigateTo={'login'} color={'#29CF6E'} title={'Back To Login'} />
            <View></View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default Verified;
