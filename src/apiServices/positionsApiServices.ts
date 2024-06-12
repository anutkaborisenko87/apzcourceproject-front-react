import axiosClient from "../axios-client.ts";

export const getPositionsList = async () => {
    try {
        const {data} = await axiosClient.get(`/positions`);
        return data;
    } catch (error) {
        throw error;
    }
}