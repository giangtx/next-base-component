import { useDispatch, useSelector } from "react-redux";
import { showModal, hideModal, addToastAction, removeToastAction } from "../store/modal/modal.action";

export const useModal = () => {

    const { toasts } = useSelector((state) => state.modal);

    const dispatch = useDispatch();

    const show = (modalConfig) => {
        dispatch(showModal(modalConfig));
    };

    const hide = () => {
        dispatch(hideModal());
    };

    const showLoading = (message) => {
        dispatch(showModal({
            name: "loading",
            data: {
                message,
            },
            invisibleBackground: true,
            enableClickOutside: false,
            showHeader: false,
        }));
    };

    const addToast = (message, type = "success") => {
        dispatch(addToastAction({
            id: Date.now(),
            message,
            type,
        }));
    };

    const removeToast = (id) => {
        dispatch(removeToastAction(id));
    };

    return {
        toasts,
        show,
        hide,
        showLoading,
        addToast,
        removeToast,
    };
}