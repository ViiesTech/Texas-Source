import { useState } from 'react';
import { StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { responsiveHeight, responsiveWidth } from '../utils';
import { Colors } from '../assets/Utils/Colors';

const Picker = ({ placeholder, items, setItems,value,setValue}) => {
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
            containerStyle={{ width: responsiveWidth(86) }}
            dropDownContainerStyle={styles.containerStyle}
            style={styles.drop}
            placeholder={placeholder}
            placeholderStyle={styles.dropText}
            dropDownDirection="BOTTOM"
            textStyle={{color: Colors.white,marginLeft: responsiveHeight(1.2)}}
            arrowIconStyle={{ tintColor: Colors.white }}
            // ArrowDownIconComponent={({ style }) => <MyArrowDownIcon style={style} />}
            setOpen={setOpen}
            setValue={(val) => setValue(val)}
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
        // marginBottom: responsiveHeight(3),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: Colors.white,
        zIndex: 0,
        // paddingVertical: responsiveHeight(1.8),
        borderRadius: 10,
    },

    containerStyle: {
        zIndex: 999,
        // paddingBottom: responsiveHeight(12),
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
