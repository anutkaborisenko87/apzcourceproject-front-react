import {useEffect, useState} from "react";
import Spinner from "./Spinner.tsx";
import UserFormPart from "./UserFormPart.tsx";
import EmployeeFormPart from "./EmployeeFormPart.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosCreateEmployeeInfo,
    axiosFireEmployee,
    axiosUpdateEmployeeInfo,
    cleanEmployeeErrors
} from "../store/employeesSlice.ts";
import {axiosGetRolesList} from "../store/rolesSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import {axiosGetPositionsList} from "../store/positionsSlice.ts";

export default function AddUpdateEmployeeForm({tableType} : {tableType: string}) {
    const dispatch = useDispatch();
    // @ts-ignore
    const employee = useSelector(state => state.employees.employeeToUpdate);
    // @ts-ignore
    const firingEmployee = useSelector(state => state.employees.firingEmployee);
    // @ts-ignore
    const employeeInfo = useSelector(state => state.employees.employee);
    // @ts-ignore
    const {setNotification} = useStateContext();
    // @ts-ignore
    const roles = useSelector(state => state.roles.roles);
    // @ts-ignore
    const positions =useSelector(state => state.positions.positions);
    // @ts-ignore
    const formLoading = useSelector(state => state.employees.statusForm === 'loading');
    const today = new Date();
    const maxDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    // @ts-ignore
    const isModalOpen = useSelector(state => state.modal.isOpen);
    // @ts-ignore
    const errors = useSelector(state => state.employees.userValidationErrors);
    // @ts-ignore
    const employeeErrors = useSelector(state => state.employees.employeeValidationErrors);
    // @ts-ignore
    const allertError = useSelector(state => state.employees.error);
    const [dateDismissal, setDateDismissal] = useState(maxDate)

    const [userFormData, setUserFormData] = useState({
        first_name: employeeInfo?.first_name ?? '',
        last_name:  employeeInfo?.last_name ?? '',
        patronymic_name:  employeeInfo?.patronymic_name ?? '',
        email:  employeeInfo?.email ?? '',
        role:  employeeInfo?.role ?? '',
        city:  employeeInfo?.city ?? '',
        street:  employeeInfo?.street ?? '',
        house_number:  employeeInfo?.house_number ?? '',
        apartment_number:  employeeInfo?.apartment_number ?? '',
        birth_date:  employeeInfo?.birth_date ?? '',
        user_id:  employeeInfo?.user_id ?? ''
    });

    const [employeeFormData, setEmployeeFormData] = useState({
        position_id:  employeeInfo?.position?.id ?? '',
        phone:  employeeInfo?.phone ?? '',
        contract_number:  employeeInfo?.contract_number ?? '',
        passport_data:  employeeInfo?.passport_data ?? '',
        bank_account:  employeeInfo?.bank_account ?? '',
        bank_title:  employeeInfo?.bank_title ?? '',
        EDRPOU_bank_code:  employeeInfo?.EDRPOU_bank_code ?? '',
        code_IBAN:  employeeInfo?.code_IBAN ?? '',
        medical_card_number:  employeeInfo?.medical_card_number ?? '',
        employment_date:  employeeInfo?.employment_date ?? ''
    });
    const clearErrors = (field: string) => {
        // @ts-ignore
        dispatch(cleanEmployeeErrors());
        dispatch(cleanEmployeeErrors({field}));
    };

    const submitForm = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        if (firingEmployee?.id) {
            // @ts-ignore
            dispatch(axiosFireEmployee({employeeId: firingEmployee?.id, payload: {date_dismissal: dateDismissal}, tableType: tableType}))
        } else if (!employee) {
            createEmployee();
        } else {
            updateEmployee();
        }
    }
    const cleanObject = (object: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createEmployee = async () => {
        const userData = cleanObject(userFormData);
        const employeeData = cleanObject(employeeFormData);
        // @ts-ignore
        await dispatch(axiosCreateEmployeeInfo({user: userData, employee: employeeData}))
    }
    const updateEmployee= async () => {
        const userData = cleanObject(userFormData);
        const employeeData = cleanObject(employeeFormData);
        // @ts-ignore
        await dispatch(axiosUpdateEmployeeInfo({employeeId: employee.id, employeeFormData: {user: userData, employee: employeeData}}))
    }
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosGetRolesList())
        // @ts-ignore
        dispatch(axiosGetPositionsList());
    }, [dispatch, isModalOpen]);
    return (
        <form onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    {
                        employee?.id
                            ?
                            <>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Редагування даних користувача
                                </h2>
                                <h4 className="text-base font-bold leading-7 text-gray-900">
                                    {userFormData.last_name} {userFormData.first_name} {userFormData.patronymic_name}
                                </h4>
                            </>
                            : (
                                firingEmployee?.id ?
                                    <>
                                        <h2 className="text-base font-semibold leading-7 text-gray-900">
                                            Звільнення користувача
                                        </h2>
                                        <h4 className="text-base font-bold leading-7 text-gray-900">
                                            {userFormData.last_name} {userFormData.first_name} {userFormData.patronymic_name}
                                        </h4>
                                    </>
                                    :
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">
                                        Створення нового користувача
                                    </h2>
                            )

                    }


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {allertError !== null ?
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                <p className="font-bold">Помилка!</p>
                                <p>{allertError}</p>
                            </div>
                            : ''

                        }
                        { firingEmployee?.id ?
                            <>
                                {/* Дата звільнення */}
                                <div className="sm:col-span-full">
                                    <label htmlFor="date_dismissal" className="block text-sm font-medium leading-6 text-gray-900">
                                        Дата звільнення
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="date"
                                            name="date_dismissal"
                                            min={employeeFormData?.employment_date}
                                            max={maxDate}
                                            id="date_dismissal"
                                            value={dateDismissal}
                                            className="block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 border-gray-300 focus:ring-indigo-600"
                                            onChange={e => {
                                                setDateDismissal(e.target.value);
                                            }}
                                        />
                                    </div>

                                </div>
                            </>
                            :
                            <>
                                {/*// @ts-ignore*/}
                                <UserFormPart userFormData={userFormData}
                                              setUserFormData={setUserFormData}
                                              errors={errors}
                                              clearErrors={clearErrors}
                                              maxDate={maxDate}
                                              roles={roles}
                                />
                                <EmployeeFormPart
                                    // @ts-ignore
                                    clearEmployeeErrors={clearErrors}
                                    employeeErrors={employeeErrors}
                                    // @ts-ignore
                                    employeeFormData={employeeFormData}
                                    maxDate={maxDate}
                                    positons={positions}
                                    // @ts-ignore
                                    setEmployeeFormData={setEmployeeFormData}
                                />
                            </>
                        }

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={() => dispatch(openCloseModal({open: false}))} type="button" className="text-sm font-semibold leading-6 text-gray-900"
                        disabled={formLoading}>
                    Скасувати
                </button>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {formLoading ? (
                        <Spinner/>
                    ) : (
                        "Зберегти"
                    )}
                </button>
            </div>
        </form>
    )
}
