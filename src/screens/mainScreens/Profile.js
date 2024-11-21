import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { Images } from '../../assets/Images/Index'
import { profileOptions, responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import { Button } from '../../componets/Button'
import SVGIcon from '../../componets/SVGIcon'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { Logout } from '../../redux/Slice'
import { ShowToast } from '../../GlobalFunctions/ShowToast'

const Profile = () => {

  const { user, baseUrl } = useSelector(state => state.persistedData)

  const navigation = useNavigation()
  const dispatch = useDispatch()

  const onEditProfilePress = () => {
    navigation.navigate('EditProfile')
  }

  const onOptionPress = async (item) => {
    if (item?.id == 5) {
      await dispatch(Logout())
      return ShowToast('Logout Successfully')
    } else {
      navigation.navigate(item?.nav)
    }
  }


  return (
    <Container>
      <Header leftArrow={true} headerText={'Profile'} />
      <View style={styles.subContainer}>
        <View style={styles.profileContainer}>
          <Image
            source={user?.UserProfile ? { uri:`https://appsdemo.pro/Texas_Server/${user?.UserProfile}` } : Images.user}
            style={styles.imageStyle}
          />
          <View style={styles.nameContainer}>
            <Text style={styles.nameStyle}>{user?.name}</Text>
            <Text style={[styles.nameStyle, { fontWeight: 'light', fontSize: responsiveFontSize(1.8) }]}>{user?.email}</Text>
            <Button onPress={() => onEditProfilePress()} color={Colors.secondary} title={'Edit Profile'} buttonStyle={styles.buttonStyle} />
          </View>
        </View>
        <View style={styles.optionsContainer}>
          {profileOptions.map((item) => {
            return (
              <TouchableOpacity style={styles.listView} onPress={() => onOptionPress(item)}>
                <View style={styles.listWrapper}>
                  <SVGIcon image={item.icon} />
                  <Text style={styles.optionsText}>{item.text}</Text>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    </Container>
  )
}

export default Profile

const styles = StyleSheet.create({
  subContainer: {
    padding: responsiveHeight(3)
  },
  profileContainer: {
    flexDirection: 'row',
  },
  imageStyle: {
    width: responsiveHeight(17),
    borderRadius: 100,
    height: responsiveHeight(17)
  },
  nameContainer: {
    paddingLeft: responsiveHeight(3),
    paddingTop: responsiveHeight(1.5)
  },
  nameStyle: {
    color: Colors.white,
    fontSize: responsiveFontSize(2.8),
    fontWeight: 'bold'
  },
  buttonStyle: {
    height: responsiveHeight(5),
    width: responsiveWidth(40),
    marginTop: responsiveHeight(3)
  },
  optionsContainer: {
    paddingTop: responsiveHeight(7)
  },
  listView: {
    marginBottom: responsiveHeight(3.5),
  },
  listWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: responsiveHeight(2)
  },
  optionsText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: responsiveHeight(2.4),
  },
  line: {
    borderBottomWidth: 0.6,
    marginTop: responsiveHeight(2),
    borderBottomColor: Colors.secondary
  }
})