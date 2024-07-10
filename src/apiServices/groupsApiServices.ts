import axiosClient from "../axios-client.ts";
import {GroupFormData, GroupInfoPayload} from "./apiServicesTypes.ts";

export const getGroupsListForSelect = async () => {
    try {
        const {data} = await axiosClient.get(`/groups/for-select`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getGroupsList = async () => {
    try {
        const {data} = await axiosClient.get(`/groups`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getShortGroupInfo = async (groupId: number) => {
    try {
        const {data} = await axiosClient.get(`/groups/${groupId}`);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getFullGroupInfo = async (groupId: number, payload: GroupInfoPayload) => {
    try {
        const {data} = await axiosClient.post(`/groups/${groupId}`, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const addGroupInfo = async (payload: GroupFormData) => {
    try {
        const {data} = await axiosClient.post(`/groups/create`, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const updateGroupInfo = async (groupId: number, payload: GroupFormData) => {
    try {
        const {data} = await axiosClient.put(`/groups/${groupId}/update`, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteGroupInfo = async (groupId: number) => {
    try {
        const {data} = await axiosClient.delete(`/groups/${groupId}/delete`);
        return data;
    } catch (error) {
        throw error;
    }
}