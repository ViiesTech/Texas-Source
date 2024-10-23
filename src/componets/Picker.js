import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
    responsiveFontSize,
    responsiveHeight,
    responsiveWidth,
} from '../globalFunctions/Responsive_Dimensions';
import SVGIcons from './SVGIcons';
import icons from '../assets/icons';
import { Colors } from '../assets/Utils/Colors';

const Picker = ({ placeholder, items, setItems, heading }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null)

    const MyArrowDownIcon = ({ style }) => {
        return <SVGIcons image={icons.arrow} />
    }

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            containerStyle={{ width: responsiveWidth(80) }}
            dropDownContainerStyle={styles.containerStyle}
            style={styles.drop}
            placeholder={placeholder}
            placeholderStyle={styles.dropText}
            dropDownDirection="BOTTOM"
            arrowIconStyle={{ tintColor: theme.primaryGreen }}
            ArrowDownIconComponent={({ style }) => <MyArrowDownIcon style={style} />}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
        />
    );
};

export default Picker;

const styles = StyleSheet.create({
    // heading: {
    //     color: Colors.primaryGreen,
    //     fontWeight: 'bold',
    //     fontSize: responsiveFontSize(1.8),
    //     marginBottom: responsiveHeight(1),
    // },
    drop: {
        borderWidth: 1.5,
        marginBottom: responsiveHeight(3),
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: Colors.white,
        zIndex: 0,
        paddingVertical: responsiveHeight(1.8),
        borderRadius: 25,
    },

    containerStyle: {
        zIndex: 999,
    },
    dropText: {
        color: Colors.textColor,
        marginLeft: responsiveHeight(1),
    },
});
