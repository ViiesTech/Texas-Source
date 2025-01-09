import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { responsiveFontSize, responsiveHeight, responsiveWidth, statusOrders } from '../../utils'
import OrdersCard from '../../componets/OrdersCard'
import { useGetUserOrdersMutation, useAddReviewMutation } from '../../redux/Services'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import Loader from '../../componets/Loader'
import { Images } from '../../assets/Images/Index'
import moment from 'moment'
import { Colors } from '../../assets/Utils/Colors'
import StarRating from 'react-native-star-rating-widget'
import Cross from 'react-native-vector-icons/Entypo'
import Modal from 'react-native-modal'
import { useNavigation } from '@react-navigation/native'
import { Button } from '../../componets/Button'

const MyOrder = () => {
  const [categories, setCategories] = useState(statusOrders)
  const [myOrders, setMyOrders] = useState([])
  const [reviewVisible, setReviewVisible] = useState(false)
  const [rating, setRating] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const navigation = useNavigation()

  const [getUserOrders, { isLoading }] = useGetUserOrdersMutation()
  const [addReview, { isLoading: reviewLoading }] = useAddReviewMutation()

  const handleSelectCategory = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, selected: !category.selected } : { ...category, selected: false }
    );
    setCategories(updatedCategories);
  };

  useEffect(() => {

    fetchMyOrders()

  }, [])

  const fetchMyOrders = async () => {
    await getUserOrders().unwrap().then((res) => {
      console.log('response =====>', res)
      setMyOrders(res.data)
    }).catch((error) => {
      console.log('failed to get user orders =======>', error)
      return ShowToast('Some problem occured')
    })
  }

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

  const selectedCategory = categories.find((category) => category.selected)?.title;

  const filteredOrders = selectedCategory
    ? myOrders.filter((order) => order?.status?.toLowerCase() === selectedCategory?.toLowerCase())
    : myOrders;

  const renderReviewModal = () => {
    return (
      <Modal
        animationInTiming={500}
        animationOutTiming={500}
        animationIn={'slideInUp'}
        animationOut={'slideOutDown'}
        isVisible={reviewVisible}
        onBackdropPress={() => setReviewVisible(!reviewVisible)}
        style={{ margin: 0 }}
      >
        <View style={styles.reviewContainer}>
          <Cross onPress={() => {
            setReviewVisible(!reviewVisible)
          }} name={'cross'} color={Colors.white} size={35} style={{ alignSelf: 'flex-end', paddingTop: responsiveHeight(1), marginRight: responsiveHeight(1) }} />
          <View style={styles.subContainer2}>
            <Text style={styles.heading}>Rate Your Product</Text>
            <Text style={styles.desc}>Share your feedback! Tap the stars to rate the product you purchased</Text>
            <View style={{ paddingTop: responsiveHeight(4) }}>
              <StarRating rating={rating}
                onChange={setRating} />
            </View>
            <Button loading={reviewLoading} onPress={() => onGiveRating()} title={'Rate'} color={Colors.secondary} buttonStyle={{ width: responsiveWidth(70), marginTop: responsiveHeight(3) }} />
          </View>
        </View>
      </Modal>
    )
  }


  const onOpenReviewModal = (id) => {
    setReviewVisible(!reviewVisible)
    setSelectedProductId(id)

  }

  const onGiveRating = async () => {
    const data = {
      productID: selectedProductId,
      stars: rating
    }
    await addReview(data).unwrap().then((res) => {
      console.log('resss', res)
      if (res.message === 'Rating added successfully') {
        navigation.goBack()
        return ShowToast(res.message)
      } else {
        return ShowToast(res.message)
      }
    }).catch((error) => {
      console.log('error giving review ======>', error)
      return ShowToast('Some problem occured')
    })
    setReviewVisible(!reviewVisible)
  }


  return (
    <Container>
      <Header leftArrow={true} headerText={'Orders'} />
      <ScrollView style={styles.subContainer}>
        <FlatList
          data={categories}
          horizontal
          contentContainerStyle={{ gap: 15, paddingHorizontal: responsiveHeight(3) }}
          renderItem={renderCategories}
        />
        <View style={styles.productWrapper}>
          {isLoading ?
            <Loader size={'large'} />
            :
            filteredOrders?.length < 1 ?
              <Text style={styles.message}>No Orders Here</Text>
              :
              filteredOrders?.map((item) => {
                // console.log(`Image URI: https://appsdemo.pro/Texas_Server/${item?.productId?.productImage[0]}`);
                return (
                  <OrdersCard
                    status={item?.status}
                    price={item?.price}
                    rating={item?.productId?.AvaRating}
                    onPress={() => onOpenReviewModal(item?.productId)}
                    image={item?.productId ? { uri: `https://appsdemo.pro/Texas_Server/${item?.productId?.productImage[0]}` } : Images.dummy}
                    title={item?.productId?.productTitle}
                    date={moment(item?.productId?.createdAt).format('DD/MM/YYYY')}
                  />
                )
              })}
        </View>
      </ScrollView>
      {renderReviewModal()}
    </Container>
  )
}

export default MyOrder

const styles = StyleSheet.create({
  subContainer: {
    paddingTop: responsiveHeight(2)
  },
  productWrapper: {
    padding: responsiveHeight(2.2),
    paddingTop: responsiveHeight(5)
  },
  message: {
    color: Colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2.2)
  },
  reviewContainer: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    margin: responsiveHeight(2),
    flex: 0.45,
  },
  subContainer2: {
    paddingTop: responsiveHeight(3),
    alignItems: 'center',
  },
  heading: {
    color: Colors.white,
    fontWeight: 'bold',
    marginBottom: responsiveHeight(3),
    fontSize: responsiveFontSize(2.5)
  },
  desc: {
    textAlign: 'center',
    color: Colors.white,
    width: responsiveWidth(70),
    fontSize: responsiveFontSize(2)
  }
})