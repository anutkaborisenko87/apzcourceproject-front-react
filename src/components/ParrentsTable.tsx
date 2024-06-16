import {MinusCircleIcon, PencilSquareIcon, TrashIcon, UserPlusIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosDeactivateParrent,
    axiosDeleteParrent,
    axiosGetParrentInfo,
    axiosReactivateParrent, getParrentToUpdate
} from "../store/parrentsSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

type PropsType = {
    tableType: string;
    page: number;
}
const ParrentsTable = ({
                           tableType,
                           page
                       }: PropsType) => {
    // @ts-ignore
    const parrentsList = useSelector(state => state.parrents?.parrents?.data ?? []);
    const dispatch = useDispatch();
    const onDeletingParrent = async (parrentId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете видалити цього батька?")) {
            // @ts-ignore
            await dispatch(axiosDeleteParrent({parrentId, page, tableType}));
        }
    }
    const onDeacttivatingParrent = async (parrentId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього батька?")) {
            // @ts-ignore
            await dispatch(axiosDeactivateParrent({parrentId, page, tableType}));
        }

    }
    const onReacttivatingParrent = async (parrentId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете активувати цього батька?")) {
            // @ts-ignore
            await dispatch(axiosReactivateParrent({parrentId, page, tableType}));
        }
    }
    return (
        <>
            <div className="overflow-x-auto">
                {parrentsList.length === 0
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
                                    <span>Email</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 9l5-5 5 5H5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Адреса</span>
                                    <button className="text-gray-500 hover:text-gray-700">
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M5 9l5-5 5 5H5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Телефон</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Місце роботи</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Соціальний статус</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Діти</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                        </thead>
                        <tbody>

                        {parrentsList.map((parrent: any) => {
                            return (
                                <tr key={parrent?.id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b">{parrent?.last_name ?? ''} {parrent?.first_name ?? ''} {parrent?.patronymic_name ?? ''}</td>
                                    <td className="py-2 px-4 border-b">{parrent?.email}</td>
                                    <td className="py-2 px-4 border-b">{parrent?.city ?? ''} {parrent?.street ?? ''} {parrent?.house_number ?? ''} {parrent?.apartment_number ?? ''}</td>
                                    <td className="py-2 px-4 border-b">{parrent?.phone ?? ''}</td>
                                    <td className="py-2 px-4 border-b">{parrent?.work_place ?? ''}</td>
                                    <td className="py-2 px-4 border-b">{parrent?.marital_status ?? ''}</td>
                                    <td className="py-2 px-4 border-b">{parrent?.children && parrent?.children.length > 0 ?
                                        parrent?.children.map((child: { id: Key | null | undefined; child_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; relations: any; }) => {
                                                return (
                                                    <button key={child.id}
                                                            className="border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                                                        {child.child_name} {`(${child.relations})`}
                                                    </button>
                                                )
                                            })
                                            : ''}</td>
                                        <td className="py-2 px-4 border-b">
                                            {
                                                tableType === 'active' ?
                                                    <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                            onClick={ async () => {
                                                                // @ts-ignore
                                                                await dispatch(axiosGetParrentInfo(parrent?.id));
                                                                dispatch(getParrentToUpdate({id: parrent?.id}));
                                                                dispatch(openCloseModal({open: true}))
                                                            }}
                                                    >
                                                        <PencilSquareIcon className="w-6"/>

                                                    </button> : <></>}
                                            <button className="text-red-500 hover:text-red-700"
                                                    onClick={() => onDeletingParrent(parrent?.id)}
                                            >
                                                <TrashIcon className="w-6"/>
                                            </button>
                                            {
                                                tableType === 'active' ?
                                                    <button className="text-orange-500 hover:text-red-700"
                                                            onClick={() => onDeacttivatingParrent(parrent?.id)}
                                                    >
                                                        <MinusCircleIcon className="w-6"/>
                                                    </button>
                                                    :
                                                    <button className="text-green-500 hover:text-green-700"
                                                            onClick={() => onReacttivatingParrent(parrent?.id)}
                                                    >
                                                        <UserPlusIcon className="w-6"/>
                                                    </button>
                                            }
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

export default ParrentsTable;