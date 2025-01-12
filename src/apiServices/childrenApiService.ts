import axiosClient from "../axios-client.ts";
import {ChildFormData} from "./apiServicesTypes.ts";
export const getChildrenListForSelect = async (parrentId?: number) => {
    try {
        const url = parrentId ? `/children/for-select/${parrentId}` : `/children/for-select`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getChildrenListForGroupSelect = async () => {
    try {
        const url = `/children/for-group-select`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getAllChildrenList = async ({
                                             page,
                                             per_page,
                                             child_sort_by,
                                             sort_direction,
                                             child_search_by,
                                             filter_childrens_by,
                                             date_filter_childrens_by,
                                             search_term
                                         }:
                                         {
                                             page?: number,
                                             per_page?: string,
                                             child_sort_by?: string,
                                             sort_direction?: string,
                                             child_search_by?: string,
                                             filter_childrens_by?: {},
                                             date_filter_childrens_by?: {},
                                             search_term?: string
                                         }) => {
    try {
        let url = page ? `/children/all?page=${page}` : `/children/all`;
        url = formatUrlString({
            url,
            per_page,
            child_sort_by,
            sort_direction,
            child_search_by,
            filter_childrens_by,
            date_filter_childrens_by,
            search_term
        });
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getForEnrolmentChildrenList = async ({
                                                      page,
                                                      per_page,
                                                      child_sort_by,
                                                      sort_direction,
                                                      child_search_by,
                                                      filter_childrens_by,
                                                      date_filter_childrens_by,
                                                      search_term
                                                  }:
                                                  {
                                                      page?: number,
                                                      per_page?: string,
                                                      child_sort_by?: string,
                                                      sort_direction?: string,
                                                      child_search_by?: string,
                                                      filter_childrens_by?: {},
                                                      date_filter_childrens_by?: {},
                                                      search_term?: string
                                                  }) => {
    try {
        let url = page ? `/children/for-enrolment?page=${page}` : `/children/for-enrolment`;
        url = formatUrlString({
            url,
            per_page,
            child_sort_by,
            sort_direction,
            child_search_by,
            filter_childrens_by,
            date_filter_childrens_by,
            search_term
        });
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getInTrainingChildrenList = async ({
                                                    page,
                                                    per_page,
                                                    child_sort_by,
                                                    sort_direction,
                                                    child_search_by,
                                                    filter_childrens_by,
                                                    date_filter_childrens_by,
                                                    search_term
                                                }:
                                                {
                                                    page?: number,
                                                    per_page?: string,
                                                    child_sort_by?: string,
                                                    sort_direction?: string,
                                                    child_search_by?: string,
                                                    filter_childrens_by?: {},
                                                    date_filter_childrens_by?: {},
                                                    search_term?: string
                                                }) => {
    try {
        let url = page ? `/children/in-training?page=${page}` : `/children/in-training`;
        url = formatUrlString({
            url,
            per_page,
            child_sort_by,
            sort_direction,
            child_search_by,
            filter_childrens_by,
            date_filter_childrens_by,
            search_term
        });
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getGraduatedChildrenList = async ({
                                                   page,
                                                   per_page,
                                                   child_sort_by,
                                                   sort_direction,
                                                   child_search_by,
                                                   filter_childrens_by,
                                                   date_filter_childrens_by,
                                                   search_term
                                               }:
                                               {
                                                   page?: number,
                                                   per_page?: string,
                                                   child_sort_by?: string,
                                                   sort_direction?: string,
                                                   child_search_by?: string,
                                                   filter_childrens_by?: {},
                                                   date_filter_childrens_by?: {},
                                                   search_term?: string
                                               }) => {
    try {
        let url = page ? `/children/graduated?page=${page}` : `/children/graduated`;
        url = formatUrlString({
            url,
            per_page,
            child_sort_by,
            sort_direction,
            child_search_by,
            filter_childrens_by,
            date_filter_childrens_by,
            search_term
        });
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const getChildInfo = async (childId?: number) => {
    try {
        const url = `/children/${childId}`;
        const {data} = await axiosClient.get(url);
        return data;
    } catch (error) {
        throw error;
    }
}
export const createChildInfo = async (payload?: ChildFormData) => {
    try {
        const url = `/children/create`;
        const {data} = await axiosClient.post(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}
export const updateChildInfo = async (childId?: number, payload?: ChildFormData) => {
    try {
        const url = `/children/${childId}/update`;
        const {data} = await axiosClient.put(url, payload);
        return data;
    } catch (error) {
        throw error;
    }
}
export const deleteChildInfo = async (childId?: number) => {
    try {
        const url = `/children/${childId}/delete`;
        const {data} = await axiosClient.delete(url);
        return data;
    } catch (error) {
        throw error;
    }
}

const formatUrlString = ({
                             url,
                             per_page,
                             child_sort_by,
                             sort_direction,
                             child_search_by,
                             filter_childrens_by,
                             date_filter_childrens_by,
                             search_term
                         }: {
    url: string,
    per_page?: string,
    child_sort_by?: string,
    sort_direction?: string,
    child_search_by?: string,
    filter_childrens_by?: {},
    date_filter_childrens_by?: {},
    search_term?: string
}) => {
    let respUrl = url;
    if (per_page) {
        respUrl = respUrl.includes('?') ? `${respUrl}&per_page=${per_page}` : `${respUrl}?per_page=${per_page}`;
    }
    if (child_sort_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&child_sort_by=${child_sort_by}` : `${respUrl}?child_sort_by=${child_sort_by}`;
    }
    if (sort_direction) {
        respUrl = respUrl.includes('?') ? `${respUrl}&sort_direction=${sort_direction}` : `${respUrl}?sort_direction=${sort_direction}`;
    }
    if (child_search_by) {
        respUrl = respUrl.includes('?') ? `${respUrl}&child_search_by=${child_search_by}` : `${respUrl}?child_search_by=${child_search_by}`
    }
    if (search_term) {
        respUrl = respUrl.includes('?') ? `${respUrl}&search_term=${search_term}` : `${respUrl}?search_term=${search_term}`
    }
    if (filter_childrens_by) {
        const queryParams = new URLSearchParams();
        Object.keys(filter_childrens_by).forEach((key: string): void => {
            // @ts-ignore
            const value = filter_childrens_by[key];
            if (Array.isArray(value)) {
                value.forEach((item, i) => {
                    queryParams.append(`filter_childrens_by[${key}][${i}]`, item);
                });
            } else {
                queryParams.append(`filter_childrens_by[${key}]`, value);
            }
        });
        respUrl = respUrl.includes('?')
            ? `${respUrl}&${queryParams.toString()}`
            : `${respUrl}?${queryParams.toString()}`;
    }
    if (date_filter_childrens_by) {
        const queryParams = new URLSearchParams();
        if (Object.keys(date_filter_childrens_by).length > 0) {
            Object.keys(date_filter_childrens_by).forEach((item: any): void => {
                // @ts-ignore
                if (Object.keys(date_filter_childrens_by[item]).length > 0) {
                    // @ts-ignore
                    Object.keys(date_filter_childrens_by[item]).forEach((key: string) => {
                        // @ts-ignore
                        const value = date_filter_childrens_by[item][key];
                        queryParams.append(`date_filter_childrens_by[${item}][${key}]`, value);

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