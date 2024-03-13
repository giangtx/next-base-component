import React, { useEffect, useState } from 'react';
import { useImage } from '@hooks/useImage';
import { BASE_URL } from "@utils/apiUtils";
import LoadingBlur from '../../common/loading/loadingBlur';
import { useModal } from '@hooks/modal';

const ImagePicker = ({ onPick }) => {

    const { addToast } = useModal();

    const [selectedImages, setSelectedImages] = useState([]);
    const [featuredImage, setFeaturedImage] = useState('');

    const [alt, setAlt] = useState('');
    const [suggest, setSuggest] = useState('');

    const { 
        images, 
        paginate, 
        loading, 
        fetchImages, 
        loadMoreImages,
        uploadImage,
        updateImages,
        deleteImages
    } = useImage();
    
    useEffect(() => {
        if (selectedImages.length == 1) {
            setAlt(selectedImages[0].alt);
            setSuggest(selectedImages[0].suggest);
        } else {
            setAlt('');
            setSuggest('');
        }
    }, [selectedImages]);

    useEffect(() => {
        if (images.length === 0) {
            fetchImages();
        }
    }, []);

    useEffect(() => {
        setSelectedImages([]);
    }, [images]);

    const pickerContent = () => {
        return (
            <div className='grid grid-cols-6 gap-4 w-full'>
                { images.map((image, index) => (
                    <div 
                        key={index}
                        className={`picker-item ${selectedImages.includes(image) ? 'picker-selected' : ''}`}
                        onClick={() => {
                            handleSelected(image);
                        }}
                    >
                        <img src={BASE_URL + '/storage/mobile/' + image.url} alt='camera'/>    
                    </div>
                ))}
            </div>
        )
    }

    const handleSelected = (image) => {
        if (selectedImages.includes(image)) {
            setSelectedImages(selectedImages.filter((img) => img !== image));
        } else {
            setSelectedImages([
                ...selectedImages,
                image
            ]);
        }
    }

    const handleLoadMore = () => {
        loadMoreImages();
    }

    const getImagePreview = () => {
        if (!featuredImage) {
            if (selectedImages.length > 0) {
                return selectedImages.map((image, index) => {
                    if (image.url) {
                        return (
                            <div
                                key={index}
                                className='picker-item cursor-pointer'
                                onClick={() => {
                                    document.getElementById('image-picker-file').click();
                                }}
                            >
                                <img src={BASE_URL + '/storage/desktop/' + image.url} alt='feature image' />
                            </div>
                        )
                    }
                });
            } else {
                return (
                    <div 
                        className='picker-item cursor-pointer'
                        onClick={() => {
                            document.getElementById('image-picker-file').click();
                        }}
                    >
                        <img src='https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg' alt='feature image' />
                    </div>
                )
            }
        } else {
            const files = []
            for (let i = 0; i < featuredImage.length; i++) {
                files.push(featuredImage[i]);
            }
            return files.map((image, index) => {
                return (
                    <div
                        key={index}
                        className='picker-item cursor-pointer'
                        onClick={() => {
                            setUrl(URL.createObjectURL(image));
                        }}
                    >
                        <img src={URL.createObjectURL(image)} alt='feature image' />
                    </div>
                )
            });
        }
        
    }

    const handleCopy = () => {
        let result = ``;

        selectedImages.forEach((image) => {
            result += `<picture>
                    <source srcset="${BASE_URL + '/storage/mobile/' + image.url}" media="(max-width: 767px)">
                    <source srcset="${BASE_URL + '/storage/tablet/' + image.url}" media="(max-width: 1024px)">
                    <img src="${BASE_URL + '/storage/desktop/' + image.url}" alt="${image.alt}" loading="lazy">
                </picture>`;
        });

        navigator.clipboard.writeText(result);
        addToast('Link copied to clipboard', 'success');
    }

    const handleUpload = () => {
        uploadImage({
            files: featuredImage,
            alt: alt,
            suggest: suggest
        })
    }

    const handleUpdate = () => {
        updateImages({
            ids: selectedImages.map((image) => image.id),
            alt: alt,
            suggest: suggest
        })
    }

    const handleDelete = () => {
        deleteImages({
            ids: selectedImages.map((image) => image.id)
        });
    }

    return (
        <div className='image-picker-container'>
            { loading && <LoadingBlur /> }
            <div className='tab-content flex gap-4'>
                <div className='pr-4 border-r-2 w-1/5'>
                    <div className='flex'>
                        { getImagePreview()}
                        <input 
                            id="image-picker-file" 
                            type='file'
                            multiple={true}
                            style={{display: "none"}}
                            onChange={(e) => {
                                setFeaturedImage(e.target.files);
                            }}
                        ></input>
                    </div>
                    <div>
                        <div className='input-wrp'>
                            <div className="mb-1">Alt</div>
                            <div className="search-bar-box">
                                <input 
                                    name="category-slug"
                                    className="w-full" 
                                    type="text"
                                    placeholder="Enter alt"
                                    value={alt}
                                    onChange={(e) => {setAlt(e.target.value)}}
                                />
                            </div>
                        </div>
                        <div className='input-wrp'>
                            <div className="mb-1">Suggest</div>
                            <div className="search-bar-box">
                                <input 
                                    name="category-slug"
                                    className="w-full" 
                                    type="text"
                                    placeholder="Enter alt"
                                    value={suggest}
                                    onChange={(e) => {setSuggest(e.target.value)}}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full' style={{maxHeight: "60vh", overflow:"auto"}}>
                    { pickerContent() }
                    { !loading && paginate.current < paginate.last ? (
                        <div className='mt-4 flex justify-center'>
                            <button 
                                className='my-btn-pr w-full'
                                onClick={handleLoadMore}
                            >
                                Load more
                            </button>
                        </div>
                    ) : null }
                </div>
            </div>
            <div className='pt-2 border-t-2 flex gap-4 justify-end'>
                { selectedImages.length > 0 ? (
                    <>
                        <div>
                            <button 
                                className='my-btn-pr px-4'
                                onClick={() => {handleDelete()}}
                            >
                                Delete
                            </button>
                        </div>
                        <div>
                            <button 
                                className='my-btn-pr px-4'
                                onClick={() => {handleUpdate()}}
                            >
                                Update
                            </button>
                        </div>
                        <div>
                            <button 
                                className='my-btn-pr px-4'
                                onClick={() => {setSelectedImages([])}}
                            >
                                Unselect
                            </button>
                        </div>
                        <div>
                            <button 
                                className='my-btn-pr px-4'
                                onClick={() => {handleCopy()}} 
                            >
                                Copy
                            </button>
                        </div>
                    </>
                ) : null}
                { selectedImages.length == 0 ? (
                    <div>
                        <button 
                            className='my-btn-pr px-4'
                            onClick={() => {handleUpload()}}
                        >
                            Upload
                        </button>
                    </div>
                ) : null}
            </div>
        </div>
        
    )
}

export default ImagePicker;