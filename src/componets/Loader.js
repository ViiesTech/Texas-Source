import { ActivityIndicator  } from 'react-native'
import React from 'react'

const Loader = ({size,color,style}) => {
  return (
    <ActivityIndicator size={size} color={color} style={[{alignSelf: 'center'},style]} />
  )
}

export default Loader
