import {MinusCircleIcon, PencilSquareIcon, TrashIcon, UserPlusIcon} from "@heroicons/react/24/outline";
type PropsType = {
    employeesList: [];
    tableType: string;
    onOpenModal?: (id: number) => void;
    onDeleteEmployee: (id: number) => void;
    onActivateReativateEmployee: (id: number) => void;
}
const EmployeesTable = ({employeesList, tableType,onDeleteEmployee, onActivateReativateEmployee, onOpenModal }: PropsType) => {
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
                    <th className="py-2 px-4 border-b"></th>
                </tr>
                </thead>
                <tbody>

                {employeesList.map((employee) => {
                        return (
                            <tr key={employee?.id} className="hover:bg-gray-100">
                                <td className="py-2 px-4 border-b">{employee?.last_name ?? ''} {employee?.first_name ?? ''} {employee?.patronymic_name ?? ''}</td>
                                <td className="py-2 px-4 border-b">{employee?.email}</td>
                                <td className="py-2 px-4 border-b">{employee?.city ?? ''} {employee?.street ?? ''} {employee?.house_number ?? ''} {employee?.apartment_number ?? ''}</td>
                                <td className="py-2 px-4 border-b">{employee?.phone  ?? '' }</td>
                                <td className="py-2 px-4 border-b">
                                    {
                                        tableType === 'active' ?
                                    <button className="text-blue-500 hover:text-blue-700 mr-2"
                                            onClick={() => onOpenModal(employee?.id)}
                                    >
                                        <PencilSquareIcon className="w-6"/>

                                    </button> : <></> }
                                    <button className="text-red-500 hover:text-red-700"
                                            onClick={() => onDeleteEmployee(employee?.id)}
                                    >
                                        <TrashIcon className="w-6"/>
                                    </button>
                                    {
                                        tableType === 'active' ?
                                            <button className="text-orange-500 hover:text-red-700"
                                                    onClick={() => onActivateReativateEmployee(employee?.id)}
                                            >
                                                <MinusCircleIcon className="w-6"/>
                                            </button>
                                            :
                                            <button className="text-green-500 hover:text-green-700"
                                                    onClick={() => onActivateReativateEmployee(employee?.id)}
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

export default EmployeesTable;