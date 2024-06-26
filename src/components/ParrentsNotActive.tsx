import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import ParrentsTable from "./ParrentsTable.tsx";
import {useDispatch, useSelector} from "react-redux";
import {axiosNotActiveParrents} from "../store/parrentsSlice.ts";

const ParrentsNotActive = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoading = useSelector(state => state.parrents.status === 'loading');
    const paginationData = useSelector(state => {
        return {
            // @ts-ignore
            to: state.parrents?.parrents.to ?? 0,
            // @ts-ignore
            from: state.parrents?.parrents.from ?? 0,
            // @ts-ignore
            total: state.parrents?.parrents.total ?? 0,
            // @ts-ignore
            links: state.parrents?.parrents.links ?? [],
            // @ts-ignore
            last_page: state.parrents?.parrents.last_page ?? 0,
            // @ts-ignore
            current_page: state.parrents?.parrents.current_page ?? 1
        }

    });
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosNotActiveParrents());
    }, [dispatch]);

    const changePage = (page: number) => {
        // @ts-ignore
        dispatch(axiosNotActiveParrents(page));
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
                        <h2 className="text-2xl font-bold">Деактивовані батьки</h2>
                    </div>
                    <ParrentsTable page={paginationData?.current_page} tableType={'not-active'} />

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

export default ParrentsNotActive;
