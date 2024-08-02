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
import {Register} from '../../GlobalFunctions/Auth';
import {ShowToast} from '../../GlobalFunctions/ShowToast';

const Signup = ({navigation}) => {
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChangeText = (changedText, key) => {
    setForm(oldForm => {
      return {...oldForm, [key]: changedText};
    });
  };
  const handleRegister = async () => {
    setLoading(true);
    const {name, email, password, confirmPassword} = form;
    if (name && email && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const response = await Register(
            name,
            email,
            password,
            confirmPassword,
          );
          if (response.success) {
            navigation.navigate('login');
            ShowToast('success', 'Registeration Successful');
          }
          setLoading(false);
        } catch (error) {
          setLoading(false);
        }
      } else {
        setLoading(false);
        return ShowToast('error', 'Passwords Doesnt Match');
      }
    } else {
      setLoading(false);
      return ShowToast('error', 'Plz Fill The Required Fields');
    }
  };
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
              Create an account
            </Text>

            <View>
              <View style={{marginTop: 20}}>
                <Input
                  onChangeText={text => onChangeText(text, 'name')}
                  placeHolder={'Full Name'}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Input
                  onChangeText={text => onChangeText(text, 'email')}
                  placeHolder={'Email Address'}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Input
                  onChangeText={text => onChangeText(text, 'password')}
                  placeHolder={'Password'}
                />
              </View>
              <View style={{marginTop: 20}}>
                <Input
                  onChangeText={text => onChangeText(text, 'confirmPassword')}
                  placeHolder={'Re-type Password'}
                />
              </View>

              <TouchableOpacity
                onPress={() => setChecked(!checked)}
                style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
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
                  I have read and accept the{' '}
                  <Text style={{fontWeight: 'bold'}}>terms and conditions</Text>
                </Text>
              </TouchableOpacity>
              <Button
                onPress={() => handleRegister()}
                navigation={navigation}
                navigateTo={'emailVerify'}
                color={'#29CF6E'}
                loading={loading}
                title={'Create an account'}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Signup;
