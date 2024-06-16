import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import Modal from "../components/Modal.tsx";
import AddUpdateUserForm from "../components/AddUpdateUserForm.tsx";
import UsersTable from "./UsersTable.tsx";
import {useDispatch, useSelector} from "react-redux";
import {axiosActiveUsers, axiosGetUserInfo, getUserToUpdate} from "../store/userSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import TabsForms from "./TabsForms.tsx";

const UsersActive = () => {
    // @ts-ignore
    const user = useSelector(state => state.users.userToUpdate);
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoading = useSelector(state => state.users.status === 'loading');
    const paginationData = useSelector(state => {
        return {
            // @ts-ignore
            to: state.users.users.to ?? 0,
            // @ts-ignore
            from: state.users.users.from ?? 0,
            // @ts-ignore
            total: state.users.users.total ?? 0,
            // @ts-ignore
            links: state.users?.users.links ?? [],
            // @ts-ignore
            last_page: state.users?.users.last_page ?? 0,
            // @ts-ignore
            current_page: state.users?.users.current_page ?? 1
        }
    });
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
                            { user ?
                                <AddUpdateUserForm/>
                                :
                                <TabsForms/>
                            }

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
