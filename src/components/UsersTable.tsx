import {MinusCircleIcon, PencilSquareIcon, TrashIcon, UserPlusIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosDeactivateUser,
    axiosDeleteUser, axiosReactivateUser,
    axiosGetUserInfo,
    getUserToUpdate
} from "../store/userSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";

type PropsType = {
    tableType: string;
    page: number;
}
const UsersTable = ({tableType, page}: PropsType) => {
    // @ts-ignore
    const usersList = useSelector(state => state.users?.users?.data ?? []);
    const dispatch = useDispatch();
    const ondeletingUser = async (userId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            // @ts-ignore
            await dispatch(axiosDeleteUser({userId, page, tableType}));
        }
    }
    const onDeacttivatingUser = async (userId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього користувача?")) {
            // @ts-ignore
            await dispatch(axiosDeactivateUser({userId, page, tableType}));
        }

    }
    const onReacttivatingUser = async (userId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете активувати цього користувача?")) {
            // @ts-ignore
            await dispatch(axiosReactivateUser({userId, page, tableType}));
        }
    }
    return (
        <>
            <div className="overflow-x-auto">
                {usersList.length === 0
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
                                    <span>Категорія</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                        </thead>
                        <tbody>

                        {usersList.map((user: {
                                birthdate: string;
                                user_id: number;
                                last_name: string | null;
                                first_name:  string | null;
                                patronymic_name:  string | null;
                                email: string;
                                city:  string | null;
                                street:  string | null;
                                house_number:  string | null;
                                apartment_number:  string | null;
                                user_category: string;
                            }) => {
                                return (
                                    <tr key={user?.user_id} className="hover:bg-gray-100">
                                        <td className="py-2 px-4 border-b">{user?.last_name ?? ''} {user?.first_name ?? ''} {user?.patronymic_name ?? ''}</td>
                                        <td className="py-2 px-4 border-b">{user?.email}</td>
                                        <td className="py-2 px-4 border-b">{user?.birthdate ?? ''}</td>
                                        <td className="py-2 px-4 border-b">{user?.user_category === "employee" ? <Link
                                            to="/employees">співробітники</Link> : (user?.user_category === "parent" ? <Link
                                            to="/parrents">батьки</Link> : (user?.user_category === "children" ? "діти" : "адмін. персонал"))}</td>
                                        <td className="py-2 px-4 border-b">

                                            {
                                                tableType === 'active' && !["employee", "parent", "children"].includes(user?.user_category) ?
                                                    <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                            onClick={async () => {
                                                                // @ts-ignore
                                                                await dispatch(axiosGetUserInfo(user?.user_id))
                                                                dispatch(getUserToUpdate({id: user?.user_id}))
                                                                dispatch(openCloseModal({open: true}))
                                                            }}
                                                    >
                                                        <PencilSquareIcon className="w-6"/>

                                                    </button> : <></>
                                            }
                                            {
                                                !["employee", "parent", "children"].includes(user?.user_category) ?
                                                    <button className="text-red-500 hover:text-red-700"
                                                            onClick={() => ondeletingUser(user?.user_id)}
                                                    >
                                                        <TrashIcon className="w-6"/>
                                                    </button> : <></>
                                            }
                                            {
                                                !["employee", "parent", "children"].includes(user?.user_category) ?
                                                    (tableType === 'active' ?
                                                            <button className="text-orange-500 hover:text-red-700"
                                                                    onClick={() => onDeacttivatingUser(user?.user_id)}
                                                            >
                                                                <MinusCircleIcon className="w-6"/>
                                                            </button>
                                                            :
                                                            <button className="text-green-500 hover:text-green-700"
                                                                    onClick={() => onReacttivatingUser(user?.user_id)}
                                                            >
                                                                <UserPlusIcon className="w-6"/>
                                                            </button>
                                                    )
                                                    : <></>
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

export default UsersTable;