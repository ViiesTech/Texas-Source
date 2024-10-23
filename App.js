import { View, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import Routes from './src/routes/Routes';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/Store/index.js';
import SnackBar from './src/componets/SnackBar.js';

const App = () => {
    const Wrapper = Platform.OS === 'ios' ? SafeAreaView : View;

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Wrapper style={{ flex: 1 }}>
                    <Routes />
                    <SnackBar position={'top'} />
                </Wrapper>
            </PersistGate>
        </Provider>

    );
}

export default App;