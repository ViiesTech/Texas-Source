import React from 'react';
import { StyleSheet, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Colors } from '../assets/Utils/Colors';


const SpinLoader = ({ ...props }) => {

    const {
        handleSpinner
    } = props

    return (
        <View style={styles.container}>
            <Spinner
                visible={handleSpinner}
                color={Colors.white}
                textContent={'Loading...'}
                textStyle={styles.spinnerTextStyle}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    spinnerTextStyle: {
        color: Colors.white,
        fontSize: 25
    },
    container: {
        flexGorw: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    }
});

export default SpinLoader;
