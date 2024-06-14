import {useEffect, useState} from "react";
import Pagination from "../components/Pagination.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {
    deleteParrentInfo,
    getNotActiveParrentsList,
    reactivateParrent
} from "../apiServices/parrentApiService.ts";
import ParrentsTable from "./ParrentsTable.tsx";

const ParrentsNotActive = () => {

    const {setNotification} = useStateContext();
    const [parrents, setParrents] = useState([]);
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


    const reactivatingParrent = async (userId:number) => {
        if (confirm("Ви впевнені, що хочете активувати цього батька?")) {
            try {
                setIsLoading(true);
                await reactivateParrent(userId);
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
            let result = await getNotActiveParrentsList(page);
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
                    <div className="overflow-x-auto">
                        {parrents.length === 0
                            ?
                            <p>Тут поки що немає нічого </p>
                            :
                            <ParrentsTable  parrentsList={parrents} tableType={'not-active'}
                                            onActivateReativateParrent={reactivatingParrent}
                                            onDeleteParrent={deletingParrent}
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

export default ParrentsNotActive;
