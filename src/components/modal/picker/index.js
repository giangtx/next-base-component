import React from "react";
import ImagePicker from "./image";

const Picker = ({ type }) => {

    const content = () => {
        switch (type) {
            case "image":
                return <ImagePicker/>
            default:
                return <></>;
        }
    }

    return (
        <div>
            { content() }
        </div>
    )
}

export default Picker;