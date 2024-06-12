import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {useEffect, useState} from "react";
import {getRolesList} from "../apiServices/rolesApiServices.ts";
import {createNewUser, getUserInfo, updateUserInfo} from "../apiServices/usersApiServices.ts";
import Spinner from "./Spinner.tsx";
import UserFormPart from "./UserFormPart.tsx";

type UserType = {
    id: number,
}

type FormProps = {
    user?: UserType,
    onCloseModal: () => void
    onSubmitForm: () => void
}
export default function AddUpdateUserForm({user, onCloseModal, onSubmitForm}: FormProps) {
    const {setNotification} = useStateContext();
    const [roles, setRoles] = useState([]);
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
    const clearErrors = (field: string) => {
        setAllertError('');
        setErrors({...errors, [field]: []});
    };
    const safeValue = (value, defaultValue = '') => value !== null ? value : defaultValue;
    const getUser = async () => {
        setFormLoading(true);
        try {
            const userData = await getUserInfo(user?.id);
            setUserFormData({
                first_name: safeValue(userData.first_name),
                last_name: safeValue(userData.last_name),
                patronymic_name: safeValue(userData.patronymic_name),
                email: safeValue(userData.email),
                role: userData.role ? userData.role.id : safeValue(userData.role),
                city: safeValue(userData.city),
                street: safeValue(userData.street),
                house_number: safeValue(userData.house_number),
                apartment_number: safeValue(userData.apartment_number),
                birth_date: safeValue(userData.birth_date),
                user_id: safeValue(userData.user_id)
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
            console.error(error)
        }
    }

    const submitForm = (ev) => {
        ev.preventDefault();
        if (!user) {
            createUser();
        } else {
            updateUser();
        }
    }
    const cleanObject = (object) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createUser = async () => {
        setFormLoading(true);
        const cleanedFormData = cleanObject(userFormData);
        try {
            const data = await createNewUser(cleanedFormData);
            onSubmitForm();
            let userName = `${data.last_name} ${data.first_name}  ${data.patronymic_name ?? ''}`;
            let category = data?.user_category === "employee" ? "співробітники" : (data?.user_category === "parent" ? "батьки" : (data?.user_category === "children" ? "діти" : "адмін. персонал"));
            setNotification({type: "success", message: `Користувача ${userName} додано до категорії ${category}!`});
            setFormLoading(false);
        } catch ({response}) {
            if (response && response.status === 422) {
                const {
                    first_name,
                    last_name,
                    patronymic_name,
                    email,
                    role,
                    city,
                    street,
                    house_number,
                    apartment_number,
                    birth_date
                } = response.data.errors;
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ...(first_name ? {first_name} : {}),
                    ...(last_name ? {last_name} : {}),
                    ...(patronymic_name ? {patronymic_name} : {}),
                    ...(email ? {email} : {}),
                    ...(role ? {role} : {}),
                    ...(city ? {city} : {}),
                    ...(street ? {street} : {}),
                    ...(house_number ? {house_number} : {}),
                    ...(apartment_number ? {apartment_number} : {}),
                    ...(birth_date ? {birth_date} : {})
                }));
            }
            if (response && response.status !== 422) {
                const {error} = response.data;
                setAllertError(error);
            }
            setFormLoading(false);
        }
    }
    const updateUser = async () => {
        setFormLoading(true);
        const cleanedFormData = cleanObject(userFormData);
        try {
            const data = await updateUserInfo(user?.id, cleanedFormData);
            onSubmitForm();
            let userName = `${data.last_name} ${data.first_name}  ${data.patronymic_name ?? ''}`;
            setNotification({type: "success", message: `Інформацію про користувача ${userName} оновлено!`});
            setFormLoading(false);
        } catch ({response}) {
            if (response && response.status === 422) {
                const {
                    first_name,
                    last_name,
                    patronymic_name,
                    email,
                    role,
                    city,
                    street,
                    house_number,
                    apartment_number,
                    birth_date
                } = response.data.errors;
                setErrors(prevErrors => ({
                    ...prevErrors,
                    ...(first_name ? {first_name} : {}),
                    ...(last_name ? {last_name} : {}),
                    ...(patronymic_name ? {patronymic_name} : {}),
                    ...(email ? {email} : {}),
                    ...(role ? {role} : {}),
                    ...(city ? {city} : {}),
                    ...(street ? {street} : {}),
                    ...(house_number ? {house_number} : {}),
                    ...(apartment_number ? {apartment_number} : {}),
                    ...(birth_date ? {birth_date} : {})
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
        if (user) {
            getUser();
        }
        getRoles();
    }, []);
    return (
        <form onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    {
                        user?.id
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

                    </div>
                </div>

            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button onClick={onCloseModal} type="button" className="text-sm font-semibold leading-6 text-gray-900" disabled={formLoading}>
                    Скасувати
                </button>
                <button
                    type="submit"
                    disabled={formLoading}
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {formLoading ? (
                        <Spinner />
                    ) : (
                        "Зберегти"
                    )}
                </button>
            </div>
        </form>
    )
}
