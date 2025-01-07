import axiosClient from "../axios-client.ts";
import {EmployeeFormData} from "./apiServicesTypes.ts";

export const getActiveEmployeesList = async ({
                                                 page,
                                                 per_page,
                                                 employee_sort_by,
                                                 sort_direction,
                                                 employee_search_by,
                                                 filter_employees_by,
                                                 search_term,
                                                 date_filter_employees_by
                                             }:
{
    page? : number,
    per_page?: string,
    employee_sort_by?: string,
    sort_direction?: string,
    employee_search_by?: string,
    filter_employees_by?: {},
    search_term?: string
    date_filter_employees_by?: {},
}) => {
    let url = page ? `/employees/active?page=${page}` : `/employees/active`;
    url = formatUrlString({
        url,
        per_page,
        employee_sort_by,
        sort_direction,
        employee_search_by,
        filter_employees_by,
        search_term,
        date_filter_employees_by
    });
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getTeachersList = async () => {
    const url = `/employees/teachers`;

    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getNotActiveEmployeesList = async ({
                                                    page,
                                                    per_page,
                                                    employee_sort_by,
                                                    sort_direction,
                                                    employee_search_by,
                                                    filter_employees_by,
                                                    search_term,
                                                    date_filter_employees_by
                                                }:
                                                    {
                                                        page? : number,
                                                        per_page?: string,
                                                        employee_sort_by?: string,
                                                        sort_direction?: string,
                                                        employee_search_by?: string,
                                                        filter_employees_by?: {},
                                                        search_term?: string
                                                        date_filter_employees_by?: {},
                                                    }) => {
    let url = page ? `/employees/not_active?page=${page}` : `/employees/not_active`;
    url = formatUrlString({
        url,
        per_page,
        employee_sort_by,
        sort_direction,
        employee_search_by,
        filter_employees_by,
        search_term,
        date_filter_employees_by
    });
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}

export const getWorkingEmployeesList = async ({
                                                  page,
                                                  per_page,
                                                  employee_sort_by,
                                                  sort_direction,
                                                  employee_search_by,
                                                  filter_employees_by,
                                                  search_term,
                                                  date_filter_employees_by
                                              }:
                                                  {
                                                      page? : number,
                                                      per_page?: string,
                                                      employee_sort_by?: string,
                                                      sort_direction?: string,
                                                      employee_search_by?: string,
                                                      filter_employees_by?: {},
                                                      search_term?: string
                                                      date_filter_employees_by?: {},
                                                  }) => {
    let url = page ? `/employees/working?page=${page}` : `/employees/working`;
    url = formatUrlString({
        url,
        per_page,
        employee_sort_by,
        sort_direction,
        employee_search_by,
        filter_employees_by,
        search_term,
        date_filter_employees_by
    });
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

export const fireEmployee = async (employeeId: number, payload?: { employee_hired: string }) => {
    const url = `/employees/${employeeId}/fire-employee`;
    // eslint-disable-next-line no-useless-catch
    try {
        const {data} = await axiosClient.post(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}

export const updateEmployeeInfo = async (employeeId: number, payload?: EmployeeFormData) => {
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

const formatUrlString = ({
                             url,
                             per_page,
                             employee_sort_by,
                             sort_direction,
                             employee_search_by,
                             filter_employees_by,
                             search_term,
                             date_filter_employees_by
                         }: {
    url: string,
    per_page?: string,
    employee_sort_by?: string,
    sort_direction?: string,
    employee_search_by?: string,
    filter_employees_by?: {},
    search_term?: string
    date_filter_employees_by?: {},
}) => {
    let respUrl = url;
    if (per_page) {
        respUrl = respUrl.includes('?') ? `${respUrl}&per_page=${per_page}` : `${respUrl}?per_page=${per_page}`;
    }
    if (employee_sort_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&employee_sort_by=${employee_sort_by}` : `${respUrl}?employee_sort_by=${employee_sort_by}`;
    }
    if (sort_direction) {
        respUrl = respUrl.includes('?') ? `${respUrl}&sort_direction=${sort_direction}` : `${respUrl}?sort_direction=${sort_direction}`;
    }
    if (employee_search_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&employee_search_by=${employee_search_by}` : `${respUrl}?employee_search_by=${employee_search_by}`
    }
    if (search_term) {
        respUrl = respUrl.includes('?') ? `${respUrl}&search_term=${search_term}` : `${respUrl}?search_term=${search_term}`
    }
    if (filter_employees_by) {
        const queryParams = new URLSearchParams();
        Object.keys(filter_employees_by).forEach((key: string): void => {
            // @ts-ignore
            const value = filter_employees_by[key];
            if (Array.isArray(value)) {
                value.forEach((item, i) => {
                    queryParams.append(`filter_employees_by[${key}][${i}]`, item);
                });
            } else {
                queryParams.append(`filter_employees_by[${key}]`, value);
            }
        });
        respUrl = respUrl.includes('?')
            ? `${respUrl}&${queryParams.toString()}`
            : `${respUrl}?${queryParams.toString()}`;
    }
    if (date_filter_employees_by) {
        const queryParams = new URLSearchParams();
        if (Object.keys(date_filter_employees_by).length > 0) {
            Object.keys(date_filter_employees_by).forEach((item: any): void => {
                // @ts-ignore
                if (Object.keys(date_filter_employees_by[item]).length > 0) {
                    // @ts-ignore
                    Object.keys(date_filter_employees_by[item]).forEach((key: string) => {
                        // @ts-ignore
                        const value = date_filter_employees_by[item][key];
                        queryParams.append(`date_filter_employees_by[${item}][${key}]`, value);

                    })
                }

            });
        }
        respUrl = respUrl.includes('?')
            ? `${respUrl}&${queryParams.toString()}`
            : `${respUrl}?${queryParams.toString()}`;
    }
    return respUrl;
}