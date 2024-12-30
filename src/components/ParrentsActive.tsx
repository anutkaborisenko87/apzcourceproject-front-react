import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import Modal from "../components/Modal.tsx";
import ParrentsTable from "./ParrentsTable.tsx";
import AddUpdateParrentForm from "./AddUpdatParrentForm.tsx";
import {useDispatch, useSelector} from "react-redux";
import {axiosActiveParrents, axiosGetParrentInfo} from "../store/parrentsSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";

const ParrentsActive = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const filterParrentsBy = useSelector(state => state.parrents?.parrents?.filter_parrents_by ?? null);
    // @ts-ignore
    const parrentSortBy = useSelector(state => state.parrents?.parrents?.parrent_sort_by ?? null);
    // @ts-ignore
    const sortDirection = useSelector(state => state.parrents?.parrents?.sort_direction ?? 'asc');
    // @ts-ignore
    const parrentSearchBy = useSelector(state => state.parrents?.parrents?.parrent_search_by ?? null);
    // @ts-ignore
    const searchTerm = useSelector(state => state.parrents?.parrents?.search_term ?? null);
    // @ts-ignore
    const isLoading = useSelector(state => state.parrents.status === 'loading');
    const paginationData = useSelector(state => {
        return {
            // @ts-ignore
            per_page: state.parrents?.parrents.per_page ?? 10,
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
        dispatch(axiosActiveParrents({
            per_page: paginationData.per_page,
            parrent_sort_by: parrentSortBy,
            sort_direction: sortDirection,
            parrent_search_by: parrentSearchBy,
            filter_parrents_by: filterParrentsBy,
            search_term: searchTerm
        }));
    }, [dispatch]);


    const handleOpenModal = async () => {
        // @ts-ignore
        dispatch(axiosGetParrentInfo({parrentId: false}));
        dispatch(openCloseModal({open: true}));
    };

    const changePage = (page: number) => {
        // @ts-ignore
        dispatch(axiosActiveParrents({
            page,
            per_page: paginationData.per_page,
            parrent_sort_by: parrentSortBy,
            sort_direction: sortDirection,
            parrent_search_by: parrentSearchBy,
            filter_parrents_by: filterParrentsBy,
            search_term: searchTerm
        }));

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
                        <Modal>
                            <AddUpdateParrentForm/>
                        </Modal>
                    </div>
                    <ParrentsTable tableType={'active'} />

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
