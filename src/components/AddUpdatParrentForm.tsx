import {useEffect, useState} from "react";
import {getRolesList} from "../apiServices/rolesApiServices.ts";
import Spinner from "./Spinner.tsx";
import UserFormPart from "./UserFormPart.tsx";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import ParrentFormPart from "./ParrentFormPart.tsx";
import {createParrentInfo, getParrentInfo, updateParrentInfo} from "../apiServices/parrentApiService.ts";
import {getChildrenListForSelect} from "../apiServices/childrenApiService.ts";

type ParrentType = {
    id: number,
}

type FormProps = {
    parrent?: ParrentType,
    onCloseModal: () => void
    onSubmitForm: () => void
}
export default function AddUpdateParrentForm({parrent, onCloseModal, onSubmitForm}: FormProps) {
    const {setNotification} = useStateContext();
    const [roles, setRoles] = useState([]);
    const [childrenList, setChildrenList] = useState([]);
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
    const [parrentErrors, setParrentErrors] = useState({
        phone: [],
        work_place: [],
        passport_data: [],
        marital_status: [],
        children: []
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

    const [parrentFormData, setParrentFormData] = useState({
        phone: '',
        work_place: '',
        passport_data: '',
        marital_status: '',
        children: []
    });
    const clearErrors = (field: string) => {
        setAllertError('');
        setErrors({...errors, [field]: []});
    };
    const clearParrentErrors = (field: string) => {
        setAllertError('');
        setParrentErrors({...parrentErrors, [field]: []});
    };
    const safeValue = (value, defaultValue = '') => value !== null ? value : defaultValue;
    const getParrent = async () => {
        setFormLoading(true);
        try {
            const parrentData = await getParrentInfo(parrent?.id);
            console.log('parrentData', parrentData)
            setUserFormData({
                first_name: safeValue(parrentData.first_name),
                last_name: safeValue(parrentData.last_name),
                patronymic_name: safeValue(parrentData.patronymic_name),
                email: safeValue(parrentData.email),
                role: parrentData.role ? parrentData.role.id : safeValue(parrentData.role),
                city: safeValue(parrentData.city),
                street: safeValue(parrentData.street),
                house_number: safeValue(parrentData.house_number),
                apartment_number: safeValue(parrentData.apartment_number),
                birth_date: safeValue(parrentData.birth_date),
                user_id: safeValue(parrentData.user_id)
            });
            setParrentFormData({
                phone: safeValue(parrentData.phone),
                passport_data: safeValue(parrentData.passport_data),
                work_place: safeValue(parrentData.work_place),
                marital_status: safeValue(parrentData.marital_status),
                children: parrentData.children ?? [],
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
    const getChildrenList = async () => {
        try {
            const childrenList = await getChildrenListForSelect();
            setChildrenList(childrenList);
        } catch (e) {
            setNotification({type: "error", message: "Щось пішло не так!"});
            console.error(e)
        }
    }

    const submitForm = (ev) => {
        ev.preventDefault();
        if (!parrent) {
            createParrent();
        } else {
            updateParrent();
        }
    }
    const cleanObject = (object) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createParrent = async () => {
        setFormLoading(true);
        const userData = cleanObject(userFormData);
        const parrentData = cleanObject(parrentFormData);
        try {
            const data = await createParrentInfo({user: userData, parrent: parrentData});
            onSubmitForm();
            let userName = `${data.last_name} ${data.first_name}  ${data.patronymic_name ?? ''}`;
            setNotification({type: "success", message: `Батька ${userName} додано!`});
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
                setParrentErrors(prevErrors => ({
                    ...prevErrors,
                    phone: errors['parrent.phone'] || [],
                    passport_data: errors['parrent.passport_data'] || [],
                    work_place: errors['parrent.bank_account'] || [],
                    marital_status: errors['parrent.marital_status'] || [],
                    children: errors['parrent.children'] || [],
                }));
            }
            if (response && response.status !== 422) {
                const {error} = response.data;
                setAllertError(error);
            }
            setFormLoading(false);
        }
    }
    const updateParrent = async () => {
        setFormLoading(true);
        const userData = cleanObject(userFormData);
        const parrentData = cleanObject(parrentFormData);
        try {
            const data = await updateParrentInfo(parrent?.id, {user: userData, parrent: parrentData});
            onSubmitForm();
            let userName = `${data.last_name} ${data.first_name}  ${data.patronymic_name ?? ''}`;
            setNotification({type: "success", message: `Інформацію про батька ${userName} оновлено!`});
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
                setParrentErrors(prevErrors => ({
                    ...prevErrors,
                    phone: errors['parrent.phone'] || [],
                    passport_data: errors['parrent.passport_data'] || [],
                    work_place: errors['parrent.bank_account'] || [],
                    marital_status: errors['parrent.marital_status'] || [],
                    children: errors['parrent.children'] || [],
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
        if (parrent) {
            getParrent();
        }
        getRoles();
        getChildrenList();
    }, []);
    return (
        <form onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    {
                        parrent?.id
                            ?
                            <>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Редагування даних батька
                                </h2>
                                <h4 className="text-base font-bold leading-7 text-gray-900">
                                    {userFormData.last_name} {userFormData.first_name} {userFormData.patronymic_name}
                                </h4>
                            </>
                            :
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Створення нового батька
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
                        <ParrentFormPart
                            parrentErrors={parrentErrors}
                            parrentFormData={parrentFormData}
                            children={childrenList}
                            setParrentFormData={setParrentFormData}
                            clearParrentErrors={clearParrentErrors}/>

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
