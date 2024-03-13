import { getApi, postApiAdmin } from "@utils/apiUtils";

export const fetchIngredientsApi = async (page = 1, has_parent = null) => {
    const response = await getApi("/ingredients", {
        page,
        limit: 10,
        has_parent,
    });
    return response.data;
};

export const getIngredientByIdApi = async (id) => {
    return await getApi(`/ingredients/${id}`);
}

export const updateIngredientApi = async (id, data) => {
    return await postApiAdmin(`/ingredients/${id}`, data, {
        "Content-Type": "multipart/form-data"
    });
}

export const createIngredientApi = async (data) => {
    return await postApiAdmin("/ingredients", data, {
        "Content-Type": "multipart/form-data"
    });
}