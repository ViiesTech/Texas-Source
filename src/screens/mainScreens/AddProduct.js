import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import Feather from 'react-native-vector-icons/Feather'
import { Input } from '../../componets/Input'
import { Button } from '../../componets/Button'
import { launchImageLibrary } from 'react-native-image-picker'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { useCreateProductMutation } from '../../redux/Services'
import { useNavigation } from '@react-navigation/native'

const AddProduct = () => {
  const [state, setState] = useState({
    title: '',
    desc: '',
    image: ''
  })

  const navigation = useNavigation()

  const [createProduct, { isLoading }] = useCreateProductMutation()

  const onAddImage = async () => {
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
        setState(prevState => ({
          ...prevState,
          image: response.assets[0].uri,
        }));
      }
    });

  };

  const onCreateProduct = async () => {
    if (!state.image) {
      return ShowToast('Please select the image first')
    } else if (!state.title) {
      return ShowToast('Please enter the title')
    } else if (!state.desc) {
      return ShowToast('Please enter the description')
    } else {
      var data = new FormData()
      data.append('productTitle', state.title)
      data.append('productDescp', state.desc)
      if (state.image) {
        data.append('images', {
          name: 'image.jpg',
          type: 'image/jpeg',
          uri:
            Platform.OS === 'android'
              ? state.image
              : state.image.replace('file://', ''),
        });
      }
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
  }

  return (
    <Container>
      <Header leftArrow={true} headerText={'Add Product'} />
      <ScrollView contentContainerStyle={styles.productWrapper}>
        <TouchableOpacity style={styles.imagesBorder} onPress={() => onAddImage()}>
          {state.image ?
            <Image
              source={{ uri: state.image }}
              style={styles.imageStyle}
            />
            :
            <View style={styles.circle}>
              <Feather
                name={'plus'}
                size={32}
                color={Colors.white}
              />
            </View>
          }
        </TouchableOpacity>
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
        </View>
        <Button
          color={Colors.secondary}
          title={'Create'}
          loading={isLoading}
          onPress={() => onCreateProduct()}
          buttonStyle={styles.button}
        />
      </ScrollView>
    </Container>
  )
}

export default AddProduct

const styles = StyleSheet.create({
  productWrapper: {
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
    borderRadius: 10,
    width: responsiveWidth(81)
  }
})