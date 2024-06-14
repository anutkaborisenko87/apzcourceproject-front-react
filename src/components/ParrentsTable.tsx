import {MinusCircleIcon, PencilSquareIcon, TrashIcon, UserPlusIcon} from "@heroicons/react/24/outline";
type PropsType = {
    parrentsList: [];
    tableType: string;
    onOpenModal?: (id: number) => void;
    onDeleteParrent: (id: number) => void;
    onActivateReativateParrent: (id: number) => void;
}
const ParrentsTable = ({parrentsList, tableType,onDeleteParrent, onActivateReativateParrent, onOpenModal }: PropsType) => {
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

                {parrentsList.map((parrent) => {
                        return (
                            <tr key={parrent?.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{parrent?.last_name ?? ''} {parrent?.first_name ?? ''} {parrent?.patronymic_name ?? ''}</td>
                                <td className="py-2 px-4 border-b">{parrent?.email}</td>
                                <td className="py-2 px-4 border-b">{parrent?.city ?? ''} {parrent?.street ?? ''} {parrent?.house_number ?? ''} {parrent?.apartment_number ?? ''}</td>
                                <td className="py-2 px-4 border-b">{parrent?.phone  ?? '' }</td>
                                <td className="py-2 px-4 border-b">{parrent?.work_place  ?? '' }</td>
                                <td className="py-2 px-4 border-b">{parrent?.marital_status  ?? '' }</td>
                                <td className="py-2 px-4 border-b">{parrent?.children && parrent?.children.length > 0  ?
                                    parrent?.children.map((child) => {
                                        return (
                                            <button
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
                                            onClick={() => onOpenModal(parrent?.id)}
                                    >
                                        <PencilSquareIcon className="w-6"/>

                                    </button> : <></> }
                                    <button className="text-red-500 hover:text-red-700"
                                            onClick={() => onDeleteParrent(parrent?.id)}
                                    >
                                        <TrashIcon className="w-6"/>
                                    </button>
                                    {
                                        tableType === 'active' ?
                                            <button className="text-orange-500 hover:text-red-700"
                                                    onClick={() => onActivateReativateParrent(parrent?.id)}
                                            >
                                                <MinusCircleIcon className="w-6"/>
                                            </button>
                                            :
                                            <button className="text-green-500 hover:text-green-700"
                                                    onClick={() => onActivateReativateParrent(parrent?.id)}
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

export default ParrentsTable;