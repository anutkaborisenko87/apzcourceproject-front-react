import axiosClient from "../axios-client.ts";

export const getRolesList = async () => {
    try {
        const {data} = await axiosClient.get(`/roles_list`);
        return data;
    } catch (error) {
        throw error;
    }
}