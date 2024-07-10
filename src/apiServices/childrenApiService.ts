import axiosClient from "../axios-client.ts";
import {ChildFormData} from "./apiServicesTypes.ts";
export const getChildrenListForSelect = async (parrentId?: number) => {
    try {
        const url = parrentId ? `/children/for-select/${parrentId}` : `/children/for-select`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getChildrenListForGroupSelect = async () => {
    try {
        const url = `/children/for-group-select`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getAllChildrenList = async (page?: number) => {
    try {
        const url = page ? `/children/all?page=${page}` : `/children/all`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getForEnrolmentChildrenList = async (page?: number) => {
    try {
        const url = page ? `/children/for-enrolment?page=${page}` : `/children/for-enrolment`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getInTrainingChildrenList = async (page?: number) => {
    try {
        const url = page ? `/children/in-training?page=${page}` : `/children/in-training`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getGraduatedChildrenList = async (page?: number) => {
    try {
        const url = page ? `/children/graduated?page=${page}` : `/children/graduated`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getChildInfo = async (childId?: number) => {
    try {
        const url = `/children/${childId}`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const createChildInfo = async (payload?: ChildFormData) => {
    try {
        const url = `/children/create`;
        const {data} = await axiosClient.post(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}
export const updateChildInfo = async (childId?: number, payload?: ChildFormData) => {
    try {
        const url = `/children/${childId}/update`;
        const {data} = await axiosClient.put(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}
export const deleteChildInfo = async (childId?: number) => {
    try {
        const url = `/children/${childId}/delete`;
        const {data} = await axiosClient.delete(url);
        return data;
    } catch (error) {
        throw error;
    }
}