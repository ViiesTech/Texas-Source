import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Container from '../../componets/Container'
import { Header } from '../../componets/Header'
import { Images } from '../../assets/Images/Index'
import { responsiveFontSize, responsiveHeight, responsiveWidth } from '../../utils'
import { Colors } from '../../assets/Utils/Colors'
import { Input } from '../../componets/Input'
import { Button } from '../../componets/Button'
import { launchImageLibrary } from 'react-native-image-picker'
import { useSelector } from 'react-redux'
import { Text } from 'react-native-svg'
import { useEditProfileMutation } from '../../redux/Services'
import { ShowToast } from '../../GlobalFunctions/ShowToast'
import { useNavigation } from '@react-navigation/native'

const EditProfile = () => {

    const { user, baseUrl } = useSelector(state => state.persistedData)
    const [editProfile, { isLoading }] = useEditProfileMutation()

    const navigation = useNavigation()

    const [state, setState] = useState({
        name: user?.name || '',
        company_name: user?.companyName || '',
        company_desc: user?.companyDescription || '',
        company_image: '',
        phone: user?.phone || '',
        user_image: '',
    })

    // console.log(user?.UserProfile)


    const onSelectImage = async () => {
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
                    company_image: response.assets[0].uri,
                })
                );
            }
        });
    };

    const onSelectPhoto = async () => {
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
                    user_image: response.assets[0].uri,
                })
                );
            }
        });
    }

    const onChangeText = (value, field) => {
        setState(prevState => ({
            ...prevState,
            [field]: value
        }))
    }

    const onUpdateProfile = async () => {
        var data = new FormData()
        data.append('name', state.name)
        data.append('phone', state.phone)
        data.append('companyName', state.company_name)
        data.append('companyDescription', state.company_desc)
        if (state.company_image) {
            data.append('companyImage', {
                name: 'image.jpg',
                type: 'image/jpeg',
                uri:
                    Platform.OS === 'android'
                        ? state.company_image
                        : state.company_image.replace('file://', ''),
            })
        }
        if (state.user_image) {
            data.append('profileImage', {
                name: 'image.jpg',
                type: 'image/jpeg',
                uri:
                    Platform.OS === 'android'
                        ? state.user_image
                        : state.user_image.replace('file://', ''),
            })
        }
        await editProfile(data).unwrap().then((res) => {
            if (res?.data) {
                navigation.goBack()
                return ShowToast('Update profile successfully')
            } else {
                return ShowToast(res?.message)
            }
        }).catch((error) => {
            console.log('edit profile api error ============>', error)
            return ShowToast('Some problem occured')
        })
    }

    return (
        <Container>
            <Header leftArrow={true} headerText={'Edit Profile'} />
            <ScrollView contentContainerStyle={{ paddingBottom: responsiveHeight(10) }} showsVerticalScrollIndicator={false}>
                <TouchableOpacity onPress={() => onSelectPhoto()} style={styles.imageContainer}>
                    <Image source={user?.UserProfile ? { uri: `https://appsdemo.pro/Texas_Server/${user?.UserProfile}` } : state?.user_image ? { uri: state.user_image } : Images.user} style={styles.imageStyle} />
                </TouchableOpacity>
                <View style={styles.inputContainer}>
                    <Input
                        placeHolder={'Name'}
                        value={state.name}
                        style={styles.inputStyle}
                        onChangeText={(text) => onChangeText(text, 'name')}
                    />
                    <Input
                        placeHolder={'Phone'}
                        value={state.phone.toString()}
                        style={styles.inputStyle}
                        onChangeText={(text) => onChangeText(text, 'phone')}
                    />
                    <Input
                        placeHolder={'Company Name'}
                        value={state.company_name}
                        style={styles.inputStyle}
                        onChangeText={(text) => onChangeText(text, 'company_name')}
                    />
                    <TouchableOpacity style={styles.imageWrapper} onPress={() => onSelectImage()}>
                        {!user?.companyImage && !state.company_image ?
                            <Text style={styles.textStyle}>Select Company Image</Text>
                            :
                            <Image
                                source={!state?.company_image ? { uri: baseUrl + user?.companyImage } : { uri: state?.company_image }}
                                style={styles.companyImageStyle}
                            />
                        }
                    </TouchableOpacity>
                    <Input
                        placeHolder={'Company Description'}
                        value={state.company_desc}
                        style={styles.inputStyle}
                        onChangeText={(text) => onChangeText(text, 'company_desc')}
                    />
                    <Button loading={isLoading} onPress={() => onUpdateProfile()} title={'Update'} color={Colors.secondary} buttonStyle={{ width: responsiveWidth(88) }} />
                </View>
            </ScrollView>
        </Container>
    )
}

export default EditProfile

const styles = StyleSheet.create({
    imageContainer: {
        alignItems: 'center',
        paddingTop: responsiveHeight(4)
    },
    imageStyle: {
        borderRadius: 100,
        height: responsiveHeight(20),
        borderWidth: 3,
        borderColor: Colors.white,
        width: responsiveHeight(20)
    },
    inputContainer: {
        paddingTop: responsiveHeight(7),
        alignItems: 'center',
    },
    inputStyle: {
        width: responsiveWidth(88),
        marginBottom: responsiveHeight(4)
    },
    imageWrapper: {
        borderWidth: 1,
        borderRadius: 10,
        height: responsiveHeight(6.5),
        marginBottom: responsiveHeight(4),
        width: responsiveWidth(88),
        justifyContent: 'center',
        borderColor: Colors.white
    },
    companyImageStyle: {
        height: responsiveHeight(4),
        alignSelf: 'center',
        borderRadius: 10,
        width: responsiveWidth(83),
    },
    textStyle: {
        color: '#949494',
        fontSize: responsiveFontSize(2.5)
    }
})