import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from "../assets/Utils/Colors";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import Cross from 'react-native-vector-icons/Entypo'
import { responsiveHeight, responsiveWidth } from "../utils";

export const Header = ({ searchIcon, search, leftArrow, headerText, onSearchPress, onClosePress, value,onChangeText }) => {
  const navigation = useNavigation();

  return (
    <View>
      <View style={{ flexDirection: 'row', padding: responsiveHeight(3), justifyContent: 'space-between', alignItems: 'center', }}>
        {search ? (
          <>
            <TextInput value={value} onChangeText={onChangeText} placeholder="Search Product..." style={styles.searchInput} />
            <TouchableOpacity onPress={onClosePress} style={[styles.iconBackground, { height: responsiveHeight(4.8), width: responsiveHeight(4.8), borderRadius: 100 }]}>
              <Cross
                name={'cross'}
                size={27}
                color={Colors.secondary}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            {leftArrow ? (
              <Feather
                name={'arrow-left'}
                color={Colors.white}
                size={25}
                onPress={() => navigation.goBack()}
              />
            ) : (
              <TouchableOpacity style={styles.iconBackground} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                <Feather
                  name={'menu'}
                  color={Colors.secondary}
                  size={25}
                />
              </TouchableOpacity>
            )}

            {/* Header Text */}
            <Text style={styles.headerText}>
              {headerText}
            </Text>

            {/* Right Icons (Search and Plus) */}
            <View style={styles.iconGroup}>
              {searchIcon && (
                <TouchableOpacity style={styles.iconBackground} onPress={onSearchPress}>
                  <AntDesign name='search1' size={20} color={Colors.secondary} />
                </TouchableOpacity>
              )}
              {!leftArrow && (
                <TouchableOpacity style={styles.iconBackground} onPress={() => navigation.navigate('AddProduct')}>
                  <Feather name='plus' size={20} color={Colors.secondary} />
                </TouchableOpacity>
              )}
            </View>
          </>
        )}
      </View>
      {/* Divider Line */}
      {!leftArrow && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  iconBackground: {
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 17.5,
    backgroundColor: 'white',
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconGroup: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    width: '100%',
    backgroundColor: 'white',
  },
  searchInput: {
    color: Colors.black,
    backgroundColor: Colors.white,
    height: responsiveHeight(5),
    borderRadius: 20,
    width: responsiveWidth(72),
    borderRadius: 5,
    paddingHorizontal: 10,
  },
});

