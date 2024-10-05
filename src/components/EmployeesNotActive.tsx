import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import EmployeesTable from "./EmployeesTable.tsx";
import {useDispatch, useSelector} from "react-redux";
import { axiosNotActiveEmployees} from "../store/employeesSlice.ts";
const EmployeesNotActive = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoading = useSelector(state => state.employees.status === 'loading');
    const paginationData = useSelector(state => {
        return {
            // @ts-ignore
            to: state.employees?.employees.to ?? 0,
            // @ts-ignore
            from: state.employees?.employees.from ?? 0,
            // @ts-ignore
            total: state.employees?.employees.total ?? 0,
            // @ts-ignore
            links: state.employees?.employees.links ?? [],
            // @ts-ignore
            last_page: state.employees?.employees.last_page ?? 0,
            // @ts-ignore
            current_page: state.employees?.employees.current_page ?? 1,
            // @ts-ignore
            per_page: state.employees?.employees.per_page ?? 10
        }

    });
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosNotActiveEmployees({per_page: paginationData.per_page}));
    }, [dispatch]);

    const changePage = (page: number) => {
        // @ts-ignore
        dispatch(axiosNotActiveEmployees({page, per_page: paginationData.per_page}));

    }
    return (
        <div className="container mx-auto">

            {isLoading ?
                <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
                :
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-bold">Неактивні співробітники</h2>
                    </div>
                    <EmployeesTable tableType={'not-active'}/>

                    <Pagination currentPage={paginationData?.current_page}
                                lastPage={paginationData?.last_page}
                                from={paginationData?.from}
                                to={paginationData?.to}
                                total={paginationData?.total}
                                links={paginationData?.links}
                                onUpdatePage={changePage}></Pagination>
                </div>
            }
        </div>
    );
};

export default EmployeesNotActive;
