import React, { useState, useEffect } from "react";
import { useCategory } from "@hooks/useCategory";
import { fetchCategoriesApi } from "@services/categories";
import { BASE_URL } from "@utils/apiUtils";

const ModalCategory = ({ id, confirmCallback }) => {

    const { createSubcategory, updateSubcategory, fetchCategoryById, category } = useCategory();
    const [categories, setCategories] = useState([]);

    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");
    const [bannerImage, setBannerImage] = useState('')

    useEffect(() => {
        fetchCategoryById(id)
        fetchCategoriesApi(1, true).then(res => {
            setCategories(res.results || []);
        })
    }, []);

    const getImagePreview = () => {
        if (!bannerImage) {
            if (categories.banner_img) {
                return BASE_URL + '/storage/desktop/' + categories.banner_img;
            }
            return 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
        }
        return URL.createObjectURL(bannerImage);
    }

    useEffect(() => {
        if (id) {
            setName(category?.name);
            setSlug(category?.slug);
            setDescription(category?.description);
        } else {
            setName("");
            setSlug("");
            setDescription("");
        }
        
    }, [category]);

    const handleClick = async() => {
        await createSubcategory({
            name: name,
            slug: slug,
            description: description,
            banner_img: bannerImage,
        })
        confirmCallback();
    }

    const handleUpdateClick = async() => {
        await updateSubcategory({
            id: id,
            name: name,
            slug: slug,
            description: description,
            banner_img: bannerImage,
        })
        confirmCallback();
    }

    return (
        <div className="">
            <div>
                <div className="mb-3">
                    <div className="mb-1">Category name</div>
                    <div className="search-bar-box">
                        <input 
                            name="category-name" 
                            id="cate-name" 
                            className="w-full" 
                            type="text"
                            placeholder="Enter name"
                            value={name || ""}
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="">
                    <div className="mb-1">Category slug</div>
                    <div className="search-bar-box">
                        <input 
                            name="category-slug" 
                            id="cate-slug" 
                            className="w-full" 
                            type="text"
                            placeholder="Enter slug"
                            value={slug || ""}
                            onChange={(e) => {setSlug(e.target.value)}}
                        />
                    </div>
                </div>
                <div className="my-3">
                    <div className="mb-1">Feature image</div>
                    <div className=''>
                        <div
                            className='h-6 overflow-hidden banner-image-preview cursor-pointer'
                            onClick={() => {
                                document.getElementById('banner-image-file').click();
                            }}
                        >
                            <img className="h-full w-auto" src={getImagePreview()} alt='banner image' />
                        </div>
                        <input
                            id="banner-image-file"
                            type='file'
                            style={{display: "none"}}
                            onChange={(e) => {
                                setBannerImage(e.target.files[0]);
                            }}
                        ></input>
                    </div>
                </div>
                <div>
                    <div className="mb-1">Desciption</div>
                    <div className="search-bar-box">
                        <textarea 
                            className="w-full" 
                            rows="5"
                            value={description || ""}
                            onChange={(e) => {setDescription(e.target.value)}}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="callback-btn">
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <button className="my-out-line-btn w-full">Cancel</button>
                    </div>
                    { id ? (
                        <div className="col-span-1">
                            <button onClick={() => {handleUpdateClick()}} className="my-btn-pr w-full">Update category</button>
                        </div>) : (
                        <div className="col-span-1">
                            <button onClick={() => {handleClick()}} className="my-btn-pr w-full">Add new category</button>
                        </div>
                    )}
                    
                </div>
            </div>
        </div>
    )
}

export default ModalCategory;