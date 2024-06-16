import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import UsersTable from "./UsersTable.tsx";
import {useDispatch, useSelector} from "react-redux";
import {axiosNotActiveUsers} from "../store/userSlice.ts";

const UsersNotActive = () => {
    const dispatch = useDispatch();
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
        // @ts-ignore
        dispatch(axiosNotActiveUsers());
    }, [dispatch]);
    const changePage = async (page: number) => {
        // @ts-ignore
        await dispatch(axiosNotActiveUsers(page));
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
                    <UsersTable tableType={'notActive'} page={paginationData?.current_page}/>

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

export default UsersNotActive;
