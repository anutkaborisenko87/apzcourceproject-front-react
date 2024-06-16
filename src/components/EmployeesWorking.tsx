import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import EmployeesTable from "./EmployeesTable.tsx";
import {useDispatch, useSelector} from "react-redux";
import {axiosWorkingEmployeesList} from "../store/employeesSlice.ts";
import Modal from "./Modal.tsx";
import AddUpdateEmployeeForm from "./AddUpdatEmployeeForm.tsx";

const EmployeesWorking = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoading = useSelector(state => state.employees.status === 'loading');
    const paginationData = useSelector(state => {
        return {
            to: state.employees?.employees.to ?? 0,
            from: state.employees?.employees.from ?? 0,
            total: state.employees?.employees.total ?? 0,
            links: state.employees?.employees.links ?? [],
            last_page: state.employees?.employees.last_page ?? 0,
            current_page: state.employees?.employees.current_page ?? 1
        }

    });
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosWorkingEmployeesList());
    }, [dispatch]);
    const changePage = (page: number) => {
        // @ts-ignore
        dispatch(axiosWorkingEmployeesList(page));
    }
    return (
        <div className="container mx-auto">

            {isLoading ?
                <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
                :
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="container mx-auto mt-10">
                        <Modal>
                            <AddUpdateEmployeeForm tableType={'working'}/>
                        </Modal>
                    </div>

                    <EmployeesTable page={paginationData?.current_page} tableType={'working'}
                    />

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

export default EmployeesWorking;
