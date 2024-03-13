import React, {useEffect, useState} from "react";
import { fetchCategoriesApi } from "@services/categories";
import { useCategory } from '@hooks/useCategory';
import { BASE_URL } from "@utils/apiUtils";

const ModalSubcate = ({ id, confirmCallback }) => {

    const { createSubcategory, updateSubcategory, fetchCategoryById, category } = useCategory();
    const [categories, setCategories] = useState([]);

    const [selectedCategories, setSelectedCategories] = useState(null);

    const [name, setName] = useState('');
    const [slug, setSlug] = useState('');
    const [description, setDescription] = useState('');
    const [featuredImage, setFeaturedImage] = useState('');

    useEffect(() => {
        fetchCategoryById(id)
        fetchCategoriesApi(1, false).then(res => {
            setCategories(res.results || []);
        })
    }, []);

    const getImagePreview = () => {
        if (!featuredImage) {
            if (category?.featured_img) {
                return BASE_URL + '/storage/desktop/' + category.featured_img;
            }
            return 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
        }
        return URL.createObjectURL(featuredImage);
    }

    useEffect(() => {
        console.log(categories);
        if (id) {
            setName(category.name || '');
            setSlug(category.slug || '');
            setDescription(category.description || '');
        }
        else {
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
            featured_img: featuredImage,
            parent_id: selectedCategories,
        })
        confirmCallback();
    }

    const handleUpdate = async() => {
        await updateSubcategory({
            id: id,
            name: name,
            slug: slug,
            description: description,
            featured_img: featuredImage,
        })
        confirmCallback();
    }

    const handleChangeCategory = (e) => {
        const { value } = e.target;
        if (value) {
            setSelectedCategories(parseInt(value));
        }
    }

    return (
        <div>
            <div>
                <div className="">
                    <div className="mb-1">Sub-category name</div>
                    <div className="search-bar-box">
                        <input
                            onChange={(e) => {setName(e.target.value)}}
                            value={name || ""}
                            name="category-name" id="cate-name" className="w-full" type="text"
                               placeholder="Enter name"/>
                    </div>
                </div>
                <div className="my-3">
                    <div className="mb-1">Slug</div>
                    <div>
                        <input
                        className="w-fulll"
                        onChange={(e) => {setSlug(e.target.value)}}
                        value={slug || ""}
                        placeholder="Enter slug"
                        type="text"
                        />
                    </div>
                </div>
                <div className="">
                    <div className="mb-1">Category</div>
                    <div className="">
                        <select className="sl-box"
                                onChange={handleChangeCategory}
                                value={category?.parent_id}
                        >
                            <option defaultValue value=''>Choose category</option>
                            {
                                categories.map((item, index) => (
                                    <option key={index} value={item.id}>{item.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
                <div className="my-3">
                    <div className="mb-1">Feature image</div>
                    <div className=''>
                        <div
                            className='h-6 overflow-hidden feature-image-preview cursor-pointer'
                            onClick={() => {
                                document.getElementById('feature-image-file').click();
                            }}
                        >
                            <img className="h-full w-auto" src={getImagePreview()} alt='feature image' />
                        </div>
                        <input
                            id="feature-image-file"
                            type='file'
                            style={{display: "none"}}
                            onChange={(e) => {
                                setFeaturedImage(e.target.files[0]);
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
                            placeholder="Enter description"
                            onChange={(e) => {setDescription(e.target.value)}}
                            value={description || ""}
                        ></textarea>
                    </div>
                </div>
            </div>
            <div className="callback-btn">
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <button className="my-out-line-btn w-full">Cancel</button>
                    </div>
                    {id ? (
                        <div className="col-span-1">
                            <button onClick={() => {handleUpdate()}} className="my-btn-pr w-full">Update</button>
                        </div>) : (
                        <div className="col-span-1">
                            <button onClick={() => {handleClick()}} className="my-btn-pr w-full">Create</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ModalSubcate;