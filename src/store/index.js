import { configureStore  } from '@reduxjs/toolkit';

import modalReducer from './modal';

const reducer = {
    modal: modalReducer,
};

const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export default store;