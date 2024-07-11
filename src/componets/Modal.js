import React from 'react';
import { Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Button } from './Button';
function ModalComponent({isModalVisible, backdropPress}) {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <Modal
      animationInTiming={500}
      animationOutTiming={500}
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
        onBackdropPress={backdropPress}
        style={{margin: 0}}
        isVisible={isModalVisible}>
        <View
          style={{
            backgroundColor: 'white',
            margin: 0,
            bottom: 0,
            position: 'absolute',
            width: '100%',
            alignItems:'center',
            paddingVertical:30,
            borderTopLeftRadius:60,
            borderTopRightRadius:60
          }}>
          <Text style={{color:'black',fontSize:30,fontWeight:'bold'}}>Product</Text>
          <View style={{flexDirection:"row",alignItems:'center',gap:10,marginTop:20}}>
         <View style={{flexDirection:'row'}}>
        <AntDesign name='star' size={15} color={'#FFD52D'}/>
        <AntDesign name='star' size={15} color={'#FFD52D'}/>
        <AntDesign name='star' size={15} color={'#FFD52D'}/>
        <AntDesign name='star' size={15} color={'#FFD52D'}/>
        <AntDesign name='star' size={15} color={'lightgray'}/>
         </View>
          <Text style={{color:'black'}}>1.248 Reviews</Text>
          </View>

          <View style={{alignItems:'center',padding:20}}>
            <Text style={{textAlign:'center',color:'#1A1A1A'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</Text>
          </View>

          <View style={{flexDirection:'row',gap:20,padding:20}}>
            <TouchableOpacity onPress={backdropPress} style={{backgroundColor:'white',borderWidth:1,borderColor:'#D1D1D1',borderRadius:10,height:60,width:60,justifyContent:'center',alignItems:'center'}}>
              <AntDesign size={30} color={'#D1D1D1'} name='arrowleft'/>
            </TouchableOpacity>
           <TouchableOpacity onPress={backdropPress} style={{backgroundColor:'#29CF6E',flex:1,borderRadius:10,justifyContent:'center',alignItems:'center'}}>
            <Text style={{ color: 'white', fontSize: 16 }}>Add To Cart</Text>
           </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default ModalComponent;
