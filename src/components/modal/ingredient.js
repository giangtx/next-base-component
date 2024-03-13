import React, { useState, useEffect } from "react";
import { useIngredient } from "@hooks/useIngredient";
import { fetchIngredientsApi } from "@services/ingredients";
import Dragable from "@components/common/dragable/dragable";
import { BASE_URL } from "@utils/apiUtils";

const ModalIngredient = ({ id }) => {

    const { createIngredient, updateIngredient, fetchIngredientById, ingredient } = useIngredient();
    const [ingredients, setIngredients] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [featuredImage, setFeaturedImage] = useState('')
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetchIngredientById(id);
        // fetchIngredientsApi(1).then(res => {
        //     setIngredients(res.results || []);
        // })
    }, []);

    const getImagePreview = () => {
        if (!featuredImage) {
            if (ingredients.featured_img) {
                return BASE_URL + '/storage/desktop/' + ingredients.featured_img;
            }
            return 'https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg';
        }
        return URL.createObjectURL(featuredImage);
    }

    useEffect(() => {
        if (id) {
            setName(ingredient?.name);
            setDescription(ingredient?.description);
            setContent(ingredient?.content);
        } else {
            setName("");
            setDescription("");
            setContent("");
        }

    }, [ingredient]);

    const handleCreate = async() => {
        await createIngredient({
            name: name,
            description: description,
            content: content,
            featured_img: featuredImage,
        })
    }

    const handleUpdate = async() => {
        await updateIngredient({
            id: id,
            name: name,
            description: description,
            content: content,
            featured_img: featuredImage,
        })
    }

    return (
        <div className="">
            <div>
                <div className="mb-3">
                    <div className="mb-1">Ingredient name</div>
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
                    <div className="mb-1">Description</div>
                    <div className="search-bar-box">
                        <textarea
                            className="w-full"
                            rows="2"
                            value={description || ""}
                            onChange={(e) => {setDescription(e.target.value)}}
                        ></textarea>
                    </div>
                </div>
                <div className="my-3">
                    <div className="mb-1">Feature image</div>
                    <div className=''>
                        <div
                            className='h-6 overflow-hidden featured-image-preview cursor-pointer'
                            onClick={() => {
                                document.getElementById('featured-image-file').click();
                            }}
                        >
                            <img className="h-full w-auto" src={getImagePreview()} alt='featured image' />
                        </div>
                        <input
                            id="featured-image-file"
                            type='file'
                            style={{display: "none"}}
                            onChange={(e) => {
                                setFeaturedImage(e.target.files[0]);
                            }}
                        ></input>
                    </div>
                </div>
                <Dragable
                    details={details}
                    setDetails={setDetails}
                />
            </div>
            <div className="callback-btn mt-4">
                <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-1">
                        <button className="my-out-line-btn w-full">Cancel</button>
                    </div>
                    { id ? (
                        <div className="col-span-1">
                            <button onClick={() => {handleUpdate()}} className="my-btn-pr w-full">Update ingredient</button>
                        </div>) : (
                        <div className="col-span-1">
                            <button onClick={() => {handleCreate()}} className="my-btn-pr w-full">Add new ingredient</button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}

export default ModalIngredient;