import { createAction } from "@reduxjs/toolkit";

//action get post
export const fetchBlogPostsAction = createAction("post/GET_POSTS");
export const fetchBlogPostsDetailAction = createAction("post/GET_POST_DETAIL");