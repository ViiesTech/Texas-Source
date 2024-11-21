import {Image, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Images} from '../assets/Images/Index';
export const SocialButton = ({title, backgrounndColor, textColor, name,navigation}) => {
  return (
    <TouchableOpacity
    // onPress={()=>navigation.navigate('login')}
      style={{
        backgroundColor: backgrounndColor,
        height: 60,
        width: '100%',
        borderRadius: 40,
        alignItems: 'center',
        flexDirection: 'row',
      }}>
        <View style={{alignItems:'center',justifyContent:'center', flexDirection:'row',flex:1}}>
      <View style={{width: 80, alignItems: 'center'}}>
        {name === 'apple' ? (
          <AntDesign name="apple1" color={'white'} size={25} />
        ) : name === 'google' ? (
          <Image source={Images.google} />
        ) : (
          <Entypo name="facebook-with-circle" size={25} color={'white'} />
        )}
      </View>
      <Text style={{color: textColor, fontSize: 16}}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
