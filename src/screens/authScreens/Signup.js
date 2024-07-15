import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Images} from '../../assets/Images/Index';
import {Input} from '../../componets/Input';
import {Button} from '../../componets/Button';

const Signup = ({navigation}) => {
  const [checked, setChecked] = useState(true);
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
              padding: 40,
              borderTopEndRadius: 70,
              borderTopLeftRadius: 70,
            }}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold'}}>
              Create an account
            </Text>

            <View>
              <View style={{marginTop: 20}}>
                <Input placeHolder={'Full Name'} />
              </View>
              <View style={{marginTop: 20}}>
                <Input placeHolder={'Email Address'} />
              </View>
              <View style={{marginTop: 20}}>
                <Input placeHolder={'Password'} />
              </View>
              <View style={{marginTop: 20}}>
                <Input placeHolder={'Re-type Password'} />
              </View>
                 
              <TouchableOpacity  onPress={() => setChecked(!checked)} style={{flexDirection:'row',alignItems:'center',gap:10,}}>
                <TouchableOpacity
                onPress={() => setChecked(!checked)}
                  style={{
                    height: 20,
                    width: 20,
                    borderRadius: 5,
                    backgroundColor: 'white',
                    padding: 5,
                    marginVertical: 20,
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
                    <Text style={{color: 'white'}}>
                      I have read and accept the  <Text style={{fontWeight:'bold'}}>
                          terms and conditions
                        </Text>

                   
                    </Text>
              </TouchableOpacity>
              <Button navigation={navigation} navigateTo={'emailVerify'} color={'#29CF6E'} title={'Create an account'} />
            </View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Signup;
