import axiosClient from "../axios-client.ts";
import {ParrentFormData} from "./apiServicesTypes.ts";

export const getSelectList = async (childId?: number) => {
    try {
        const url = childId ? `/parrents/for-select/${childId}` : '/parrents/for-select'
        // @ts-ignore
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getActiveParrentsList = async ({
                                                page,
                                                per_page,
                                                parrent_sort_by,
                                                sort_direction,
                                                parrent_search_by,
                                                filter_parrents_by,
                                                search_term
                                            }:
                                            {
                                                page?: number,
                                                per_page?: string,
                                                parrent_sort_by?: string,
                                                sort_direction?: string,
                                                parrent_search_by?: string,
                                                filter_parrents_by?: {},
                                                search_term?: string
                                            }) => {
    try {
        let url = page ? `/parrents/active?page=${page}` : `/parrents/active`;
        url = formatUrlString({
            url,
            per_page,
            parrent_sort_by,
            sort_direction,
            parrent_search_by,
            filter_parrents_by,
            search_term
        });
        // @ts-ignore
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getNotActiveParrentsList = async ({
                                                   page,
                                                   per_page,
                                                   parrent_sort_by,
                                                   sort_direction,
                                                   parrent_search_by,
                                                   filter_parrents_by,
                                                   search_term
                                               }:
                                               {
                                                   page?: number,
                                                   per_page?: string,
                                                   parrent_sort_by?: string,
                                                   sort_direction?: string,
                                                   parrent_search_by?: string,
                                                   filter_parrents_by?: {},
                                                   search_term?: string
                                               }) => {
    try {
        let url = page ? `/parrents/not-active?page=${page}` : `/parrents/not-active`;
        url = formatUrlString({
            url,
            per_page,
            parrent_sort_by,
            sort_direction,
            parrent_search_by,
            filter_parrents_by,
            search_term
        });
        // @ts-ignore
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getParrentInfo = async (parrentId: number) => {
    try {
        const url = `/parrents/${parrentId}`;
        // @ts-ignore
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deactivateParrent = async (parrentId: number) => {
    try {
        const url = `/parrents/${parrentId}/deactivate`;
        // @ts-ignore
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const reactivateParrent = async (parrentId: number) => {
    try {
        const url = `/parrents/${parrentId}/reactivate`;
        // @ts-ignore
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const createParrentInfo = async (payload: ParrentFormData) => {
    try {
        const url = `/parrents/create`;
        // @ts-ignore
        const {data} = await axiosClient.post(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const updateParrentInfo = async (parrentId: number, payload: ParrentFormData) => {
    try {
        const url = `/parrents/${parrentId}/update`;
        // @ts-ignore
        const {data} = await axiosClient.put(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteParrentInfo = async (parrentId: number) => {
    try {
        const url = `/parrents/${parrentId}/delete`;
        // @ts-ignore
        const {data} = await axiosClient.delete(url);
        return data;
    } catch (error) {
        throw error;
    }
}

const formatUrlString = ({
                             url,
                             per_page,
                             parrent_sort_by,
                             sort_direction,
                             parrent_search_by,
                             filter_parrents_by,
                             search_term
                         }: {
    url: string,
    per_page?: string,
    parrent_sort_by?: string,
    sort_direction?: string,
    parrent_search_by?: string,
    filter_parrents_by?: {},
    search_term?: string
}) => {
    let respUrl = url;
    if (per_page) {
        respUrl = respUrl.includes('?') ? `${respUrl}&per_page=${per_page}` : `${respUrl}?per_page=${per_page}`;
    }
    if (parrent_sort_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&parrent_sort_by=${parrent_sort_by}` : `${respUrl}?parrent_sort_by=${parrent_sort_by}`;
    }
    if (sort_direction) {
        respUrl = respUrl.includes('?') ? `${respUrl}&sort_direction=${sort_direction}` : `${respUrl}?sort_direction=${sort_direction}`;
    }
    if (parrent_search_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&parrent_search_by=${parrent_search_by}` : `${respUrl}?parrent_search_by=${parrent_search_by}`
    }
    if (search_term) {
        respUrl = respUrl.includes('?') ? `${respUrl}&search_term=${search_term}` : `${respUrl}?search_term=${search_term}`
    }
    if (filter_parrents_by) {
        const queryParams = new URLSearchParams();
        Object.keys(filter_parrents_by).forEach((key: string): void => {
            // @ts-ignore
            const value = filter_parrents_by[key];
            if (Array.isArray(value)) {
                value.forEach((item, i) => {
                    queryParams.append(`filter_parrents_by[${key}][${i}]`, item);
                });
            } else {
                queryParams.append(`filter_parrents_by[${key}]`, value);
            }
        });
        respUrl = respUrl.includes('?')
            ? `${respUrl}&${queryParams.toString()}`
            : `${respUrl}?${queryParams.toString()}`;
    }
    return respUrl;
}