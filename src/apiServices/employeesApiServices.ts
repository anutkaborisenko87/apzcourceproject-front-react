import axiosClient from "../axios-client.ts";
import {EmployeeFormData} from "./apiServicesTypes.ts";

export const getActiveEmployeesList = async (page?: number) => {
    const url = page ? `/employees/active?page=${page}` : `/employees/active`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getNotActiveEmployeesList = async (page?: number) => {
    const url = page ? `/employees/not_active?page=${page}` : `/employees/not_active`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getWorkingEmployeesList = async (page?: number) => {
    const url = page ? `/employees/working?page=${page}` : `/employees/working`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getEmployeeInfo = async (employeeId?: number) => {
    const url = `/employees/${employeeId}`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const addNewEmployeeInfo = async (payload?: EmployeeFormData) => {
    const url = `/employees/create`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.post(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const updateEmployeeInfo = async (employeeId: number,payload?: EmployeeFormData) => {
    const url = `/employees/${employeeId}/update`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.put(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deleteEmployeeInfo = async (employeeId: number) => {
    const url = `/employees/${employeeId}/delete`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.delete(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const deactivateEmployee = async (employeeId: number) => {
    const url = `/employees/${employeeId}/deactivate`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const reactivateEmployee = async (employeeId: number) => {
    const url = `/employees/${employeeId}/reactivate`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}