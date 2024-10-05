import Breadcrumbs from "../components/Breadcrumbs.tsx";
import {useDispatch, useSelector} from "react-redux";
import Modal from "../components/Modal.tsx";
import {openCloseModal} from "../store/modalSlice.ts";
import {useEffect} from "react";
import {axiosDeleteGroupInfo, axiosGetGroupInfo, axiosGetGroupsList} from "../store/groupsSlice.ts";
import AddUpdateGroupForm from "../components/AddUpdateGroupForm.tsx";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";

const GroupsView = () => {
    const dispatch = useDispatch();
    const bredcrumpsRoutes = [{path: '/groups', displayName: "Групи"}];
    // @ts-ignore
    const isLoading = useSelector(state => state.groups.status === 'loading');
    // @ts-ignore
    const groupsList = useSelector(state => state.groups.groupsList);
    const handleOpenModal = () => {
        dispatch(openCloseModal({open: true}));
    };

    const onDeletingGroup = async (groupId: number) => {
        if (confirm('Віи впевнені, що хочете видалити цю групу')) {
           // @ts-ignore
            await dispatch(axiosDeleteGroupInfo(groupId))
        }
    }
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosGetGroupsList());
    }, [dispatch]);
    return (
        <>
            <Breadcrumbs routes={bredcrumpsRoutes}/>
            {isLoading ?
                <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
                    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
                </div>
                :
                <div className="bg-gray-300 rounded-lg shadow-md p-6">
                    <div className="flex justify-between mb-4">
                        <h2 className="text-2xl font-bold">Групи</h2>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            onClick={() => handleOpenModal()}
                        >
                            Додати групи
                        </button>
                    </div>
                    <div className="container mx-auto mt-10">

                        <Modal>
                            <AddUpdateGroupForm/>
                        </Modal>
                    </div>
                    <div className='flex flex-wrap justify-center'>
                        {
                            groupsList.length === 0 ? <h3>Інформація відсутня</h3>
                                :
                                groupsList.map((group: { id: number; title: string ; children: number; educationalPrograms: number; teachers: number; }) => {
                                    return (
                                        <div key={group.id}
                                            className='mx-auto max-w-sm rounded overflow-hidden shadow-lg m-4 bg-white'>
                                            <div className='px-6 py-4'>
                                                <div className='grid grid-cols-2 font-bold text-xl mb-2'>
                                                    <div>{group.title}</div>
                                                    <div>
                                                        <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                                onClick={async () => {
                                                                    // @ts-ignore
                                                                    await dispatch(axiosGetGroupInfo(group?.id));
                                                                    dispatch(openCloseModal({open: true}))
                                                                }}
                                                        >
                                                            <PencilSquareIcon className="w-6"/>

                                                        </button>
                                                        <button className="text-red-500 hover:text-red-700"
                                                                onClick={() => onDeletingGroup(group.id)}
                                                        >
                                                            <TrashIcon className="w-6"/>
                                                        </button>
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-2 text-gray-700 text-base gap-4'>
                                                    <div>Дітей у групі</div>
                                                    <div>{group.children}</div>
                                                    <div>Програма навчання</div>
                                                    <div>
                                                        {group.educationalPrograms }
                                                    </div>
                                                    <div>Вихователі</div>
                                                    <div>
                                                        {group.teachers}
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                        }

                    </div>
                </div>
            }
        </>
    );
};

export default GroupsView;
