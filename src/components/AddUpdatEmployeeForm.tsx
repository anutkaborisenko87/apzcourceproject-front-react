import {useEffect, useState} from "react";
import {getRolesList} from "../apiServices/rolesApiServices.ts";
import {createNewUser, getUserInfo, updateUserInfo} from "../apiServices/usersApiServices.ts";
import Spinner from "./Spinner.tsx";
import UserFormPart from "./UserFormPart.tsx";
import EmployeeFormPart from "./EmployeeFormPart.tsx";
import {getPositionsList} from "../apiServices/positionsApiServices.ts";
import {addNewEmployeeInfo, getEmployeeInfo, updateEmployeeInfo} from "../apiServices/employeesApiServices.ts";
import {useStateContext} from "../../contexts/ContextProvider.tsx";

type EmployeeType = {
    id: number,
}

type FormProps = {
    employee?: EmployeeType,
    onCloseModal: () => void
    onSubmitForm: () => void
}
export default function AddUpdateEmployeeForm({employee, onCloseModal, onSubmitForm}: FormProps) {
    const {setNotification} = useStateContext();
    const [roles, setRoles] = useState([]);
    const [positions, setPositions] = useState([]);
    const [formLoading, setFormLoading] = useState(false);
    const today = new Date();
    const maxDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    const [errors, setErrors] = useState({
        first_name: [],
        last_name: [],
        patronymic_name: [],
        email: [],
        role: [],
        city: [],
        street: [],
        house_number: [],
        apartment_number: [],
        birth_date: []
    });
    const [employeeErrors, setEmployeeErrors] = useState({
        position_id: [],
        phone: [],
        contract_number: [],
        passport_data: [],
        bank_account: [],
        bank_title: [],
        EDRPOU_bank_code: [],
        code_IBAN: [],
        medical_card_number: [],
        employment_date: []
    });
    const [allertError, setAllertError] = useState('');

    const [userFormData, setUserFormData] = useState({
        first_name: '',
        last_name: '',
        patronymic_name: '',
        email: '',
        role: '',
        city: '',
        street: '',
        house_number: '',
        apartment_number: '',
        birth_date: '',
        user_id: ''
    });

    const [employeeFormData, setEmployeeFormData] = useState({
        position_id: '',
        phone: '',
        contract_number: '',
        passport_data: '',
        bank_account: '',
        bank_title: '',
        EDRPOU_bank_code: '',
        code_IBAN: '',
        medical_card_number: '',
        employment_date: ''
    });
    const clearErrors = (field: string) => {
        setAllertError('');
        setErrors({...errors, [field]: []});
    };
    const clearEmployeeErrors = (field: string) => {
        setAllertError('');
        setEmployeeErrors({...employeeErrors, [field]: []});
    };
    const safeValue = (value, defaultValue = '') => value !== null ? value : defaultValue;
    const getEmployee = async () => {
        setFormLoading(true);
        try {
            const employeeData = await getEmployeeInfo(employee?.id);
            console.log('employeeData', employeeData)
            setUserFormData({
                first_name: safeValue(employeeData.first_name),
                last_name: safeValue(employeeData.last_name),
                patronymic_name: safeValue(employeeData.patronymic_name),
                email: safeValue(employeeData.email),
                role: employeeData.role ? employeeData.role.id : safeValue(employeeData.role),
                city: safeValue(employeeData.city),
                street: safeValue(employeeData.street),
                house_number: safeValue(employeeData.house_number),
                apartment_number: safeValue(employeeData.apartment_number),
                birth_date: safeValue(employeeData.birth_date),
                user_id: safeValue(employeeData.user_id)
            });
            setEmployeeFormData({
                position_id: employeeData.position ? employeeData.position.id : safeValue(employeeData.position),
                phone: safeValue(employeeData.phone),
                contract_number: safeValue(employeeData.contract_number),
                passport_data: safeValue(employeeData.passport_data),
                bank_account: safeValue(employeeData.bank_account),
                bank_title: safeValue(employeeData.bank_title),
                EDRPOU_bank_code: safeValue(employeeData.EDRPOU_bank_code),
                code_IBAN: safeValue(employeeData.code_IBAN),
                medical_card_number: safeValue(employeeData.medical_card_number),
                employment_date: safeValue(employeeData.employment_date)
            });
            setFormLoading(false);
        } catch (error) {
            setNotification({type: "error", message: "Щось пішло не так!"});
            setFormLoading(false);
            console.error(error)
        }

    }
    const getRoles = async () => {
        try {
            const roles = await getRolesList();
            setRoles(roles);
        } catch (e) {
            setNotification({type: "error", message: "Щось пішло не так!"});
            console.error(e)
        }
    }
    const getPositions = async () => {
        try {
            const positions = await getPositionsList();
            setPositions(positions);
        } catch (e) {
            setNotification({type: "error", message: "Щось пішло не так!"});
            console.error(e)
        }
    }

    const submitForm = (ev) => {
        ev.preventDefault();
        if (!employee) {
            createEmployee();
        } else {
            updateEmployee();
        }
    }
    const cleanObject = (object) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createEmployee = async () => {
        setFormLoading(true);
        const userData = cleanObject(userFormData);
        const employeeData = cleanObject(employeeFormData);
        try {
            const data = await addNewEmployeeInfo({user: userData, employee: employeeData});
            onSubmitForm();
            let userName = `${data.last_name} ${data.first_name}  ${data.patronymic_name ?? ''}`;
            setNotification({type: "success", message: `Співробітника ${userName} додано!`});
            setFormLoading(false);
        } catch ({response}) {
            if (response && response.status === 422) {
                const errors = response.data.errors;
                setErrors(prevErrors => ({
                    ...prevErrors,
                    first_name: errors['user.first_name'] || [],
                    last_name: errors['user.last_name'] || [],
                    patronymic_name: errors['user.patronymic_name'] || [],
                    email: errors['user.email'] || [],
                    role: errors['user.role'] || [],
                    city: errors['user.city'] || [],
                    street: errors['user.street'] || [],
                    house_number: errors['user.house_number'] || [],
                    apartment_number: errors['user.apartment_number'] || [],
                    birth_date: errors['user.birth_date'] || [],
                }));
                setEmployeeErrors(prevErrors => ({
                    ...prevErrors,
                    position_id: errors['employee.position_id'] || [],
                    phone: errors['employee.phone'] || [],
                    contract_number: errors['employee.contract_number'] || [],
                    passport_data: errors['employee.passport_data'] || [],
                    bank_account: errors['employee.bank_account'] || [],
                    bank_title: errors['employee.bank_title'] || [],
                    EDRPOU_bank_code: errors['employee.EDRPOU_bank_code'] || [],
                    code_IBAN: errors['employee.code_IBAN'] || [],
                    medical_card_number: errors['employee.medical_card_number'] || [],
                    employment_date: errors['employee.employment_date'] || [],
                }));
            }
            if (response && response.status !== 422) {
                const {error} = response.data;
                setAllertError(error);
            }
            setFormLoading(false);
        }
    }
    const updateEmployee= async () => {
        setFormLoading(true);
        const userData = cleanObject(userFormData);
        const employeeData = cleanObject(employeeFormData);
        try {
            const data = await updateEmployeeInfo(employee?.id, {user: userData, employee: employeeData});
            onSubmitForm();
            let userName = `${data.last_name} ${data.first_name}  ${data.patronymic_name ?? ''}`;
            setNotification({type: "success", message: `Інформацію про співробітника ${userName} оновлено!`});
            setFormLoading(false);
        } catch ({response}) {
            if (response && response.status === 422) {
                const errors = response.data.errors;
                setErrors(prevErrors => ({
                    ...prevErrors,
                    first_name: errors['user.first_name'] || [],
                    last_name: errors['user.last_name'] || [],
                    patronymic_name: errors['user.patronymic_name'] || [],
                    email: errors['user.email'] || [],
                    role: errors['user.role'] || [],
                    city: errors['user.city'] || [],
                    street: errors['user.street'] || [],
                    house_number: errors['user.house_number'] || [],
                    apartment_number: errors['user.apartment_number'] || [],
                    birth_date: errors['user.birth_date'] || [],
                }));
                setEmployeeErrors(prevErrors => ({
                    ...prevErrors,
                    position_id: errors['employee.position_id'] || [],
                    phone: errors['employee.phone'] || [],
                    contract_number: errors['employee.contract_number'] || [],
                    passport_data: errors['employee.passport_data'] || [],
                    bank_account: errors['employee.bank_account'] || [],
                    bank_title: errors['employee.bank_title'] || [],
                    EDRPOU_bank_code: errors['employee.EDRPOU_bank_code'] || [],
                    code_IBAN: errors['employee.code_IBAN'] || [],
                    medical_card_number: errors['employee.medical_card_number'] || [],
                    employment_date: errors['employee.employment_date'] || [],
                }));
            }
            if (response && response.status !== 422) {
                const {error} = response.data;
                setAllertError(error);
            }
            setFormLoading(false);
        }
    }
    useEffect(() => {
        if (employee) {
            getEmployee();
        }
        getRoles();
        getPositions();
    }, []);
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
                            :
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Створення нового користувача
                            </h2>
                    }


                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        {allertError !== '' ?
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                <p className="font-bold">Помилка!</p>
                                <p>{allertError}</p>
                            </div>
                            : ''

                        }
                        <UserFormPart userFormData={userFormData}
                                      setUserFormData={setUserFormData}
                                      errors={errors}
                                      clearErrors={clearErrors}
                                      maxDate={maxDate}
                                      roles={roles}
                        />
                        <EmployeeFormPart
                            clearEmployeeErrors={clearEmployeeErrors}
                            employeeErrors={employeeErrors}
                            employeeFormData={employeeFormData}
                            maxDate={maxDate}
                            positons={positions}
                            setEmployeeFormData={setEmployeeFormData}
                        />

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={onCloseModal} type="button" className="text-sm font-semibold leading-6 text-gray-900"
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
