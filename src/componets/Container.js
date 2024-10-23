import { ImageBackground } from 'react-native'
import React from 'react'
import { Images } from '../assets/Images/Index'

const Container = ({ children }) => {
    return (
        <ImageBackground style={{ flex: 1 }} source={Images.background}>
            <ImageBackground style={{ flex: 1 }} source={Images.layer2}>
                {children}
            </ImageBackground>
        </ImageBackground>
    )
}

export default Container
