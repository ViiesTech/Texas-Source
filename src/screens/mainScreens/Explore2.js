import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {Images} from '../../assets/Images/Index';
import {Header} from '../../componets/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalComponent from '../../componets/Modal';
const Explore2 = ({navigation}) => {
  const [modalVisible,setModalVisible] = useState(false)
  const data = [
    {
      id: 1,
      pic: Images.image4,
      title: 'Product',
      price: '€4250',
    },
    {
      id: 2,
      pic: Images.image4,
      title: 'Product',
      price: '€4250',
    },
    {
      id: 3,
      pic: Images.image4,
      title: 'Product',
      price: '€4250',
    },
    {
      id: 4,
      pic: Images.image4,
      title: 'Product',
      price: '€4250',
    },
    {
      id: 5,
      pic: Images.image4,
      title: 'Product',
      price: '€4250',
    },
    {
      id: 6,
      pic: Images.image4,
      title: 'Product',
      price: '€4250',
    },
  ];
  const initialCategoriesData = [
    {
      id: 1,
      title: 'Category 1',
      selected: true,
    },
    {
      id: 2,
      title: 'Category 2',
      selected: false,
    },
    {
      id: 3,
      title: 'Category 3',
      selected: false,
    },
    {
      id: 4,
      title: 'Category 4',
      selected: false,
    },
  ];

  const [categories, setCategories] = useState(initialCategoriesData);

  const handleSelectCategory = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, selected: !category.selected } : { ...category, selected: false }
    );
    setCategories(updatedCategories);
  };
  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
      activeOpacity={0.5}
        onPress={() => setModalVisible(!modalVisible)}
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          alignSelf: 'center',
          padding: 10,
          flex:1
        }}>
        <Image source={item.pic} style={{width:'100%'}}/>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 5,
          }}>
          <Text style={{color: 'black', fontWeight: 'bold'}}>{item.title}</Text>
          <Text style={{color: 'black', fontWeight: 'bold'}}>{item.price}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  const renderCategories = ({item}) => {
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
        <Text style={{color: 'white'}}>{item.title}</Text>
      </TouchableOpacity>
    );
  };

  const handleBackdropPress = () => {
    setModalVisible(false);
  };
  return (
    <ImageBackground style={{flex: 1}} source={Images.background}>
            <ImageBackground style={{flex: 1}} source={Images.layer2}>

      <ScrollView
      showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 20,
          flexGrow: 1,
        }}>
        <Header search={true} />
        <View style={{paddingHorizontal: 25,paddingTop:25}}>
          <View
            style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
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
              }}>
              <Ionicons name="cart-outline" size={20} color={'#29CF6E'} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingLeft:25,}}>
        <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        data={categories}
        contentContainerStyle={{ gap: 10, marginVertical: 20,paddingRight:15 }}
        renderItem={renderCategories}
        keyExtractor={(item) => item.id.toString()}
      />
          </View>

        <View style={{alignItems: 'center', paddingHorizontal: 25}}>
          <FlatList
            data={data}
            numColumns={2}
            columnWrapperStyle={{
              flex: 1,
              gap:10,
              justifyContent: 'space-between',
              width: '100%',
            }}
            contentContainerStyle={{gap: 20, justifyContent: 'space-between'}}
            renderItem={renderItem}
          />
        </View>

        <View>
          <ModalComponent backdropPress={handleBackdropPress} isModalVisible={modalVisible}/>
        </View>
      </ScrollView>
      </ImageBackground>
    </ImageBackground>
  );
};

export default Explore2;
