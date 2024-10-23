import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../utils';
import { Colors } from '../assets/Utils/Colors';
import { Button } from './Button';
import { useNavigation } from '@react-navigation/native';
function ModalComponent({ isModalVisible, backdropPress, cartConfirmation }) {

  const navigation = useNavigation()

  return (
    <Modal
      animationInTiming={500}
      animationOutTiming={500}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      onBackdropPress={backdropPress}
      style={{ margin: 0 }}
      isVisible={isModalVisible}>
      <View
        style={!cartConfirmation ? [styles.modalView, { alignItems: 'center' }] : styles.modalView}>
        {cartConfirmation ?
          <>
            <View style={styles.orderView}>
              <View>
                <Text style={styles.text}>Item Selected</Text>
                <Text style={styles.text, { color: Colors.secondary }}>Total</Text>
              </View>
              <View>
                <Text style={styles.text}>3 Qyt</Text>
                <Text style={styles.text, { color: Colors.secondary }}>€2500</Text>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <Button onPress={() => navigation.navigate('Payment')} buttonStyle={styles.buttonStyle} color={Colors.secondary} title={'Order Now'} />
          </>
          :
          <>
            <Text style={{ color: 'black', fontSize: 30, fontWeight: 'bold' }}>Product</Text>
            <View style={{ flexDirection: "row", alignItems: 'center', gap: 10, marginTop: 20 }}>
              <View style={{ flexDirection: 'row' }}>
                <AntDesign name='star' size={15} color={'#FFD52D'} />
                <AntDesign name='star' size={15} color={'#FFD52D'} />
                <AntDesign name='star' size={15} color={'#FFD52D'} />
                <AntDesign name='star' size={15} color={'#FFD52D'} />
                <AntDesign name='star' size={15} color={'lightgray'} />
              </View>
              <Text style={{ color: 'black' }}>1.248 Reviews</Text>
            </View>

            <View style={{ alignItems: 'center', padding: 20 }}>
              <Text style={{ textAlign: 'center', color: '#1A1A1A' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
            </View>

            <View style={{ flexDirection: 'row', gap: 20, padding: 20 }}>
              <TouchableOpacity onPress={backdropPress} style={{ backgroundColor: 'white', borderWidth: 1, borderColor: '#D1D1D1', borderRadius: 10, height: 60, width: 60, justifyContent: 'center', alignItems: 'center' }}>
                <AntDesign size={30} color={'#D1D1D1'} name='arrowleft' />
              </TouchableOpacity>
              <TouchableOpacity onPress={backdropPress} style={{ backgroundColor: '#29CF6E', flex: 1, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: 'white', fontSize: 16 }}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
          </>
        }
      </View>
    </Modal>
  );
}

export default ModalComponent;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: 'white',
    margin: 0,
    bottom: 0,
    position: 'absolute',
    width: '100%',
    paddingVertical: 30,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60
  },
  orderView: {
    flexDirection: 'row',
    padding: responsiveHeight(2.4),
    justifyContent: 'space-between'
  },
  text: {
    color: Colors.black,
    marginBottom: responsiveHeight(2.5),
    fontWeight: 'bold',
    fontSize: responsiveFontSize(2)
  },
  horizontalLine: {
    borderBottomColor: Colors.black,
    marginHorizontal: responsiveHeight(2.5),
    borderBottomWidth: 0.7
  },
  buttonStyle: {
    marginTop: responsiveHeight(4),
    width: responsiveWidth(90),
    alignSelf: 'center'
  }
})
