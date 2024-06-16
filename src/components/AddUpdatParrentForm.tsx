import {useEffect, useState} from "react";
import Spinner from "./Spinner.tsx";
import UserFormPart from "./UserFormPart.tsx";
import ParrentFormPart from "./ParrentFormPart.tsx";
import {useDispatch, useSelector} from "react-redux";
import {axiosCreateParrentInfo, axiosUpdateParrentInfo, cleanParrentErrors} from "../store/parrentsSlice.ts";
import {axiosGetRolesList} from "../store/rolesSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import {axiosChildrenSelectList} from "../store/childrenListSlice.ts";


export default function AddUpdateParrentForm() {
    // @ts-ignore
    const parrent = useSelector(state => state.parrents.parrentToUpdate);
    // @ts-ignore
    const parrentInfo = useSelector(state => state.parrents.parrent);
    // @ts-ignore
    const isModalOpen = useSelector(state => state.modal.isOpen);
    // @ts-ignore
    const roles = useSelector(state => state.roles.roles);
    // @ts-ignore
    const childrenList = useSelector(state => state.childrenList.childrenforSelect);
    // @ts-ignore
    const formLoading = useSelector(state => state.parrents.statusForm === 'loading');
    const today = new Date();
    const maxDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    // @ts-ignore
    const errors = useSelector(state => state.parrents.userValidationErrors);
    // @ts-ignore
    const parrentErrors = useSelector(state => state.parrents.parrentValidationErrors);
    // @ts-ignore
    const allertError = useSelector(state => state.parrents.error);

    const [userFormData, setUserFormData] = useState({
        first_name: parrentInfo?.first_name ?? '',
        last_name: parrentInfo?.last_name ?? '',
        patronymic_name: parrentInfo?.patronymic_name ?? '',
        email: parrentInfo?.email ?? '',
        role: parrentInfo?.role ?? '',
        city: parrentInfo?.city ?? '',
        street: parrentInfo?.street ?? '',
        house_number: parrentInfo?.house_number ?? '',
        apartment_number: parrentInfo?.apartment_number ?? '',
        birth_date: parrentInfo?.birth_date ?? '',
        user_id: parrentInfo?.user_id ?? ''
    });
    const dispatch = useDispatch();
    const [parrentFormData, setParrentFormData] = useState({
        phone: parrentInfo?.phone ?? '',
        work_place: parrentInfo?.work_place ?? '',
        passport_data: parrentInfo?.passport_data ?? '',
        marital_status: parrentInfo?.marital_status ?? '',
        children: parrentInfo?.children ?? []
    });
    const clearErrors = (field: string) => {
        // @ts-ignore
        dispatch(cleanParrentErrors());
        dispatch(cleanParrentErrors({field}));
    };


    const submitForm = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        if (!parrent) {
            createParrent();
        } else {
            updateParrent();
        }
    }
    const cleanObject = (object: ArrayLike<unknown> | { [s: string]: unknown; }) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createParrent = async () => {
        const userData = cleanObject(userFormData);
        const parrentData = cleanObject(parrentFormData);
        // @ts-ignore
        await dispatch(axiosCreateParrentInfo({user: userData, parrent: parrentData}));
    }
    const updateParrent = async () => {
        const userData = cleanObject(userFormData);
        const parrentData = cleanObject(parrentFormData);
        // @ts-ignore
        await dispatch(axiosUpdateParrentInfo({parrentId: parrent?.id, parrentFormData: {user: userData, parrent: parrentData}}));

    }
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosGetRolesList())
        if (!parrent) {
            // @ts-ignore
            dispatch(axiosChildrenSelectList());
        } else {
            // @ts-ignore
            dispatch(axiosChildrenSelectList(parrent.id));
        }

    }, [dispatch, isModalOpen]);

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
                        {allertError !== null ?
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
                                <p className="font-bold">Помилка!</p>
                                <p>{allertError}</p>
                            </div>
                            : ''

                        }
                        {/*// @ts-ignore*/}
                        <UserFormPart userFormData={userFormData}
                                      setUserFormData={setUserFormData}
                                      errors={errors}
                                      clearErrors={clearErrors}
                                      maxDate={maxDate}
                                      roles={roles}
                        />
                        {/*// @ts-ignore*/}
                        <ParrentFormPart
                            parrentErrors={parrentErrors}
                            // @ts-ignore
                            parrentFormData={parrentFormData}
                            children={childrenList}
                            // @ts-ignore
                            setParrentFormData={setParrentFormData}
                            clearParrentErrors={clearErrors}/>

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
