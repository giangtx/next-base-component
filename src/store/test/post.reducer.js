const reducer = {
    GET_POSTS: (state, { payload }) => {
        state.posts = payload.results;
        state.paginate = payload.paginate;
    },
    GET_POST_DETAIL: (state, { payload }) => {
        state.post = payload;
    }
}

export default reducer;