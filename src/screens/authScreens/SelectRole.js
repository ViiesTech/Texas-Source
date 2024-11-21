// import { Image, ImageBackground, ScrollView, StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { Images } from '../../assets/Images/Index'
// import { Colors } from '../../assets/Utils/Colors'
// import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
// import { Button } from '../../componets/Button'
// import { useDispatch } from 'react-redux'
// import { UserType } from '../../redux/Slice'
// import { useNavigation } from '@react-navigation/native'

// const SelectRole = () => {
//     const dispatch = useDispatch()
//     const navigation = useNavigation()

//     const onSelectUserType = async (type) => {
//         if (type === 'Company') {
//             await dispatch(UserType(type))
//             navigation.navigate('signup')
//         } else {
//             alert('working in progress')
//         }
//     }

//     return (
//         <ImageBackground style={{ flex: 1 }} source={Images.background}>
//             <ImageBackground style={{ flex: 1 }} source={Images.layer}>
//                 <View style={{ alignItems: 'center', padding: 30 }}>
//                     <Image source={Images.logo2} />
//                 </View>
//                 <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.background}>
//                     <Text style={styles.boldText}>Choose Your</Text>
//                     <Text style={styles.lightText}>Account Type</Text>
//                     <Button onPress={() => onSelectUserType('User')} color={Colors.secondary} buttonStyle={styles.buttonStyle} title={'Signup As User'} />
//                     <Button onPress={() => onSelectUserType('Company')} color={Colors.secondary} buttonStyle={styles.buttonStyle} title={'Signup As Company'} />
//                 </ScrollView>
//             </ImageBackground>
//         </ImageBackground>
//     )
// }

// export default SelectRole

// const styles = StyleSheet.create({
//     background: {
//         backgroundColor: Colors.background,
//         width: '100%',
//         flex: 1,
//         alignItems: 'center',
//         borderTopEndRadius: 70,
//         paddingTop: responsiveHeight(7),
//         borderTopLeftRadius: 70,
//     },
//     boldText: {
//         color: Colors.white,
//         fontWeight: 'bold',
//         fontSize: responsiveFontSize(4.5)
//     },
//     lightText: {
//         fontSize: responsiveFontSize(4.5),
//         marginBottom: responsiveHeight(7),
//         fontWeight: 'light',
//         color: Colors.white
//     },
//     buttonStyle: {
//         marginTop: responsiveHeight(4),
//         width: responsiveWidth(80)
//     }
// })