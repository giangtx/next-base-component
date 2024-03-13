// có nhiệm vụ cập giá của state
// sử dụng thông qua action
const reducer = {

    SHOW_MODAL: (state, { payload }) => {
        state.modal.show = true;
        state.modal.name = payload.name;
        state.modal.data = payload.data;
        state.modal.title = payload.title;
        state.modal.position = payload.position || '';
        state.modal.mobilePosition = payload.mobilePosition || '';
        state.modal.width = payload.width || '500px';
        if (payload.invisibleBackground !== undefined) {
            state.modal.invisibleBackground = payload.invisibleBackground;
        }
        if (payload.enableClickOutside !== undefined) {
            state.modal.enableClickOutside = payload.enableClickOutside;
        }
        if (payload.showHeader !== undefined) {
            state.modal.showHeader = payload.showHeader;
        }
        if (payload.confirmCallback !== undefined) {
            state.modal.confirmCallback = payload.confirmCallback;
        }
    },

    HIDE_MODAL: (state, {}) => {
        state.modal.show = false;
    },

    ADD_TOAST: (state, { payload }) => {
        state.toasts.push(payload);
    },

    REMOVE_TOAST: (state, { payload }) => {
        state.toasts = state.toasts.filter(t => t.id !== payload);
    },

    CLEAR_MODAL: (state, {}) => {
        state.modal.show = false;
        state.modal.name = null;
        state.modal.data = null;
        state.modal.title = null;
        state.modal.position = '';
        state.modal.mobilePosition = '';
        state.modal.invisibleBackground = false;
        state.modal.enableClickOutside = true;
        state.modal.showHeader = true;
        state.modal.width = '500px';
    }

    // SHOW_MODAL_LOADING: (state, {}) => {
    //     state.modalLoading.show = true;
    // },
    // HIDE_MODAL_LOADING: (state, {}) => {
    //     state.modalLoading.show = false;
    // },
    // SET_MODAL_LOADING_CALLBACK: (state, { payload }) => {
    //     state.modalLoading.callback = payload;
    // },
}

export default reducer;