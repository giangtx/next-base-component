import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideModal, clearModal } from "../../store/modal/modal.action";
import ModalLoading from "./loading";
import ModalCategory from "./category";
import ModalSubcate from "./subcate";
import ModalDelete from "./deletepopup";
import ModalNotice from "./notice";
import ModalIngredient from "./ingredient";
import ModalPicker from "./picker";

import { useClickOutside } from "../../hooks/dom";

const Modals = () => {
    const modalRef = useRef(null);

    const [isShow, setIsShow] = useState(false);

    const dispatch = useDispatch();

    const handleHide = () => {
        dispatch(hideModal());
    }

    const ref = useClickOutside(handleHide);
    
    const { 
        show, 
        name, 
        title, 
        position, 
        mobilePosition, 
        data,
        invisibleBackground, 
        enableClickOutside, 
        showHeader,
        confirmCallback,
        width,
    } = useSelector(state => state.modal.modal);

    const getModal = () => {
        switch (name) {
            case "category":
                return <ModalCategory id={data?.id}
                confirmCallback={confirmCallback}
                />
            case "post":
                return <ModalPost/>
            case "ingredient":
                return <ModalIngredient id={data?.id}
                />
            case "subcate":
                return <ModalSubcate id={data?.id}
                confirmCallback={confirmCallback}
                />
            case "deletepopup":
                return <ModalDelete/>
            case "loading":
                return <ModalLoading data={data} />;
            case "notice":
                return <ModalNotice data={data}/>;
            case "picker":
                return (
                    <ModalPicker
                        type={data?.type}
                    />
                );
            default:
                return <></>;
        }
    }

    useEffect(() => {
        if (modalRef.current) {
            if (show) {
                setTimeout(() => {
                    modalRef.current.classList.add("modal-open");
                    document.body.classList.add("body-hidden");
                }, name == 'loading' ? 50 : 100);
            } else {
                modalRef.current.classList.remove("modal-open");
                document.body.classList.remove("body-hidden");
                setTimeout(() => {
                    dispatch(clearModal());
                }, 300);
            }
        }
    }, [show]);

    const handleOk = () => {
        if (confirmCallback) {
            confirmCallback();
        }
        dispatch(hideModal());
    }

    return (
        <div 
            ref={modalRef} 
            className={`modal ${name ? 'modal-' + name: ''} ${isShow ? 'modal-open' : ''}`}
            data-position={position}
            data-mobile-position={mobilePosition}
        >
            <div className="modal-backdrop">
                <div 
                    className={`modal-dialog ${invisibleBackground ? 'modal-invisible-background': ''}`}
                    style={{width: width}}
                >
                    {showHeader ? (
                        <div className="modal-header">
                            {title ? (
                                <h5 className="modal-title text-black">{title}</h5>
                            ) : null}
                            <button className="close text-black" onClick={handleHide}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                    ) : null}
                    <div className="modal-body" ref={enableClickOutside ? ref : null}>
                        {getModal()}
                    </div>
                    {/*<div className="modal-footer">*/}
                    {/*    <button className="text-black" onClick={handleOk}>*/}
                    {/*        ok*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}

export default Modals;