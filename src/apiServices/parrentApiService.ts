import axiosClient from "../axios-client.ts";
import {ParrentFormData} from "./apiServicesTypes.ts";

export const getSelectList = async () => {
    try {
        // @ts-ignore
        const {data} = await axiosClient.get('/parrents/for-select');
        return data;
    } catch (error) {
        throw error;
    }
}

export const getActiveParrentsList = async (page?: number) => {
    try {
        const url = page ? `/parrents/active?page=${page}` : `/parrents/active`;
        // @ts-ignore
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getNotActiveParrentsList = async (page?: number) => {
    try {
        const url = page ? `/parrents/not-active?page=${page}` : `/parrents/not-active`;
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