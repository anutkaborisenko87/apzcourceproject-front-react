import axiosClient from "../axios-client.ts";
import {UserFormData} from "./apiServicesTypes.ts";

export const getUsersList = async ({page, per_page, sort_by, sort_direction, search_by, search_term}: {
    page?: number,
    per_page?: string,
    sort_by?: string,
    sort_direction?: string,
    search_by?: string,
    search_term?: string
}) => {
    let url = page ? `/users/active?page=${page}` : `/users/active`;
    url = formatUrlString({
        url,
        per_page,
        user_sort_by: sort_by,
        sort_direction,
        user_search_by: search_by,
        search_term
    })
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getNotActiveUsersList = async ({page, per_page, sort_by, sort_direction, search_by, search_term}: {
    page?: number,
    per_page?: string,
    sort_by?: string,
    sort_direction?: string,
    search_by?: string,
    search_term?: string
}) => {
    let url = page ? `/users/not_active?page=${page}` : `/users/not_active`;
    url = formatUrlString({
        url,
        per_page,
        user_sort_by: sort_by,
        sort_direction,
        user_search_by: search_by,
        search_term
    })
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deactivateUser = async (userId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(`/users/${userId}/deactivate`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const reactivateUser = async (userId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(`/users/${userId}/reactivate`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId: number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.delete(`/users/${userId}/delete`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const createNewUser = async (userFormData: UserFormData) => {
    try {
        const {data} = await axiosClient.post('/users/create', userFormData);
        return data;
    } catch (e) {
        throw e;
    }

}

export const updateUserInfo = async (userId: number, userFormData: UserFormData) => {
    try {
        const {data} = await axiosClient.put(`/users/${userId}/update`, userFormData);
        return data;
    } catch (e) {
        throw e;
    }

}

export const getUserInfo = async (userId: number) => {
    try {
        const {data} = await axiosClient.get(`/user/${userId}`);
        return data;
    } catch (e) {
        throw e;
    }
}

const formatUrlString = ({url, per_page, user_sort_by, sort_direction, user_search_by, search_term}: {
    url: string,
    per_page?: string,
    user_sort_by?: string,
    sort_direction?: string,
    user_search_by?: string,
    search_term?: string
}) => {
    let respUrl = url;
    if (per_page) {
        respUrl = respUrl.includes('?') ? `${respUrl}&per_page=${per_page}` : `${respUrl}?per_page=${per_page}`;
    }
    if (user_sort_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&user_sort_by=${user_sort_by}` : `${respUrl}?sort_by=${user_sort_by}`;
    }
    if (sort_direction) {
        respUrl = respUrl.includes('?') ? `${respUrl}&sort_direction=${sort_direction}` : `${respUrl}?sort_direction=${sort_direction}`;
    }
    if (user_search_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&user_search_by=${user_search_by}` : `${respUrl}?user_search_by=${user_search_by}`;
    }
    if (search_term) {
        respUrl = respUrl.includes('?') ? `${respUrl}&search_term=${search_term}` : `${respUrl}?search_term=${search_term}`;
    }
    return respUrl;
}