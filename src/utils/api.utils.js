import axios from "axios";

export const apiCall = async (options) => {
    return await axios(options.endpoint, {
        method: options.callMethod,
        params: options.params,
        headers: options.headers,
        data: options.data || null,
    });
};