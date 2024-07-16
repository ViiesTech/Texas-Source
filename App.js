import { View, Text, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import Routes from './src/routes/Routes';

const App = () => {
    const Wrapper = Platform.OS === 'ios' ? SafeAreaView : View;

    return (
        <Wrapper style={{ flex: 1 }}>
            <Routes/>
        </Wrapper>
    );
}

export default App;