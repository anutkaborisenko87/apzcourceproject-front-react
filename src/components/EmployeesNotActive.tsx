import {useEffect, useState} from "react";
import Pagination from "../components/Pagination.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import EmployeesTable from "./EmployeesTable.tsx";
import {
    deleteEmployeeInfo,
    getNotActiveEmployeesList,
    reactivateEmployee
} from "../apiServices/employeesApiServices.ts";


const EmployeesNotActive = () => {

    const {setNotification} = useStateContext();
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [paginationData, setPaginationData] = useState({
        to: 0,
        from: 0,
        total: 0,
        links: [],
        last_page: 0,
        current_page: 1,

    });
    useEffect(() => {
        getEmployees();
    }, []);

    const reactivatingEmployee = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете активувати цього користувача?")) {
            try {
                setIsLoading(true);
                await reactivateEmployee(userId);
                getEmployees(paginationData.current_page);
                setNotification({type: "success", message:"Користувача активовано!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const deletitingEmployee = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            try {
                setIsLoading(true);
                await deleteEmployeeInfo(userId);
                setIsLoading(false);
                getEmployees(paginationData.current_page);
                setNotification({type: "success", message:"Користувача видалено!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const getEmployees = async (page?: number) => {
        try {
            setIsLoading(true);
            let result = await getNotActiveEmployeesList(page);
            setIsLoading(false);
            setEmployees(result.data);
            const paginationData = {...result};
            delete paginationData.data;
            setPaginationData(paginationData);
        } catch (error) {
            setIsLoading(false);
        }
    }
    const changePage = (page: number) => {
        getEmployees(page);

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
                        <h2 className="text-2xl font-bold">Неактивні користувачі</h2>
                    </div>
                    <div className="overflow-x-auto">
                        {employees.length === 0
                            ?
                            <p>Тут поки що немає нічого </p>
                            :
                            <EmployeesTable employeesList={employees}
                                            onDeleteEmployee={deletitingEmployee}
                                            tableType={'notActive'}
                                            onActivateReativateEmployee={reactivatingEmployee}/>
                        }

                    </div>
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
