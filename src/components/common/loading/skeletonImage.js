import React from "react";

const SkeletonImage = () => {
    return (
        <div className='animate-pulse flex space-x-4'>
            <div className='skeleton-item bg-gray w-full'></div>
        </div>
    )
}

export default SkeletonImage;