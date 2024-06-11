import axiosClient from "../axios-client.ts";

export const getUsersList = async (page?: number) => {
    const url = page ? `/users/active?page=${page}` : `/users/active`;

    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axiosClient.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deactivateUser = async (userId:number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axiosClient.get(`/users/${userId}/deactivate`);
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const deleteUser = async (userId:number) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const response = await axiosClient.delete(`/users/${userId}/delete`);
        return response.data;
    } catch (error) {
        throw error;
    }
}
