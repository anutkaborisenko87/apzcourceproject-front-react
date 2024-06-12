import axiosClient from "../axios-client.ts";
import {CredentialsType} from "./apiServicesTypes.ts";


export const login = async (credentials: CredentialsType) => {
    try {
        return await axiosClient.post('/login', credentials);
    } catch (error) {
        throw error;
    }
}

export const logoutUser = async () => {
    try {
        return await axiosClient.get('/logout');
    } catch (error) {
        throw error;
    }
}

export const getLoggedUserInfo = async () => {
    try {
        const {data} = await axiosClient.get('/logged_user');
        return data;
    } catch (error) {
        throw error;
    }
}