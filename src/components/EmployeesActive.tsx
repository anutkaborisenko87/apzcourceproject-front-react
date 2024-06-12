import {useEffect, useState} from "react";
import Pagination from "../components/Pagination.tsx";
import Modal from "../components/Modal.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {deactivateEmployee, deleteEmployeeInfo, getActiveEmployeesList} from "../apiServices/employeesApiServices.ts";
import EmployeesTable from "./EmployeesTable.tsx";
import AddUpdateEmployeeForm from "./AddUpdatEmployeeForm.tsx";

const EmployeesActive = () => {

    const {setNotification} = useStateContext();
    const [employees, setEmployees] = useState([]);
    const [employeeToUpdate, setEmployeeToUpdate] = useState(null);
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (userId?: number) => {
        if (userId) setEmployeeToUpdate({id: userId});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEmployeeToUpdate(null);
        setIsModalOpen(false);
    };
    const deactivatingEmployee = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього співробітника?")) {
            try {
                setIsLoading(true);
                await deactivateEmployee(userId);
                getEmployees(paginationData.current_page);
                setNotification({type: "success", message:"Співробітника деактивовано!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const deletingEmployee = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете видалити цього співробітника?")) {
            try {
                setIsLoading(true);
                await deleteEmployeeInfo(userId);
                setIsLoading(false);
                getEmployees(paginationData.current_page);
                setNotification({type: "success", message:"Співробітника видалено!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const getEmployees = async (page?: number) => {
        try {
            setIsLoading(true);
            let result = await getActiveEmployeesList(page);
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
    const onSubmitform = () => {
        getEmployees();
        handleCloseModal();
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
                        <h2 className="text-2xl font-bold">Активні співробітники</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleOpenModal()}
                        >
                            Додати співробітника
                        </button>
                    </div>
                    <div className="container mx-auto mt-10">

                        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                            <AddUpdateEmployeeForm employee={employeeToUpdate} onCloseModal={handleCloseModal} onSubmitForm={onSubmitform}/>
                        </Modal>
                    </div>
                    <div className="overflow-x-auto">
                        {employees.length === 0
                            ?
                            <p>Тут поки що немає нічого </p>
                            :
                            <EmployeesTable  employeesList={employees} tableType={'active'}
                                             onActivateReativateEmployee={deactivatingEmployee}
                                             onDeleteEmployee={deletingEmployee}
                                             onOpenModal={handleOpenModal}
                            />
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

export default EmployeesActive;
