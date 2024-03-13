import { getApi } from "@utils/apiUtils";


export const fetcTestApi = async () => {
    const response = await getApi("/test");
    return response.data;
};