import React, { useState } from "react";

const Dragable = ({ details, setDetails }) => {

    const [editIndex, setEditIndex] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleStartDrag = (e, index) => {
        setIsDragging(true);
        setEditIndex(null);
        let dragList = document.querySelector('.dragable-list');
        let dragItemWrps = document.querySelectorAll('.dragable-item');
        let dragItemWrp = e.target.closest('.dragable-item');
        let oldIndex = parseInt(dragItemWrp.getAttribute('order'));
        
        dragItemWrp.style.height = dragItemWrp.offsetHeight > 50 ? 50 : dragItemWrp.offsetHeight + 'px';

        let holderItem = e.target.closest('.drag-item');

        holderItem.style.width = dragItemWrp.offsetWidth + 'px';
        holderItem.style.height = dragItemWrp.offsetHeight > 50 ? 60 : dragItemWrp.offsetHeight + 10 + 'px';
        holderItem.style.top = e.clientY - holderItem.offsetHeight / 2 + 'px';
        holderItem.classList.add('dragging');
        dragItemWrp.classList.add('wrp-dragging');

        let targetItem = null;
        dragItemWrps.forEach((item) => {
            item.classList.add('drag-over');
            item.setAttribute('old-order', item.getAttribute('order'));
        })

        document.onmousemove = (e) => {
            let posY = e.clientY - (dragList.offsetTop - window.scrollY);
            holderItem.style.pointerEvents = 'none';
            let target = document.elementFromPoint(e.clientX, e.clientY);
            let targetCheck = target.closest('.dragable-item');
            if (targetCheck) {
                targetItem = targetCheck;
            }
            holderItem.style.pointerEvents = '';

            holderItem.style.top = e.clientY - holderItem.offsetHeight / 2 + 'px';
            let orderHolder = parseInt(dragItemWrp.getAttribute('order'));
            if (orderHolder != 0) {
                let beforeItem = dragItemWrps[orderHolder - 1];
                let beforeMiddle = posY < (beforeItem.offsetTop - dragList.offsetTop) + (beforeItem.offsetHeight / 2);
                if (beforeMiddle) {
                    positionItems(orderHolder - 1);
                    dragItemWrp.setAttribute('order', orderHolder - 1);
                }
            }
            if (orderHolder != dragItemWrps.length) {
                let afterItem = dragItemWrps[orderHolder + 1] ? dragItemWrps[orderHolder + 1] : dragItemWrps[orderHolder];
                let afterMiddle = posY > (afterItem.offsetTop - dragList.offsetTop) + (afterItem.offsetHeight / 2);
                if (afterMiddle) {
                    if (orderHolder + 1 < dragItemWrps.length) {
                        positionItems(orderHolder + 1);
                        dragItemWrp.setAttribute('order', orderHolder + 1);
                    }
                }
            }
        }
        document.onmouseup = (e) => {
            holderItem.classList.remove('dragging');
            holderItem.style.width = '';
            holderItem.style.height = '';
            holderItem.style.top = '';
            dragItemWrp.style.height = '';
            dragItemWrp.classList.remove('wrp-dragging');
            dragItemWrps.forEach((item) => {
                item.classList.remove('drag-over');
                item.style.transform = '';
            })
            
            
            let newDetails = JSON.parse(JSON.stringify(details));
            let tempDetails = JSON.parse(JSON.stringify(details));
            dragItemWrps.forEach((item, index) => {
                let oldOrder = parseInt(item.getAttribute('old-order'));
                let newOrder = parseInt(item.getAttribute('order'));
                if (oldOrder != newOrder) {
                    newDetails[newOrder] = tempDetails[oldOrder];
                }
                item.setAttribute('order', index);
            })

            setDetails([...newDetails]);
            setIsDragging(false);
            document.onmousemove = null;
            document.onmouseup = null;
        }
        function positionItems(insertIndex) {
            let indexCounter = 0;
            dragItemWrps.forEach((item, index) => {
                if (!item.classList.contains('wrp-dragging')) {
                    if (indexCounter == insertIndex) {
                        indexCounter++;
                    }
                    if (oldIndex <= insertIndex) {
                        if (index <= insertIndex && index >= oldIndex) {
                            item.style.transform = `translateY(-60px)`;
                        } else {
                            item.style.transform = `translateY(0)`;
                        }
                    } else {
                        if (index >= insertIndex && index < oldIndex) {
                            item.style.transform = `translateY(60px)`;
                        } else {
                            item.style.transform = `translateY(0)`;
                        }
                    }
                   
                    if (indexCounter < dragItemWrps.length) {
                        item.setAttribute('order', indexCounter);
                    }
                    indexCounter++;
                }
            })
        }
    }
    

    return (
        <div className="dragable-list">
            {details.map((detail, index) => {
                return (
                    <div
                        className="dragable-item border border-ccc border-solid p-2 mb-2" 
                        key={index}
                        order={index}
                    >
                        <div className="drag-item">
                            <div className="drag-item-content flex gap-4">
                                <div 
                                    className="drag-action-move h-4 w-4 flex items-center justify-center"
                                    // draggable
                                    onMouseDown={(e) => { handleStartDrag(e, index) }}
                                    // onDragStart={(e) => handleDragStart(e, index)}
                                    // onDragOver={(e) => handleDragOver(e)}
                                    // onDrop={(e) => handleDrop(e, index)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M8.5 7C9.32843 7 10 6.32843 10 5.5C10 4.67157 9.32843 4 8.5 4C7.67157 4 7 4.67157 7 5.5C7 6.32843 7.67157 7 8.5 7ZM8.5 13.5C9.32843 13.5 10 12.8284 10 12C10 11.1716 9.32843 10.5 8.5 10.5C7.67157 10.5 7 11.1716 7 12C7 12.8284 7.67157 13.5 8.5 13.5ZM10 18.5C10 19.3284 9.32843 20 8.5 20C7.67157 20 7 19.3284 7 18.5C7 17.6716 7.67157 17 8.5 17C9.32843 17 10 17.6716 10 18.5ZM15.5 7C16.3284 7 17 6.32843 17 5.5C17 4.67157 16.3284 4 15.5 4C14.6716 4 14 4.67157 14 5.5C14 6.32843 14.6716 7 15.5 7ZM17 12C17 12.8284 16.3284 13.5 15.5 13.5C14.6716 13.5 14 12.8284 14 12C14 11.1716 14.6716 10.5 15.5 10.5C16.3284 10.5 17 11.1716 17 12ZM15.5 20C16.3284 20 17 19.3284 17 18.5C17 17.6716 16.3284 17 15.5 17C14.6716 17 14 17.6716 14 18.5C14 19.3284 14.6716 20 15.5 20Z"></path></svg>
                                </div>
                                <div className="item-name w-full">
                                    <input 
                                        type="text" 
                                        value={detail.name} 
                                        className="w-full"
                                        onChange={(e) => {
                                            let newDetails = JSON.parse(JSON.stringify(details));
                                            newDetails[index].name = e.target.value;
                                            setDetails([...newDetails]);
                                        }}
                                        onFocus={() => { setEditIndex(index) }}
                                    />
                                </div>
                                <div className="drag-action-wrp flex gap-3">
                                    <div 
                                        className="drag-action-delete cursor-pointer h-4 w-4 flex items-center justify-center"
                                        onClick={() => {
                                            let newDetails = JSON.parse(JSON.stringify(details));
                                            newDetails.splice(index, 1);
                                            setEditIndex(null);
                                            setDetails([...newDetails]);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                                    </div>
                                </div>
                            </div>
                            <div className={`pt-1 ${index == editIndex && !isDragging ? 'block': 'hidden'}`}>
                                <textarea 
                                    value={detail.content} 
                                    className="w-full border border-ccc border-solid p-2"
                                    onChange={(e) => {
                                        let newDetails = JSON.parse(JSON.stringify(details));
                                        newDetails[index].content = e.target.value;
                                        setDetails([...newDetails]);
                                    }}
                                ></textarea>
                            </div>
                        </div>
                        
                    </div>
                )
            })}
            <div className="drag-add-item border border-ccc border-solid p-2">
                <div
                    className="flex gap-3 cursor-pointer justify-center items-center"
                    onClick={() => {
                        setDetails([...details, {name: "new", content: "new"}]);
                    }}
                >
                    <span>add item</span>
                    <div className="h-4 w-4">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2ZM12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12C4 7.58172 7.58172 4 12 4ZM11 7V11H7V13H11V17H13V13H17V11H13V7H11Z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dragable;