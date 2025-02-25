import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {axiosDashboardData} from "../store/dashbordSlice.ts";
import DashboardChildrenTable from "./DashboardChildrenTable.tsx";
import DashboardGroupsTable from "./DashboardGroupsTable.tsx";
import DashboardTeachersTable from "./DashboardTeachersTable.tsx";
import Modal from "./Modal.tsx";
import DashboardGroupReportForm from "./DashboardGroupReportForm.tsx";
import DashboardChildrenReportForm from "./DashboardChildrenReportForm.tsx";
import DashboardTeacherReportForm from "./DashboardTeacherReportForm.tsx";

const DashboardComponent = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoading = useSelector(state => state.dashboard.status === 'loading');
    // @ts-ignore
    const dashboardGroupToreport = useSelector(state => state.dashboard?.groupToReport ?? null);
    // @ts-ignore
    const dashboardTeacherToReport = useSelector(state => state.dashboard?.teacherToReport ?? null);
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosDashboardData());
    }, [dispatch]);
    return (
        <div className="container mx-auto">
            <div className="container mx-auto mt-10">
                <Modal>
                    {
                        dashboardGroupToreport ?
                        <DashboardGroupReportForm/>
                        :  dashboardTeacherToReport ?
                            <DashboardTeacherReportForm/>
                            :
                            <DashboardChildrenReportForm/>
                    }

                </Modal>
            </div>
            {isLoading ?
                <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
                :
                <>
                    <div className="bg-white rounded-lg shadow-md p-6 my-2">
                        <DashboardGroupsTable/>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6 my-2">
                        <DashboardTeachersTable/>
                    </div>
                    <div className="bg-white rounded-lg shadow-md p-6">
                        <DashboardChildrenTable/>
                    </div>
                </>

            }

        </div>
    );
};

export default DashboardComponent;