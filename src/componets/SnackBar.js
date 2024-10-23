import React from 'react';
import CustomToast, { BaseToast } from 'react-native-toast-message';
import { Colors } from '../assets/Utils/Colors';
import { responsiveFontSize } from '../utils';

const SnackBar = ({ position }) => {

    const toastConfig = {
        success: (props) => (
            <BaseToast
                {...props}
                style={{ borderLeftColor: Colors.secondary, borderLeftWidth: 7 }}
                contentContainerStyle={{ paddingHorizontal: 15, backgroundColor: Colors.background }}
                text1Style={{
                    fontSize: responsiveFontSize(1.8),
                    color: Colors.secondary,
                    fontWeight: '400'
                }}
            />
        ),
    }

    return (
        <CustomToast
            config={toastConfig}
            position={position}
            visibilityTime={3000}
        />
    )

}

export default SnackBar;