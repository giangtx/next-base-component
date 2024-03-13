import React, { useRef, useEffect } from 'react';

const Scroller = ({configs, children}) => {
    
    const ref = useRef(null);

    const defaultConfigs = {
        direction: 'left',
        speed: 'fast',
    }

    configs = { ...defaultConfigs, ...configs }

    useEffect(() => {
        if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            addAnimation();
        }          
    }, [])

    const addAnimation = () => {
        if (ref.current) {
            ref.current.setAttribute("data-animated", true);

            // Make an array from the elements within `.scroller-inner`
            const scrollerInner = ref.current.querySelector(".scroller__inner");
            const scrollerContent = Array.from(scrollerInner.children);

            // For each item in the array, clone it
            // add aria-hidden to it
            // add it into the `.scroller-inner`
            scrollerContent.forEach((item) => {
                const duplicatedItem = item.cloneNode(true);
                duplicatedItem.setAttribute("aria-hidden", true);
                scrollerInner.appendChild(duplicatedItem);
            });
        }
    }

    return (
        <>
            <div ref={ref} className='scroller' data-direction={configs.direction} data-speed={configs.speed}>
                <div className="scroller__inner">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Scroller;