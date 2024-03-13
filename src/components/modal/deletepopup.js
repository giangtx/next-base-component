import React from "react";

const ModalDelete = () => {
    return(
        <div className="">
            <div className="heading_4 mb-3">Are you sure?</div>
            <div className="mb-4">This action can not be undone. All values associated with this field will be lost</div>
            <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="col-span-1">
                    <button className="my-out-line-btn dark:border-ccc w-full" type="submit">Cancel</button>
                </div>
                <div className="col-span-1">
                    <button className="my-out-line-btn dark:text-white dark:bg-black w-full" type="submit">Delete field</button>
                </div>
            </div>
        </div>
    )
}

export default ModalDelete;