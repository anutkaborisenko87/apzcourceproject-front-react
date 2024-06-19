import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {openCloseModal} from "../store/modalSlice.ts";
import {axiosChildInfo, axiosDeleteChildInfo, getChildToUpdate} from "../store/childrenListSlice.ts";

type PropsType = {
    tableType: string;
    page: number;
}
const ChildrenTable = ({
                           tableType,
                           page
                       }: PropsType) => {
    // @ts-ignore
    const childrenList = useSelector(state => state.childrenList?.childrenList?.data ?? []);
    const dispatch = useDispatch();
    const onDeletingChild = async (childId: number) => {
        if (confirm("Ви впевнені, що хочете видалити цю дитину?")) {
            // @ts-ignore
            await dispatch(axiosDeleteChildInfo({childId, page, tableType}));
        }
    }
    return (
        <>
            <div className="overflow-x-auto">
                {childrenList.length === 0
                    ?
                    <p>Тут поки що немає нічого </p>
                    :

                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>ПІБ</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 9l5-5 5 5H5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Дата народження</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 9l5-5 5 5H5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Група</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 9l5-5 5 5H5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Рік зарахування</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 9l5-5 5 5H5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Рік випуску</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 9l5-5 5 5H5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Батьки</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                        </thead>
                        <tbody>

                        {childrenList.map((child: any) => {
                                return (
                                    <tr key={child?.id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{child?.last_name ?? ''} {child?.first_name ?? ''} {child?.patronymic_name ?? ''}</td>
                                        <td className="py-2 px-4 border-b">{child?.birthdate}</td>
                                        <td className="py-2 px-4 border-b">{child?.group ? child?.group?.title : ''} </td>
                                        <td className="py-2 px-4 border-b"><span
                                            title={child?.enrollment_date ?? "Немає інформації про дату вступу"}>{child?.enrollment_year ?? ''}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b"><span
                                            title={child?.graduation_date ?? "Немає інформації про дату випуску"}>{child?.graduation_year ?? ''}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b">{child?.parrents && child?.parrents.length > 0 ?
                                            child?.parrents.map((parrent: {
                                                id: number;
                                                parrent_name: string;
                                                relations: string;
                                            }) => {
                                                return (
                                                    <button key={parrent.id}
                                                            className="border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                                                        {parrent.parrent_name} {`(${parrent.relations})`}
                                                    </button>
                                                )
                                            })
                                            : ''}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                    onClick={async () => {
                                                        // @ts-ignore
                                                        await dispatch(axiosChildInfo(child?.id));
                                                        dispatch(getChildToUpdate({id: child?.id}));
                                                        dispatch(openCloseModal({open: true}))
                                                    }}
                                            >
                                                <PencilSquareIcon className="w-6"/>

                                            </button>
                                            <button className="text-red-500 hover:text-red-700"
                                                    onClick={() => onDeletingChild(child.id)}
                                            >
                                                <TrashIcon className="w-6"/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
};
export default ChildrenTable;