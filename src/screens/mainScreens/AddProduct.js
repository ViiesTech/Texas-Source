import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { convertToDropdownData, responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import Feather from 'react-native-vector-icons/Feather'
import { Input } from '../../componets/Input'
import { Button } from '../../componets/Button'
import { launchImageLibrary } from 'react-native-image-picker'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { useCreateProductMutation, useEditProductMutation, useLazyGetProductCateoriesQuery } from '../../redux/Services'
import { useNavigation } from '@react-navigation/native'
import Picker from '../../componets/Picker'
import Loader from '../../componets/Loader'
import Swiper from 'react-native-swiper'

const AddProduct = ({ route }) => {
  const editItem = route?.params?.product

  console.log('edit items ======>', editItem)

  const [state, setState] = useState({
    title: editItem?.productTitle || '',
    desc: editItem?.productDescp || '',
    price: editItem?.productPrice || '',
    image: editItem?.productImage || [],
    category: editItem?.productCategories || ''
  })

  const [getProductCateories, { data, isLoading: categoriesLoader }] = useLazyGetProductCateoriesQuery()
  const [editProduct, { isLoading: editLoader }] = useEditProductMutation()
  console.log(state.image)

  const [items, setItems] = useState([])

  useEffect(() => {

    getProductCateories()

  }, [])

  useEffect(() => {

    setCategories()

  }, [data])

  const setCategories = () => {
    const dropdownData = convertToDropdownData(data?.data)
    setItems(dropdownData)
  }

  const navigation = useNavigation()

  const [createProduct, { isLoading }] = useCreateProductMutation()

  const onAddImage = async () => {
    const options = {
      title: 'Select Image',
      selectionLimit: 0,
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
        setState(prevState => ({
          ...prevState,
          image: [...prevState.image, ...response.assets.map(asset => asset.uri)],
        }));
      }
    });
  };


  const handleProduct = async () => {
    if (!state.image) {
      return ShowToast('Please select the image first')
    } else if (!state.title) {
      return ShowToast('Please enter the title')
    } else if (!state.desc) {
      return ShowToast('Please enter the description')
    } else {
      if (!editItem) {
        var data = new FormData()
        data.append('productTitle', state.title)
        data.append('productDescp', state.desc)
        data.append('productCategories', state.category)
        data.append('ProductPrice', state.price)
        if (state.image && state.image.length > 0) {
          state.image.forEach((imageUri, index) => {
            data.append('images', {
              name: `image_${index}.jpg`,
              type: 'image/jpeg',
              uri:
                Platform.OS === 'android'
                  ? imageUri
                  : imageUri.replace('file://', ''),
            });
          });
        }
        await createProduct(data).unwrap().then((res) => {
          if (res.success) {
            navigation.goBack()
            return ShowToast(res.message)
          } else {
            return ShowToast(res.message)
          }
        }).catch((error) => {
          console.log('product add error ==========>', error)
          return ShowToast('Some problem occured')
        })
      } else {
        const data = {
          productTitle: state.title,
          productDescp: state.desc,
          ProductPrice: state.price,
          productCategories: state.category,
          productID: editItem?._id
        }
        await editProduct(data).unwrap().then((res) => {
          if (res.success) {
            navigation.navigate('explore1')
            return ShowToast('Updated Successfully')
          } else {
            return ShowToast(res.message)
          }
        }).catch((error) => {
          console.log('edit product error =======>', error)
          return ShowToast('Some problem occured')
        })
      }
    }

  }


  // const onRemoveImage = (index) => {
  //   setState(prevState => ({
  //     ...prevState,
  //     image: prevState.image.filter((_, i) => i !== index),
  //   }));
  // };

  return (
    <Container>
      <Header leftArrow={true} headerText={editItem ? 'Edit Product' : 'Add Product'} />
      {categoriesLoader ?
        <Loader
          size={'large'}
          color={Colors.secondary}
          style={{ marginVertical: responsiveHeight(7) }}
        />
        :
        <ScrollView contentContainerStyle={styles.productWrapper}>
          {state?.image.length > 0 ?
            <View style={styles.swipeWrapper}>
              <Swiper
                loadMinimal
                loadMinimalSize={3}
                // loop={false}
                paginationStyle={{ bottom: responsiveHeight(0) }}
                horizontal={true}
                activeDotColor={'white'}
                dotColor='gray'
              // autoplay
              // autoplayTimeout={3}
              // autoplayDirection
              >
                {state?.image.map((item, i) => {
                  // return console.log(item)
                  return (
                    <View style={styles.imageContainer}>
                      <Image
                        source={{uri:item}}
                        style={styles.imageStyle}
                      />
                      {!editItem &&
                        <TouchableOpacity onPress={() => onAddImage()} style={styles.editButton}>
                          <Feather name="edit-2" size={24} color={Colors.secondary} />
                        </TouchableOpacity>
                      }
                      {/* <TouchableOpacity onPress={() => onRemoveImage(i)} style={styles.removeButton}>
                        <Feather name="trash-2" size={24} color={Colors.secondary} />
                      </TouchableOpacity> */}
                    </View>
                  )
                })}

              </Swiper>
            </View>
            :
            <TouchableOpacity style={styles.imagesBorder} onPress={() => onAddImage()}>
              <View style={styles.circle}>
                <Feather
                  name={'plus'}
                  size={32}
                  color={Colors.white}
                />
              </View>
            </TouchableOpacity>
          }
          <View style={styles.inputWrapper}>
            <Input
              style={styles.inputStyle}
              value={state.title}
              onChangeText={(text) => setState({
                ...state,
                title: text
              })}
              placeHolder={'Title'}
            />
            <Input
              style={styles.inputStyle}
              value={state.desc}
              onChangeText={(text) => setState({
                ...state,
                desc: text
              })}
              placeHolder={'Description'}
            />
            <Input
              style={styles.inputStyle}
              value={state.price}
              keyboardType={'numeric'}
              onChangeText={(text) => setState({
                ...state,
                price: text
              })}
              placeHolder={'Price'}
            />
            <Picker placeholder={'Select Category'} items={items} value={state.category} setValue={val => setState(prevState => ({ ...prevState, category: val() }))} />
          </View>
          <Button
            color={Colors.secondary}
            title={editItem ? 'Update' : 'Create'}
            loading={editItem ? editLoader : isLoading}
            onPress={() => handleProduct()}
            buttonStyle={styles.button}
          />
        </ScrollView>
      }
    </Container>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  productWrapper: {
    flexGrow:1,
    paddingBottom:Platform.OS === 'ios' && responsiveHeight(8),
    // paddingBottom:responsiveHeight(5),
    paddingTop: responsiveHeight(5),
    alignItems: 'center'
  },
  imagesBorder: {
    borderWidth: 2,
    width: responsiveWidth(86),
    alignItems: 'center',
    borderRadius: 10,
    height: responsiveHeight(22),
    justifyContent: 'center',
    borderStyle: 'dotted',
    borderColor: Colors.white
  },
  circle: {
    borderWidth: 2,
    borderColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: responsiveHeight(7),
    width: responsiveHeight(7)
  },
  inputWrapper: {
    zIndex:100,
    paddingTop: responsiveHeight(8)
  },
  inputStyle: {
    width: responsiveWidth(86),
    marginBottom: responsiveHeight(4),
  },
  button: {
    width: responsiveWidth(86),
    marginTop: responsiveHeight(2)
  },
  imageStyle: {
    height: responsiveHeight(20),
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: 10,
    width: responsiveWidth(86)
  },
  swipeWrapper: {
    height: responsiveHeight(20)
  },
  imageContainer: {
    position: 'relative',
    width: responsiveWidth(86),
    height: responsiveHeight(20),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 5,
  },
  // removeButton: {
  //   position: 'absolute',
  //   top: 10,
  //   right: 10,
  //   backgroundColor: Colors.white,
  //   borderRadius: 20,
  //   padding: 5,
  // },
})