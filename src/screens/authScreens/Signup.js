import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Platform,
} from 'react-native';
import React, { useState } from 'react';
import { Images } from '../../assets/Images/Index';
import { Input } from '../../componets/Input';
import { Button } from '../../componets/Button';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils';
import { useRegisterMutation } from '../../redux/Services';
import { ShowToast } from '../../GlobalFunctions/ShowToast';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const Signup = () => {
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    company_name: '',
    company_desc: '',
    company_image: {
      name: '',
      path: ''
    },
    phone: '',
  });


  const [register, { isLoading }] = useRegisterMutation()


  const navigation = useNavigation()
console.log(form.company_image.path)
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
      // const data = {
      //   name: form.name,
      //   email: form.email,
      //   password: form.email,
      //   phone: form.phone,
      //   role: 'Company',
      //   companyName: form.company_name,
      //   companyDescription: form.company_desc
      // }
      var data = new FormData()
      data.append('name', form.name),
        data.append('email', form.email),
        data.append('password', form.password),
        data.append('phone', form.phone),
        data.append('companyName', form.company_name),
        data.append('companyDescription', form.company_desc),
        data.append('role', 'Company')
      if (form.company_image.path) {
        data.append('image', {
          name: 'image.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? form.company_image.path
              : form.company_image.path.replace('file://', ''),
        })
      }


      await register(data).unwrap().then((res) => {
        if (res.success) {
          navigation.navigate('login')
          return ShowToast(res.message)
        } else {
          console.log(res.message)
          return ShowToast(res.message)
        }
      }).catch((error) => {
        console.log('signup api error ===========>', error)
        return ShowToast('Some problem occured')
      })
    }
  };

  const onSelectImage = async () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
        quality: 0.5,
      },
    };

    await launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('cancelled', response.didCancel);
      } else {
        console.log('response.assets[0]',response.assets[0])
        setForm(prevForm => ({
          ...prevForm,
          company_image: {
            path: response.assets[0].uri,
            name: response.assets[0].fileName
          }
        })
        );
      }
    });
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
                onChangeText={text => onChangeText(text, 'company_desc')}
                value={form.company_desc}
                style={styles.inputStyle}
                placeHolder={'Company Description'}
              />
                <Input
                 onPress={onSelectImage}
                  value={form.company_image.name}
                  style={styles.inputStyle}
                  editable={false}
                  placeHolder={'Select photo'}
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
    marginBottom: responsiveHeight(2),
    width:responsiveWidth(80)
  }
})
