import {MinusCircleIcon, PencilSquareIcon, TrashIcon, UserPlusIcon} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
type PropsType = {
    usersList: [];
    tableType: string;
    onOpenModal?: (id: number) => void;
    onDeleteUser: (id: number) => void;
    onActivateReativateUser: (id: number) => void;
}
const UsersTable = ({usersList, tableType,onDeleteUser, onActivateReativateUser, onOpenModal }: PropsType) => {
    return (
        <>
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
                            <span>Категорія</span>
                        </div>
                    </th>
                    <th className="py-2 px-4 border-b"></th>
                </tr>
                </thead>
                <tbody>

                {usersList.map((user) => {
                        return (
                            <tr key={user?.user_id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{user?.last_name ?? ''} {user?.first_name ?? ''} {user?.patronymic_name ?? ''}</td>
                                <td className="py-2 px-4 border-b">{user?.email}</td>
                                <td className="py-2 px-4 border-b">{user?.city ?? ''} {user?.street ?? ''} {user?.house_number ?? ''} {user?.apartment_number ?? ''}</td>
                                <td className="py-2 px-4 border-b">{user?.user_category === "employee" ? <Link to="/employees">співробітники</Link> : (user?.user_category === "parent" ? "батьки" : (user?.user_category === "children" ? "діти" : "адмін. персонал"))}</td>
                                <td className="py-2 px-4 border-b">
                                    {
                                        tableType === 'active' ?
                                    <button className="text-blue-500 hover:text-blue-700 mr-2"
                                            onClick={() => onOpenModal(user?.user_id)}
                                    >
                                        <PencilSquareIcon className="w-6"/>

                                    </button> : <></> }
                                    <button className="text-red-500 hover:text-red-700"
                                            onClick={() => { onDeleteUser(user?.user_id)}}
                                    >
                                        <TrashIcon className="w-6"/>
                                    </button>
                                    {
                                        tableType === 'active' ?
                                            <button className="text-orange-500 hover:text-red-700"
                                                    onClick={() => onActivateReativateUser(user?.user_id)}
                                            >
                                                <MinusCircleIcon className="w-6"/>
                                            </button>
                                            :
                                            <button className="text-green-500 hover:text-green-700"
                                                    onClick={() => onActivateReativateUser(user?.user_id)}
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

        </>
    );
};

export default UsersTable;