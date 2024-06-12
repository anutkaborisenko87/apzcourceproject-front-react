import axiosClient from "../axios-client.ts";

export const getProfileInfo = async () => {
    try {
        const { data } = await axiosClient.get('/user/profile');
        return data;
    } catch (error) {
        throw error;
    }
}