import { createAction } from "@reduxjs/toolkit";

// modal loading
// khai báo các action cho modal
// khi gọi action này thì sẽ gọi vao reducer tương ứng của modal để thay đổi giá trị của state
// khi sử dụng action thì cần dùng qua dispatch (useDispatch hook của react-redux)
export const showModal = createAction("modal/SHOW_MODAL");
export const hideModal = createAction("modal/HIDE_MODAL");
export const clearModal = createAction("modal/CLEAR_MODAL");
export const addToastAction = createAction("modal/ADD_TOAST");
export const removeToastAction = createAction("modal/REMOVE_TOAST");
// export const showModalLoading = createAction("modal/SHOW_MODAL_LOADING");
// export const hideModalLoading = createAction("modal/HIDE_MODAL_LOADING");
// export const setModalLoadingCallback = createAction("modal/SET_MODAL_LOADING_CALLBACK");