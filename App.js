import { View, Text, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import Routes from './src/routes/Routes';
import Toast from 'react-native-toast-message';

const App = () => {
    const Wrapper = Platform.OS === 'ios' ? SafeAreaView : View;

    return (
        <Wrapper style={{ flex: 1 }}>
            <Routes/>
            <Toast />
        </Wrapper>
    );
}

export default App;