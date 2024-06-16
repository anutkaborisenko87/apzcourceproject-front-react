import axiosClient from "../axios-client.ts";
export const getChildrenListForSelect = async (parrentId?: number) => {
    try {
        const url = parrentId ? `/children/for-select/${parrentId}` : `/children/for-select`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}