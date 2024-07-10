import {View, Text, ImageBackground, FlatList, Image,ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import {Images} from '../../assets/Images/Index';
import {Header} from '../../componets/Header';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Explore2 = ({navigation}) => {
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
const categoriesData = [
  {
    id:1,
    title:'Category 1',
    selected:true
  },
  {
    id:2,
    title:'Category 2'
  },
  {
    id:3,
    title:'Category 3'
  },
  {
    id:4,
    title:'Category 4'
  },
]
  const renderItem = ({item}) => {
    return(
<TouchableOpacity onPress={()=>navigation.navigate('explore2')} style={{backgroundColor:'white',borderRadius:10,alignSelf:'center',padding:10}}>
<Image source={item.pic}/>
<View style={{flexDirection:'row',justifyContent:'space-between',marginTop:5}}>
  <Text style={{color:'black',fontWeight:'bold'}}>{item.title}</Text>
  <Text style={{color:'black',fontWeight:'bold'}}>{item.price}</Text>
</View>
</TouchableOpacity>
    )
  }
  const renderCategories = ({item}) => {
    return(
      <TouchableOpacity 
      style={{height:40,width:100,borderRadius:5,backgroundColor:item.selected ? '#29CF6E' : null,justifyContent:'center',alignItems:'center',
        borderWidth:item.selected ? null : 1,
        borderColor:item.selected ? null : 'white'
      }}>
     <Text style={{color:'white'}}>{item.title}</Text>
      </TouchableOpacity>
    )
  }
  return (
    <ImageBackground style={{flex: 1}} source={Images.background}>
      <ScrollView contentContainerStyle={{backgroundColor: '#00190A',paddingBottom:20, flexGrow: 1, opacity: 0.9}}>
        <Header search={true}/>
<View style={{padding:25}}>
      <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row'}}>
      <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>Company Name</Text>

<TouchableOpacity style={{height:35,width:35,borderRadius:17.5,backgroundColor:'white',justifyContent:'center',alignItems:'center'}}>
  <Ionicons name='cart-outline' size={20} color={'#29CF6E'}/>
</TouchableOpacity>
      </View>

        <FlatList showsHorizontalScrollIndicator={false} horizontal data={categoriesData} contentContainerStyle={{marginTop:20,gap:10}}  renderItem={renderCategories}/>
        </View>
       <View style={{alignItems:'center'}}>
        <FlatList data={data}  numColumns={2} columnWrapperStyle={{flex:1,justifyContent:'space-between',gap:20}} contentContainerStyle={{gap:20,justifyContent:'space-between',}}  renderItem={renderItem}/>
       </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Explore2;
