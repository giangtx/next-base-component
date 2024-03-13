import { createSlice } from '@reduxjs/toolkit';

import initialState from './modal.state';
import reducer from './modal.reducer';

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: reducer,
});

export default modalSlice.reducer;