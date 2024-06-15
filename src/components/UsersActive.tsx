import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import Modal from "../components/Modal.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import AddUpdateUserForm from "../components/AddUpdateUserForm.tsx";
import UsersTable from "./UsersTable.tsx";
import {useDispatch, useSelector} from "react-redux";
import {axiosActiveUsers, axiosGetUserInfo, getUserToUpdate} from "../store/userSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";

const UsersActive = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { setNotification } = useStateContext();
    const notification = useSelector(state => state.users.notification);
    const isLoading = useSelector(state => state.users.status === 'loading');
    const paginationData = useSelector(state => {

        return {
            to: state.users?.users.to ?? 0,
            from: state.users?.users.from ?? 0,
            total: state.users?.users.total ?? 0,
            links: state.users?.users.links ?? [],
            last_page: state.users?.users.last_page ?? 0,
            current_page: state.users?.users.current_page ?? 1
        }

    });
    useEffect(() => {
        if (notification.type !== '' && notification.message !== '') {
            setNotification(notification)
        }
    }, [notification]);
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosActiveUsers());
    }, [dispatch]);

    const handleOpenModal = async () => {
        // @ts-ignore
        await dispatch(axiosGetUserInfo(false))
        dispatch(getUserToUpdate(null))
        dispatch(openCloseModal({open: true}));
    };

    const changePage = (page: number) => {
        // @ts-ignore
        dispatch(axiosActiveUsers(page));
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
                        <Modal>
                            <AddUpdateUserForm/>
                        </Modal>
                    </div>

                    <UsersTable page={paginationData?.current_page} tableType={'active'}
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

export default UsersActive;
