import React, { useState, useEffect } from "react";
import Dragable from "@components/common/dragable/dragable";

const TestDrag = () => {
    const [details, setDetails] = useState([
        {
            id: 1,
            name: "test 1",
            content: "content 1"
        },
        {
            id: 2,
            name: "test 2",
            content: "content 2"
        },
        {
            id: 3,
            name: "test 3",
            content: "content 3"
        },
        {
            id: 4,
            name: "test 4",
            content: "content 4"
        },
    ]);

    return (
        <div className="p-8">
            {details.map((item, index) => (
                item.name
            )).join(", ")}
            <Dragable 
                details={details} 
                setDetails={setDetails} 
            />
        </div>
    )
}

export default TestDrag;
