import axios from "axios";

export const BASE_URL = "http://localhost:8000";

export const fetchApi = axios.create({
    baseURL: BASE_URL + "/api",
    headers: {
        "Content-Type": "application/json"
    },
});

export const getApi = async (url, params, config) => {
    try {
        const response = await fetchApi.get(url, {
            params,
            headers: {
                "Content-Type": "application/json",
                ...config,
            }
        });

        return response.data;
    } catch (error) {
        if (error.response?.data) {
            return error.response?.data;
        } else {
            return {
                status: 0,
                msg: error.response?.statusText,
            };
        }
    }
};

export const postApi = async (url, data, config) => {
    try {
        const response = await fetchApi.post(url, data, {
            headers: {
                "Content-Type": "application/json",
                ...config.headers,
            }
        });

        return response.data;
    } catch (error) {
        if (error.response?.data) {
            return error.response?.data;
        } else {
            return {
                status: 0,
                msg: error.response?.statusText,
            };
        }
    }
}

export const deleteApi = async (url, config) => {
    try {
        const response = await fetchApi.delete(url, {
            headers: {
                "Content-Type": "application/json",
                ...config,
            }
        });
    } catch (error) {
        if (error.response?.data) {
            return error.response?.data;
        } else {
            return {
                status: 0,
                msg: error.response?.statusText,
            };
        }
    }
}

export const adminApi = axios.create({
    baseURL: BASE_URL + "/api/admin",
    headers: {
        "Content-Type": "application/json"
    },
});

adminApi.interceptors.request.use(
    (config) => {
        config.headers.Authorization = "Bearer " + localStorage.getItem("token");
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

adminApi.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 468 && !originalRequest._retry) {
            originalRequest._retry = true;
            const res = await getApiAdmin("/refresh");
            if (res?.access_token) {
                localStorage.setItem("token", res.access_token);
                originalRequest.headers.Authorization = "Bearer " + res.access_token;
                return adminApi(originalRequest);
            }
        } else {
            if (error.response?.data) {
                return error.response?.data;
            } else {
                return {
                    status: 0,
                    msg: error.response?.statusText,
                };
            }
        }
    }
);

export const getApiAdmin = async (url, params, config) => {
    const response = await adminApi.get(url, {
        params,
        headers: {
            "Content-Type": "application/json",
            ...config,
        }
    });

    return response?.data;
};

export const postApiAdmin = async (url, data, config) => {
    const response = await adminApi.post(url, data, {
        headers: {
            "Content-Type": "application/json",
            ...config,
        }
    });
    return response?.data;
};

export const deleteApiAdmin = async (url, config) => {
    const response = await adminApi.delete(url, {
        headers: {
            "Content-Type": "application/json",
            ...config,
        }
    });

    return response.data;
};
