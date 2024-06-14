import axiosClient from "../axios-client.ts";
export const getChildrenListForSelect = async () => {
    try {
        const {data} = await axiosClient.get('/children/for-select');
        return data;
    } catch (error) {
        throw error;
    }
}