import { configureStore } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import { Slice } from '../Slice/index';
import { Apis } from '../Services/index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, Slice.reducer);
export const store = configureStore({
    reducer: {
        persistedData: persistedReducer,
        [Apis.reducerPath]: Apis.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            immutableCheck: false,
            serializableCheck: false,
        }).concat(Apis.middleware),
});

export const persistor = persistStore(store);
