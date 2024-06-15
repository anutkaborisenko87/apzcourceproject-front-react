import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {useEffect, useState} from "react";
import Spinner from "./Spinner.tsx";
import UserFormPart from "./UserFormPart.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosCreateNewUser,
    axiosUpdateUserInfo,
    cleanErrors,
} from "../store/userSlice.ts";
import {axiosGetRolesList} from "../store/rolesSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";

export default function AddUpdateUserForm() {
    // @ts-ignore
    const user = useSelector(state => state.users.userToUpdate);
    // @ts-ignore
    const userInfo = useSelector(state => state.users.user);
    // @ts-ignore
    const isModalOpen = useSelector(state => state.modal.isOpen);
    // @ts-ignore
    const roles = useSelector(state => state.roles.roles);
    // @ts-ignore
    const formLoading = useSelector(state => state.users.statusForm === 'loading');
    const today = new Date();
    const maxDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    // @ts-ignore
    const errors = useSelector(state => state.users.validationErrors);
    // @ts-ignore
    const allertError = useSelector(state => state.users.error);

    const dispatch = useDispatch();
    const [userFormData, setUserFormData] = useState({
        first_name: userInfo?.first_name ?? '',
        last_name: userInfo?.last_name ?? '',
        patronymic_name: userInfo?.patronymic_name ?? '',
        email: userInfo?.email ?? '',
        role: userInfo?.role?.id ?? '',
        city: userInfo?.city ?? '',
        street: userInfo?.street ?? '',
        house_number: userInfo?.house_number ?? '',
        apartment_number: userInfo?.apartment_number ?? '',
        birth_date: userInfo?.birth_date ?? '',
        user_id: userInfo?.user_id ?? ''
    });
    const clearErrors = (field: string) => {
        // @ts-ignore
        dispatch(cleanErrors());
        dispatch(cleanErrors({field}));
    };

    const submitForm = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        if (!user) {
            createUser();
        } else {
            updateUser();
        }
    }
    const cleanObject = (object: { [s: string]: unknown; } | ArrayLike<unknown>) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createUser = async () => {
        const cleanedFormData = cleanObject(userFormData);
        // @ts-ignore
        await dispatch(axiosCreateNewUser(cleanedFormData));
    }
    const updateUser = async () => {
        const cleanedFormData = cleanObject(userFormData);
        // @ts-ignore
        await dispatch(axiosUpdateUserInfo({userId: user?.id, userFormData: cleanedFormData}));
    }

    useEffect(() => {
        // @ts-ignore
        dispatch(axiosGetRolesList())
    }, [dispatch, isModalOpen]);
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
                        {allertError !== null ?
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
                <button onClick={() => dispatch(openCloseModal({open: false}))} type="button"
                        className="text-sm font-semibold leading-6 text-gray-900" disabled={formLoading}>
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
