import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import { Header } from '../../componets/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { exploreCard, initialCategoriesData, responsiveHeight } from '../../utils';
import Container from '../../componets/Container';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../componets/ProductCard';
const Explore2 = () => {


  const [categories, setCategories] = useState(initialCategoriesData);

  const navigation = useNavigation()

  const handleSelectCategory = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, selected: !category.selected } : { ...category, selected: false }
    );
    setCategories(updatedCategories);
  };
  const renderItem = ({ item }) => {
    return (
        <ProductCard 
          pic={item.pic}
          onPress={() => navigation.navigate('ProductDetail')}
          title={item.title}
          price={item.price}
        />
    );
  };
  const renderCategories = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectCategory(item.id)}

        style={{
          height: 40,
          width: 100,
          borderRadius: 5,
          backgroundColor: item.selected ? '#29CF6E' : null,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: item.selected ? null : 1,
          borderColor: item.selected ? null : 'white',
        }}>
        <Text style={{ color: 'white' }}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  // const handleBackdropPress = () => {
  //   setModalVisible(false);
  // };
  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}>
        <Header search={true} headerText={'Exlore Now'} />
        <View style={{ paddingHorizontal: 25, paddingTop: 25 }}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>
              Company Name
            </Text>

            <TouchableOpacity
              style={{
                height: 35,
                width: 35,
                borderRadius: 17.5,
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
              }}
                onPress={() => navigation.navigate('Cart')}
              >
              <Ionicons name="cart-outline" size={20} color={'#29CF6E'} />
            </TouchableOpacity>
          </View>
        </View>
        {/* <View style={{ paddingLeft: 25, }}> */}
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={categories}
          style={{ marginHorizontal: -responsiveHeight(6.5) }}
          contentContainerStyle={{ gap: 10, marginVertical: 20, paddingHorizontal: responsiveHeight(10) }}
          renderItem={renderCategories}
          keyExtractor={(item) => item.id.toString()}
        />
        {/* </View> */}

        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={exploreCard}
            numColumns={2}
            columnWrapperStyle={{
              flex: 1,
              gap: responsiveHeight(2),
              justifyContent: 'space-between',
              width: '100%',
            }}
            contentContainerStyle={{ gap: responsiveHeight(4), paddingTop: responsiveHeight(2), paddingHorizontal: responsiveHeight(3.8) }}
            renderItem={renderItem}
          />
        </View>

        {/* <View>
          <ModalComponent backdropPress={handleBackdropPress} isModalVisible={modalVisible} />
        </View> */}
      </ScrollView>
    </Container>
  );
};

export default Explore2;
