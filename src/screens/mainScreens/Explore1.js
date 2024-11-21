import {
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import { Header } from '../../componets/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Container from '../../componets/Container';
import { useNavigation } from '@react-navigation/native';
import { useLazyGetAllCompaniesQuery } from '../../redux/Services';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils';
import { Images } from '../../assets/Images/Index';
import Loader from '../../componets/Loader';
import { Colors } from '../../assets/Utils/Colors';
const Explore1 = () => {

  const navigation = useNavigation()

  const [getAllCompanies, { data, isLoading }] = useLazyGetAllCompaniesQuery()


  useEffect(() => {

    getAllCompanies()

  }, [])

  const ListEmptyComponent = () => {
    return (
      isLoading ?
        <Loader size={'large'} color={Colors.secondary} style={{ marginVertical: responsiveHeight(7) }} />
        : data?.allCompanies?.length < 1 &&
        <Text style={{
          color: Colors.white,
          fontSize: responsiveFontSize(2),
          textAlign: 'center',
          marginVertical: responsiveHeight(7)
        }}
        >
          No Companies...
        </Text>
    )
  }


  const renderItem = ({ item }) => {
    console.log('item.companyImage',item)
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={() => navigation.navigate('explore2', { id: item?._id })}
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          alignSelf: 'center',
          width: responsiveWidth(86.5)
        }}>
        <View style={{ borderRadius: 10 }}>
          <Image
            source={item?.companyImage ? { uri: `https://appsdemo.pro/Texas_Server/${item.companyImage}` } : Images.dummy}
            style={{
              width: responsiveWidth(86.5),
              height: responsiveHeight(20),
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
        </View>
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', gap: 10,alignItems:'center',paddingVertical:responsiveHeight(0.5) }}>
            <View style={{ width: '88%' }}>
              <Text style={{ color: 'black', fontWeight: 'bold', fontSize: responsiveFontSize(2) }}>
                {item.companyName}
              </Text>
              <Text style={{ color: 'black' }}>{item?.companyDescription}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                backgroundColor: '#29CF6E',
                borderRadius: 15,
                height: responsiveHeight(5.5),
                right: 1,
              }}>
              <MaterialCommunityIcons
                name="greater-than"
                color={'white'}
                size={25}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}>
        <Header search={false} headerText={'Exlore Now'} />
        <View style={{ paddingHorizontal: 25 }}>
          <View style={{}}>
            <Text
              style={{
                fontSize: 30,
                marginTop: 20,
                color: 'white',
                textAlign: 'center',
              }}>
              <Text style={{ fontWeight: 'bold' }}>Proceed</Text> With The{' '}
              <Text>
                {'\n'}
                <Text style={{ fontWeight: 'bold' }}>Company</Text> you{' '}
                <Text style={{ fontWeight: 'bold' }}>Want</Text>!
              </Text>
            </Text>

            <View style={{ marginTop: 20 }}>
              <FlatList
                data={data?.allCompanies}
                ListEmptyComponent={ListEmptyComponent}
                contentContainerStyle={{ gap: 20 }}
                renderItem={renderItem}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

export default Explore1;

