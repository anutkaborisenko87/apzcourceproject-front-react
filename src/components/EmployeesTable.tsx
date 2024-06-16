import {MinusCircleIcon, PencilSquareIcon, TrashIcon, UserPlusIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosDeleteEmployee,
    axiosDeactivateEmployee,
    axiosReactivateEmployee,
    axiosGetEmployeeInfo, getEmployeeToUpdate, getEmployeeToFire
} from "../store/employeesSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";

type PropsType = {
    tableType: string;
    page: number;
}
const EmployeesTable = ({
                            tableType,
                            page
                        }: PropsType) => {
    const dispatch = useDispatch();
    const employeesList = useSelector(state => state.employees?.employees?.data ?? []);
    const onDeletingEmployee = async (employeeId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете видалити цього співробітника?")) {
            // @ts-ignore
            await dispatch(axiosDeleteEmployee({employeeId, page, tableType}));
        }
    }
    const onDeacttivatingEmployee = async (employeeId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього співробітника?")) {
            // @ts-ignore
            await dispatch(axiosDeactivateEmployee({employeeId, page, tableType}));
        }

    }
    const onReacttivatingEmployee = async (employeeId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете активувати цього співробітника?")) {
            // @ts-ignore
            await dispatch(axiosReactivateEmployee({employeeId, page, tableType}));
        }

    }
    return (
        <>
            <div className="overflow-x-auto">
                {employeesList.length === 0
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
                                        <td className="py-2 px-4 border-b">{employee?.phone ?? ''}</td>
                                        <td className="py-2 px-4 border-b">
                                            {
                                                tableType === 'active' ?
                                                    <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                            onClick={async () => {
                                                                await dispatch(axiosGetEmployeeInfo(employee?.id))
                                                                dispatch(getEmployeeToUpdate({id: employee?.id}))
                                                                dispatch(openCloseModal({open: true}))
                                                            }}
                                                            title="Редагувати інформацію про співробітника"
                                                    >
                                                        <PencilSquareIcon className="w-6"/>

                                                    </button> : <></>}
                                            <button className="text-red-500 hover:text-red-700"
                                                    onClick={() => onDeletingEmployee(employee?.id)}
                                                    title="Видалити інформацію про співробітника"
                                            >
                                                <TrashIcon className="w-6"/>
                                            </button>
                                            {
                                                tableType === 'active' || tableType === 'working' ?
                                                    <>
                                                        <button className="text-orange-500 hover:text-red-700"
                                                                onClick={() => onDeacttivatingEmployee(employee?.id)}
                                                                title="Деактивувати співробітника"
                                                        >
                                                            <MinusCircleIcon className="w-6"/>
                                                        </button>
                                                        <button className="text-purple-500 hover:text-purple-700"
                                                                onClick={async () => {
                                                                    // @ts-ignore
                                                                    await dispatch(axiosGetEmployeeInfo(employee?.id))
                                                                    dispatch(getEmployeeToFire({id: employee?.id}))
                                                                    dispatch(openCloseModal({open: true}))
                                                                }}
                                                                title="Звільнити співробітника"
                                                        >
                                                            <XMarkIcon className="w-6"/>
                                                        </button>
                                                    </>

                                                    :
                                                    <></>

                                            }
                                            {
                                                tableType === 'not-active' && employee?.date_dismissal === null ?
                                                    <button className="text-green-500 hover:text-green-700"
                                                            onClick={() => onReacttivatingEmployee(employee?.id)}
                                                            title="Активувати співробітника"
                                                    >
                                                        <UserPlusIcon className="w-6"/>
                                                    </button>
                                                    :
                                                    <></>
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

export default EmployeesTable;