import React from "react";

const ModalNotice = ({ data }) => {
    return (
        <>
            <div className="text-center text-black">{ data?.message }</div>
        </>
    )
}

export default ModalNotice;