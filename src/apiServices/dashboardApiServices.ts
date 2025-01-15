import axiosClient from "../axios-client.ts";
type DashboardGroupReportInfo = {
    group_id: number;
    from: string;
    to: string;
};
type DashboardTeacherReportInfo = {
    teacher_id: number;
    from: string;
    to?: string;
};
type DashboardChildrenReportInfo = {
    group_id: number;
    from: string;
    to?: string;
};
export const getDashboardInfo = async () => {
    // eslint-disable-next-line no-useless-catch
    try {
        const { data } = await axiosClient.get('/dashboard');
        return data;
    } catch (error) {
        throw error;
    }
}

export const getDashboardGroupReportWord = async (dashboardGroupReportInfo: DashboardGroupReportInfo) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axiosClient.post('/dashboard/group-report-word', dashboardGroupReportInfo, {
            responseType: 'blob',
        });
    } catch (error) {
        throw error;
    }
}

export const getDashboardGroupReportExcel = async (dashboardGroupReportInfo: DashboardGroupReportInfo) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axiosClient.post('/dashboard/group-report-excel', dashboardGroupReportInfo, {
            responseType: 'blob',
        });
    } catch (error) {
        throw error;
    }
}

export const getDashboardTeacherReportWord = async (dashboardTeacherReportInfo: DashboardTeacherReportInfo) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axiosClient.post('/dashboard/educational-events-report-word', dashboardTeacherReportInfo, {
            responseType: 'blob',
        });
    } catch (error) {
        throw error;
    }
}

export const getDashboardTeacherReportExcel = async (dashboardTeacherReportInfo: DashboardTeacherReportInfo) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axiosClient.post('/dashboard/educational-events-report-excel', dashboardTeacherReportInfo, {
            responseType: 'blob',
        });
    } catch (error) {
        throw error;
    }
}

export const getDashboardChildrenReportWord = async (dashboardChildrenReportInfo: DashboardChildrenReportInfo) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axiosClient.post('/dashboard/children-report-word', dashboardChildrenReportInfo, {
            responseType: 'blob',
        });
    } catch (error) {
        throw error;
    }
}

export const getDashboardChildrenReportExcel = async (dashboardChildrenReportInfo: DashboardChildrenReportInfo) => {
    // eslint-disable-next-line no-useless-catch
    try {
        return await axiosClient.post('/dashboard/children-report-excel', dashboardChildrenReportInfo, {
            responseType: 'blob',
        });
    } catch (error) {
        throw error;
    }
}