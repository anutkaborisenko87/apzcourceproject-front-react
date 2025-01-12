import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {axiosDashboardData} from "../store/dashbordSlice.ts";
import DashboardChildrenTable from "./DashboardChildrenTable.tsx";

const DashboardComponent = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoading = useSelector(state => state.dashboard.status === 'loading');
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosDashboardData());
    }, [dispatch]);
    return (
        <div className="container mx-auto">

            {isLoading ?
                <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
                :
                <div className="bg-white rounded-lg shadow-md p-6">
                    <DashboardChildrenTable/>
                </div>
            }

        </div>
    );
};

export default DashboardComponent;