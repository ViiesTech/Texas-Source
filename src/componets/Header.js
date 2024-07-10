import { Text, TouchableOpacity, View } from "react-native"
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
export const Header = ({search}) => {
  return(
    <View>
      <View style={{flexDirection:'row',padding:25,justifyContent:'space-between',alignItems:'center'}}>
      <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>
        Explore Now
      </Text>
      <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}}>
        {search ?  (
      <TouchableOpacity style={{height:35,width:35,justifyContent:'center',alignItems:'center',borderRadius:17.5,backgroundColor:'white'}}>
      <AntDesign name='search1' size={20} color={'#29CF6E'}/>
      </TouchableOpacity>
        ):null}

      <TouchableOpacity style={{height:35,width:35,justifyContent:'center',alignItems:'center',borderRadius:17.5,backgroundColor:'white'}}>
      <Feather name='user' size={20} color={'#29CF6E'}/>
      </TouchableOpacity>
      </View>
      </View>
      <View style={{height:1,width:'100%',backgroundColor:'white'}}> 
      </View>
    </View>
  )
}