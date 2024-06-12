import {useEffect, useState} from "react";
import Pagination from "../components/Pagination.tsx";
import Modal from "../components/Modal.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import AddUpdateUserForm from "../components/AddUpdateUserForm.tsx";
import {deactivateUser, deleteUser, getUsersList} from "../apiServices/usersApiServices.ts";
import UsersTable from "./UsersTable.tsx";

const UsersActive = () => {

    const {setNotification} = useStateContext();
    const [users, setUsers] = useState([]);
    const [userToUpdate, setUserToUpdate] = useState(null);
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
        getUsers();
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = (userId?: number) => {
        if (userId) setUserToUpdate({id: userId});
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setUserToUpdate(null);
        setIsModalOpen(false);
    };
    const deactivatingUser = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього користувача?")) {
            try {
                setIsLoading(true);
                await deactivateUser(userId);
                getUsers(paginationData.current_page);
                setNotification({type: "success", message:"Користувача деактивовано!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const deletitingUser = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            try {
                setIsLoading(true);
                await deleteUser(userId);
                setIsLoading(false);
                getUsers(paginationData.current_page);
                setNotification({type: "success", message:"Користувача видалено!"});
            } catch (e) {
                setIsLoading(false);
                setNotification({type: "error", message:"Щось пішло не так!"});
            }
        }

    }
    const getUsers = async (page?: number) => {
        try {
            setIsLoading(true);
            let result = await getUsersList(page);
            setIsLoading(false);
            setUsers(result.data);
            const paginationData = {...result};
            delete paginationData.data;
            setPaginationData(paginationData);
        } catch (error) {
            setIsLoading(false);
        }
    }
    const changePage = (page: number) => {
        getUsers(page);

    }
    const onSubmitform = () => {
        getUsers();
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
                        <h2 className="text-2xl font-bold">Активні користувачі</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleOpenModal()}
                        >
                            Додати користувача
                        </button>
                    </div>
                    <div className="container mx-auto mt-10">

                        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                            <AddUpdateUserForm user={userToUpdate} onCloseModal={handleCloseModal} onSubmitForm={onSubmitform}/>
                        </Modal>
                    </div>
                    <div className="overflow-x-auto">
                        {users.length === 0
                            ?
                            <p>Тут поки що немає нічого </p>
                            :
                            <UsersTable usersList={users} onActivateReativateUser={deactivatingUser} onDeleteUser={deletitingUser} tableType={'active'} onOpenModal={handleOpenModal}/>
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

export default UsersActive;
