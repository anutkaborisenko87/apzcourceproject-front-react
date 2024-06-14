import {useEffect, useState} from "react";
import Pagination from "../components/Pagination.tsx";
import Modal from "../components/Modal.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {deactivateEmployee, deleteEmployeeInfo} from "../apiServices/employeesApiServices.ts";
import {deactivateParrent, deleteParrentInfo, getActiveParrentsList} from "../apiServices/parrentApiService.ts";
import ParrentsTable from "./ParrentsTable.tsx";
import AddUpdateParrentForm from "./AddUpdatParrentForm.tsx";

const ParrentsActive = () => {

    const {setNotification} = useStateContext();
    const [parrents, setParrents] = useState([]);
    const [parrentToUpdate, setParrentToUpdate] = useState(null);
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
        getParrents();
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (userId?: number) => {
        if (userId) setParrentToUpdate({id: userId});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setParrentToUpdate(null);
        setIsModalOpen(false);
    };
    const deactivatingParrent = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього батька?")) {
            try {
                setIsLoading(true);
                await deactivateParrent(userId);
                getParrents(paginationData.current_page);
                setNotification({type: "success", message:"Батька деактивовано!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const deletingParrent = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете видалити цього батька?")) {
            try {
                setIsLoading(true);
                await deleteParrentInfo(userId);
                setIsLoading(false);
                getParrents(paginationData.current_page);
                setNotification({type: "success", message:"Співробітника видалено!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const getParrents = async (page?: number) => {
        try {
            setIsLoading(true);
            let result = await getActiveParrentsList(page);
            setIsLoading(false);
            setParrents(result.data);
            const paginationData = {...result};
            delete paginationData.data;
            setPaginationData(paginationData);
        } catch (error) {
            setIsLoading(false);
        }
    }
    const changePage = (page: number) => {
        getParrents(page);

    }
    const onSubmitform = () => {
        getParrents();
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
                        <h2 className="text-2xl font-bold">Активні батьки</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleOpenModal()}
                        >
                            Додати батька
                        </button>
                    </div>
                    <div className="container mx-auto mt-10">

                        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                            <AddUpdateParrentForm parrent={parrentToUpdate} onCloseModal={handleCloseModal} onSubmitForm={onSubmitform}/>
                        </Modal>
                    </div>
                    <div className="overflow-x-auto">
                        {parrents.length === 0
                            ?
                            <p>Тут поки що немає нічого </p>
                            :
                            <ParrentsTable  parrentsList={parrents} tableType={'active'}
                                            onActivateReativateParrent={deactivatingParrent}
                                            onDeleteParrent={deletingParrent}
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

export default ParrentsActive;
