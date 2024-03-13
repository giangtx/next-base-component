import React, { useState, Children, cloneElement, useEffect, useRef } from "react";
import { useWindowSize } from "../../hooks/dom";

const Slider = ({
    configs,
    children
}) => {

    const ref = useRef(null);
    const refWrp = useRef(null);
    const refContent = useRef(null);
    const refProcess = useRef(null);

    const defaultConfigs = {
        sliderPerRow: 3,
        sliderPerRowMobile: 2.5,
        allowDrag: true,
        duration: 400,
        auto: false,
        autoDuration: 1000,
        gap: 10,
        gapMobile: 10,
        process: false,
    }

    // toán tử spread (...) để tạo một bản sao của tất cả các thuộc tính trong đối tượng defaultConfigs
    // Thuộc tính configs cùng tên sẽ ghi đè thuộc tính defaultConfigs
    configs = { ...defaultConfigs, ...configs }

    //Khai báo các biến với giá trị ban đầu bằng 0
    //active: vị trí slide hiện tại
    const [active, setActive] = useState(0);
    //khai báo biến trạng thái của hai nút
    const [disableNext, setDisableNext] = useState(false);
    const [disablePrev, setDisablePrev] = useState(true);

    //API children (module trong React): thành phần con của một thành phần (component)
    const countChildren = Children.count(children);

    const autoSlideTimeout = useRef(null);

    //Nếu độ rộng của trình duyệt > 768 => sliderPerRow = sliderPerRow (3) còn không thì sẽ là sliderPerMobile (2.5)
    //dùng configs để ghi đè giá trị tương ứng của defaultConfigs
    let sliderPerRow = window?.outerWidth > 768 ? configs.sliderPerRow : configs.sliderPerRowMobile;
    let scrollLeft = refContent.current?.scrollLeft;

    //Tính toán số lượng slide tối đa có thể di  (tổng số slide - số slide hiển thị/ row)
    let maxSlide = countChildren > sliderPerRow ? countChildren - sliderPerRow : sliderPerRow;
    //Tính toán kích thước của một slide (100% / số slide hiển thị trên một hàng)
    let gap = window?.outerWidth > 768 ? configs.gap : configs.gapMobile;

    useEffect(() => {
        handleResize();
    }, [window.outerWidth]);
    

    //giá trị trong hàm callback (active) thay đổi thì hàm callback sẽ được gọi tới để kích hoạt hàm runSlider
    useEffect(() => {
        runSlider();
    }, [active])

    useEffect(() => {
        //sự kiến lắng nghe để biết nếu cửa sổ trình duyệt resize thì hàm handleResize sẽ được gọi tới
        // window.addEventListener('resize', handleResize);
        window.addEventListener('orientationchange', handleResize);
        if (refProcess.current) {
            console.log();
            refProcess.current.style.width = `${(100 / countChildren) * sliderPerRow}%`;
        }
        refContent.current.addEventListener('scroll', handleScroll);

        //loại bỏ sử kiện, lý do thì chưa biết
        return () => {
            window.removeEventListener('resize', handleResize, false)
            window.removeEventListener('orientationchange', handleResize, false)
            if(refContent.current) refContent.current.removeEventListener('scroll', handleScroll, false)
        };
    }, [])

    useEffect(() => {
        runSlider();
    }, [countChildren])

    const handleScroll = () => {
        scrollLeft = refContent.current?.scrollLeft;
        if (refProcess.current) {
            const scrollPercent = (scrollLeft + refContent.current.clientWidth) / refContent.current.scrollWidth * 100;
            refProcess.current.style.width = `${scrollPercent}%`;
        }
        resolveButton();
    }

    //hàm handleResize
    const handleResize = () => {
        //tính số lượng slide sẽ hiển thị trên một hàng, cách tính như ở trên
        //configs ghi đè thuộc tính của defaultConfigs width trình duyệt > 768
        sliderPerRow = window.innerWidth > 768 ? configs.sliderPerRow : configs.sliderPerRowMobile;
        maxSlide = countChildren > sliderPerRow ? countChildren - sliderPerRow : sliderPerRow;
        gap = window.innerWidth > 768 ? configs.gap : configs.gapMobile;
        runSlider();
    }

    //hàm run slider
    const runSlider = () => {
        let slides = ref.current.children;
        if (slides.length === 0) return;
        // Cập nhật chiều rộng của slider container
        ref.current.style.width = `calc(${(countChildren / sliderPerRow) * 100 + '%'} + ${(gap * maxSlide) / sliderPerRow + 'px'})`;
        if (slides[active]) {
            refContent.current.scrollTo({
                left:
                    slides[active].offsetLeft -
                    parseInt(getComputedStyle(refContent.current).paddingLeft),
                behavior: "smooth",
            });
        }
        

        //nếu có auto slide thì thiết lập timeout
        if (configs.auto) {
            autoSlideTimeout.current = setTimeout(() => {
                //nếu active < số slide còn lại -> cập nhật giá trị active bằng setactive (active + 1)
                if (active < maxSlide) {
                    setActive(active + 1);

                } else {
                    setActive(0);
                }
            }, configs.autoDuration)
        }
    }

    const resolveButton = () => {
        console.log(isDisablePrev())
        if (isDisablePrev()) {
            setDisablePrev(true);
        } else {
            setDisablePrev(false);
        }
        
        if (isDisableNext()) {
            setDisableNext(true);
        } else {
            setDisableNext(false);
        }
    }

    const isDisablePrev = () => {
        if (scrollLeft <= 0) {
            return true;
        }
        return false;
    }

    const isDisableNext = () => {
        if (scrollLeft >= refContent.current.scrollWidth - refContent.current.offsetWidth) {
            return true;
        }
        return false;
    }

    const getActive = () => {
        return Math.round(refContent.current.scrollLeft / refContent.current.scrollWidth * countChildren);
    }
    //
    const nextSlide = () => {
        const activeSlide = getActive();
        if (active < maxSlide) {
            setActive(activeSlide + 1);
        }
        if (active === maxSlide && !isDisableNext()) {
            setActive(maxSlide);
        }
    }

    const prevSlide = () => {
        const activeSlide = getActive();
        if (activeSlide > 0) {
            setActive(activeSlide - 1);
        }
        if (activeSlide === 0 && !isDisablePrev()) {
            setActive(0);
        }
    }

    const changeSlide = (target) => {
        if (target >= 0 && target <= maxSlide + 1) {
            setActive(target);
        } else if (target < 0) {
            setActive(0);
        } else {
            setActive(children.length - 1);
        }
    }
    return (
        <div
            className="slider-wrp"
            ref={refWrp}
        >   <div className="overflow-hidden">
                <div className="slider-content" ref={refContent}>
                    <div
                        className="slider-items"
                        ref={ref}
                        style={{ 
                            width: `var(${(countChildren / configs.sliderPerRow) * 100}% + ${(gap * maxSlide) / configs.sliderPerRow}px)`, 
                            "--transition-duration": `${configs.duration ?? 400}ms`,
                            "--slide-gap": `${configs.gap ?? 0}px`,
                            "--slide-gap-mobile": `${configs.gapMobile ?? 0}px`,
                        }}
                    >
                        {Children.map(children, (child, index) => {
                            return cloneElement(child, {
                                className: `slider-item ${child.props.className} ${active === index ? 'slide-active' : ''}`,
                            })
                        })}
                    </div>
                </div>
            </div>

            <div className="slider-control">
                <div className={`prev-button ${ disablePrev ? 'btn-disable': '' }`}>
                    <button className="my-prev-btn bg-white dark:bg-black" onClick={prevSlide}>
                        <img className="w-full icon-sm dark:hidden" src="/img/icon/chevron-left-black.svg" alt="smile" loading="lazy"/>
                        <img className="w-full icon-sm hidden dark:block" src="/img/icon/chevron-left.svg" alt="smile" loading="lazy"/>
                    </button>
                </div>
                <div className={`next-button ${ disableNext ? 'btn-disable': ''}`}>
                    <button className="my-next-btn bg-white dark:bg-black" onClick={nextSlide}>
                        <img className="w-full icon-sm dark:hidden" src="/img/icon/chevron-right-black.svg" alt="smile" loading="lazy"/>
                        <img className="w-full icon-sm hidden dark:block" src="/img/icon/chevron-right.svg" alt="smile" loading="lazy"/>
                    </button>
                </div>
            </div>
            {configs.process && (
                <div className="slider-process" >
                    <div ref={refProcess} className="process-wrp bg-black dark:bg-white" ></div>
                </div>
            )}
        </div>
    )
}

export default Slider;