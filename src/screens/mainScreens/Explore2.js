import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { Header } from '../../componets/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils';
import Container from '../../componets/Container';
import { useNavigation } from '@react-navigation/native';
import ProductCard from '../../componets/ProductCard';
import { useGetAllProductsMutation, useLazyGetProductCateoriesQuery, useProductFilterByCategoriesMutation, useSearchProductsMutation } from '../../redux/Services';
import { Images } from '../../assets/Images/Index';
import Loader from '../../componets/Loader';
import { Colors } from '../../assets/Utils/Colors';
import { ShowToast } from '../../GlobalFunctions/ShowToast';
const Explore2 = ({ route }) => {
  const [search, setSearch] = useState(false)
  const [categories, setCategories] = useState('All');
  const [getAllProducts, { data, isLoading }] = useGetAllProductsMutation()
  const [searchProducts, { data: searchData, isLoading: searchLoading }] = useSearchProductsMutation()
  const [getProductCateories, { data: categoryData, isLoading: categoriesLoader }] = useLazyGetProductCateoriesQuery()
  const [productFilterByCategories, { data: categoryProducts, isLoading: filterLoading }] = useProductFilterByCategoriesMutation()
  const CompanyId = route?.params?.id;
  // console.log('all products wait ==========>', categoryData?.data)

  const categoriesWithAll = categoryData?.data ? ["All", ...categoryData.data] : ["All"];
  // console.log(allCategories)

  const navigation = useNavigation()

  useEffect(() => {

    getAllProducts(CompanyId)
    getProductCateories()

  }, [])

  useEffect(() => {

    // if (CompanyId && categories === 'All') {
    //   getAllProducts(CompanyId)
    // } 
    if (categories != 'All') {
      fetchFilterProducts()
    }

  }, [categories])

  const fetchFilterProducts = async () => {
    const data = {
      catagoryName: categories
    }
    await productFilterByCategories(data).unwrap().then(() => {
      console.log('successfully fetched')
    }).catch((error) => {
      console.log('categories filter product error =======>', error)
      return ShowToast('Some problem occured')
    })
  }

  const handleSelectCategory = (title) => {
    console.log(title)
    // const updatedCategories = categories.map((category) =>
    //   category.id === id ? { ...category, selected: !category.selected } : { ...category, selected: false }
    // );
    // setCategories(updatedCategories);
    setCategories(title)
  };
  const renderItem = ({ item }) => {
    console.log('item?.productImage[0]',item?.productImage[0])
    return (
      <ProductCard
        pic={item?.productImage[0] ? { uri: `https://appsdemo.pro/Texas_Server/${item?.productImage[0]}` } : Images.dummy}
        onPress={() => navigation.navigate('ProductDetail', { detail: item, image_url: data?.Product_Picture_Url })}
        title={item.productTitle}
        price={item.productPrice}
      />
    );
  };

  const ListEmptyComponent = () => {
    return (
      isLoading || searchLoading || filterLoading ?
        <Loader
          style={{ marginVertical: responsiveHeight(7) }}
          color={Colors.secondary}
          size={'large'}
        />
        :
        <Text style={{ color: Colors.secondary, marginVertical: responsiveHeight(7), textAlign: 'center', fontSize: responsiveFontSize(2.5) }}>No Product Found...</Text>
    )
  }

  const listCategoriesEmpty = () => {
    categoriesLoader ?
      <Loader
        style={{ marginVertical: responsiveHeight(2) }}
        color={Colors.secondary}
        size={'large'}
      />
      :
      <Text style={{ color: Colors.secondary, marginVertical: responsiveHeight(2), textAlign: 'center', fontSize: responsiveFontSize(2.5) }}>No Categories Found...</Text>
  }

  const renderCategories = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => handleSelectCategory(item)}
        style={{
          height: responsiveHeight(5),
          width: responsiveWidth(30),
          borderRadius: 5,
          backgroundColor: categories === item ? '#29CF6E' : null,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: categories === item ? null : 1,
          borderColor: categories === item ? null : 'white',
        }}>
        <Text style={{ color: 'white' }}>{item}</Text>
      </TouchableOpacity>
    );
  };

  // const handleBackdropPress = () => {
  //   setModalVisible(false);
  // };

  const onSearchProducts = async (text) => {
    setSearch(text)
    if (text?.length > 0) {
      const data = {
        productTitle: text
      }
      await searchProducts(data)
    }
  }

  return (
    <Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
        }}>
        <Header value={search} onChangeText={(text) => onSearchProducts(text)} searchIcon={true} onClosePress={() => setSearch(false)} search={search} onSearchPress={() => setSearch(true)} headerText={'Explore Now'} />
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
          data={categoriesWithAll}
          style={{ marginHorizontal: -responsiveHeight(6.5) }}
          contentContainerStyle={{ gap: 15, marginVertical: responsiveHeight(3), paddingHorizontal: responsiveHeight(10) }}
          renderItem={renderCategories}
          ListEmptyComponent={listCategoriesEmpty}
        // keyExtractor={(item) => item.id.toString()}
        />
        {/* </View> */}

        <View style={{ alignItems: 'center' }}>
          <FlatList
            data={search?.length > 0 ? searchData?.Products : categories != 'All' ? categoryProducts?.Products : data?.data}
            numColumns={2}
            ListEmptyComponent={ListEmptyComponent}
            columnWrapperStyle={{
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
