import axiosClient from "../axios-client.ts";
import {UserFormData} from "./apiServicesTypes.ts";

export const getUsersList = async (page?: number) => {
    const url = page ? `/users/active?page=${page}` : `/users/active`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getNotActiveUsersList = async (page?: number) => {
    const url = page ? `/users/not_active?page=${page}` : `/users/not_active`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deactivateUser = async (userId:number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(`/users/${userId}/deactivate`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const reactivateUser = async (userId:number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(`/users/${userId}/reactivate`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId:number) => {
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
