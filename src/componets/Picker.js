import { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { responsiveHeight, responsiveWidth } from '../utils';
import { Colors } from '../assets/Utils/Colors';

const Picker = ({ placeholderText, placeholder, items, setItems,value,setValue,containerStyle,style, iconStyle, listStyle}) => {
    const [open, setOpen] = useState(false);
    // const [value, setValue] = useState(null)

    // const MyArrowDownIcon = ({ style }) => {
    //     return <SVGIcons image={icons.arrow} />
    // }

    return (
        <DropDownPicker
            open={open}
            value={value}
            items={items}
            containerStyle={[{ width: responsiveWidth(86) },containerStyle]}
            dropDownContainerStyle={[styles.containerStyle,listStyle]}
            style={[styles.drop,style]}
            placeholder={placeholder}
            placeholderStyle={[styles.dropText,placeholderText]}
            dropDownDirection="TOP"
            textStyle={{color: Colors.white,marginLeft: responsiveHeight(1.2)}}
            arrowIconStyle={[{ tintColor: Colors.white },iconStyle]}
            // ArrowDownIconComponent={({ style }) => <MyArrowDownIcon style={style} />}
            setOpen={setOpen}
            setValue={(val) => setValue(val)}
            setItems={setItems}
        />
    );
};

export default Picker;

const styles = StyleSheet.create({
    drop: {
        borderWidth: 1.5,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        borderRadius: 10,
    },
    containerStyle: {
        zIndex: 999,
        borderWidth: 1,
        height:responsiveHeight(15),
        maxHeight:responsiveHeight(15),
        borderColor: Colors.white,
        backgroundColor: Colors.secondary,
    },
    dropText: {
        color: '#949494',
        marginLeft: responsiveHeight(1),
    },
});
