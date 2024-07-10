import {useEffect} from "react";
import Pagination from "../components/Pagination.tsx";
import Modal from "../components/Modal.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openCloseModal} from "../store/modalSlice.ts";
import {
    axiosChildInfo,
    axiosChildrenAllList,
    axiosForEnrolmentChildrenList, axiosGraduatedChildrenList, axiosInTrainingChildrenList, cleanChildErrors,
    getChildToUpdate
} from "../store/childrenListSlice.ts";
import ChildrenTable from "./ChildrenTable.tsx";
import AddUpdateChildForm from "./AddUpdateChildForm.tsx";

const ChildrenTabsContent = ({tabType, tabTitle}: {tabType: string, tabTitle: string}) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoading = useSelector(state => state.childrenList.status === 'loading');
    const paginationData = useSelector(state => {
        return {
            // @ts-ignore
            to: state.childrenList?.childrenList.to ?? 0,
            // @ts-ignore
            from: state.childrenList?.childrenList.from ?? 0,
            // @ts-ignore
            total: state.childrenList?.childrenList.total ?? 0,
            // @ts-ignore
            links: state.childrenList?.childrenList.links ?? [],
            // @ts-ignore
            last_page: state.childrenList?.childrenList.last_page ?? 0,
            // @ts-ignore
            current_page: state.childrenList?.childrenList.current_page ?? 1
        }

    });
    useEffect(() => {
        switch (tabType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList());
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList());
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList());
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList());
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList());
        }

    }, [dispatch]);


    const handleOpenModal = async () => {
        // @ts-ignore
        await dispatch(axiosChildInfo());
        // @ts-ignore
        dispatch(cleanChildErrors());
        dispatch(getChildToUpdate(null));
        dispatch(openCloseModal({open: true}));
    };

    const changePage = (page: number) => {
        switch (tabType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList(page));
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList(page));
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList(page));
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList(page));
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList(page));
        }

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
                        <h2 className="text-2xl font-bold">{tabTitle}</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleOpenModal()}
                        >
                            Додати дитину
                        </button>
                    </div>
                    <div className="container mx-auto mt-10">
                        <Modal>
                            <AddUpdateChildForm tableType={tabType}/>
                        </Modal>
                    </div>
                    <ChildrenTable  page={paginationData?.current_page} tableType={tabType} />

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

export default ChildrenTabsContent;
