import axiosClient from "../axios-client.ts";

export const getDashboardInfo = async () => {
    try {
        const { data } = await axiosClient.get('/dashboard');
        return data;
    } catch (error) {
        throw error;
    }
}