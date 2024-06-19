import axiosClient from "../axios-client.ts";

export const getGroupsList = async () => {
    try {
        const {data} = await axiosClient.get(`/groups/for-select`);
        return data;
    } catch (error) {
        throw error;
    }
}