import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import Feather from 'react-native-vector-icons/Feather'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from "../assets/Utils/Colors"
import { DrawerActions, useNavigation } from "@react-navigation/native"
export const Header = ({ search, leftArrow, headerText }) => {

  const navigation = useNavigation()

  return (
    <View>
      <View style={{ flexDirection: 'row', padding: 25, justifyContent: 'space-between', alignItems: 'center' }}>
        {leftArrow ?
          <Feather
            name={'arrow-left'}
            color={Colors.white}
            size={25}
            onPress={() => navigation.goBack()}
          />
          :
          <TouchableOpacity style={styles.iconBackground} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
            <Feather
              name={'menu'}
              color={Colors.secondary}
              size={25}
            />
          </TouchableOpacity>
        }
        <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
          {headerText}
        </Text>
        <View style={{ flexDirection: 'row', gap: 20, alignItems: 'center', justifyContent: 'center' }}>
          {search ? (
            <TouchableOpacity style={styles.iconBackground}>
              <AntDesign name='search1' size={20} color={Colors.secondary} />
            </TouchableOpacity>
          ) : null}
          {!leftArrow &&
            <TouchableOpacity style={styles.iconBackground} onPress={() => navigation.navigate('AddProduct')}>
              <Feather name='plus' size={20} color={Colors.secondary} />
            </TouchableOpacity>
          }
        </View>
      </View>
      {!leftArrow && <View style={{ height: 1, width: '100%', backgroundColor: 'white' }} />}
    </View>
  )
}

const styles = StyleSheet.create({
  iconBackground: {
    height: 35, width: 35, justifyContent: 'center', alignItems: 'center', borderRadius: 17.5, backgroundColor: 'white'
  }
})