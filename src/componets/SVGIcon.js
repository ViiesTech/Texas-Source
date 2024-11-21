import React from 'react';
import { SvgXml } from "react-native-svg";


export default ({ image, width,style }) => {
    return (
        <SvgXml xml={image} width={width || 24}
            style={style}
        />
    )
}