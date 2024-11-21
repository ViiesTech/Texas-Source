import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { orders, responsiveHeight, statusOrders } from '../../utils'
import OrdersCard from '../../componets/OrdersCard'

const MyOrder = () => {
  const [categories, setCategories] = useState(statusOrders)

  const handleSelectCategory = (id) => {
    const updatedCategories = categories.map((category) =>
      category.id === id ? { ...category, selected: !category.selected } : { ...category, selected: false }
    );
    setCategories(updatedCategories);
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

  return (
    <Container>
      <Header leftArrow={true} headerText={'My Order'} />
      <ScrollView style={styles.subContainer}>
        <FlatList
          data={categories}
          horizontal
          contentContainerStyle={{ gap: 15, paddingHorizontal: responsiveHeight(3) }}
          renderItem={renderCategories}
        />
        <View style={styles.productWrapper}>
          {orders.map((item) => (
            <OrdersCard
              status={item?.status}
              price={item?.price}
              title={item?.title}
              date={item?.date}
            />
          ))}
        </View>
      </ScrollView>
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
  }
})