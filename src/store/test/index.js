import { createSlice } from "@reduxjs/toolkit";

import initialState from "./post.state";
import reducer from "./post.reducer";

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: reducer,
});

export default postSlice.reducer;