import {useEffect, useState} from "react";
import Spinner from "./Spinner.tsx";
import UserFormPart from "./UserFormPart.tsx";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosParrentsSelect
} from "../store/parrentsSlice.ts";
import {axiosGetRolesList} from "../store/rolesSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import {
    axiosCreateChildInfo,
    axiosUpdateChildInfo,
    cleanChildErrors
} from "../store/childrenListSlice.ts";
import {axiosGetGroupsSelect} from "../store/groupsSlice.ts";
import ChildFormPart from "./ChildFormPart.tsx";


export default function AddUpdateChildForm({tableType}: {tableType: string}) {
    // @ts-ignore
    const child = useSelector(state => state.childrenList.childToUpdate);
    // @ts-ignore
    const childInfo = useSelector(state => state.childrenList.child);
    // @ts-ignore
    const isModalOpen = useSelector(state => state.modal.isOpen);
    // @ts-ignore
    const roles = useSelector(state => state.roles.roles);
    // @ts-ignore
    const groups = useSelector(state => state.groups.groups);
    // @ts-ignore
    const parrentsList = useSelector(state => state.parrents.parrentsforSelect);
    // @ts-ignore
    const formLoading = useSelector(state => state.childrenList.statusForm === 'loading');
    const today = new Date();
    const maxDate = `${today.getFullYear()}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    // @ts-ignore
    const errors = useSelector(state => state.childrenList.userValidationErrors);
    // @ts-ignore
    const childErrors = useSelector(state => state.childrenList.childValidationErrors);
    // @ts-ignore
    const allertError = useSelector(state => state.parrents.error);

    const [userFormData, setUserFormData] = useState({
        first_name: childInfo?.first_name ?? '',
        last_name: childInfo?.last_name ?? '',
        patronymic_name: childInfo?.patronymic_name ?? '',
        email: childInfo?.email ?? '',
        role: childInfo?.role ?? '',
        city: childInfo?.city ?? '',
        street: childInfo?.street ?? '',
        house_number: childInfo?.house_number ?? '',
        apartment_number: childInfo?.apartment_number ?? '',
        birth_date: childInfo?.birth_date ?? '',
        user_id: childInfo?.user_id ?? ''
    });
    const dispatch = useDispatch();
    const [childFormData, setChildFormData] = useState({
        group_id: childInfo?.group?.id ?? '',
        mental_helth: childInfo?.mental_helth ?? '',
        birth_certificate: childInfo?.birth_certificate ?? '',
        medical_card_number: childInfo?.medical_card_number ?? '',
        social_status: childInfo?.social_status ?? '',
        enrollment_date: childInfo?.enrollment_date ?? '',
        graduation_date: childInfo?.graduation_date ?? '',
        parrents: childInfo?.parrents ?? [],
    });
    const clearErrors = (field: string) => {
        // @ts-ignore
        dispatch(cleanChildErrors());
        dispatch(cleanChildErrors({field}));
    };


    const submitForm = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        if (!child) {
            createChild();
        } else {
            updateChild();
        }
    }
    const cleanObject = (object: ArrayLike<unknown> | { [s: string]: unknown; }) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createChild = async () => {
        const userData = cleanObject(userFormData);
        const childData = cleanObject(childFormData);
        // @ts-ignore
        await dispatch(axiosCreateChildInfo({payload: {user: userData, child: childData}, tableType: tableType}));
    }
    const updateChild = async () => {
        const userData = cleanObject(userFormData);
        const childData = cleanObject(childFormData);
        // @ts-ignore
        await dispatch(axiosUpdateChildInfo({childId: child?.id, payload: {user: userData, child: childData}, tableType: tableType}));

    }
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosGetRolesList())
        // @ts-ignore
        dispatch(axiosGetGroupsSelect())
        if (!child) {
            // @ts-ignore
            dispatch(axiosParrentsSelect());
        } else {
            // @ts-ignore
            dispatch(axiosParrentsSelect(child.id));
        }

    }, [dispatch, isModalOpen]);

    return (
        <form onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    {
                        child?.id
                            ?
                            <>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Редагування даних дитини
                                </h2>
                                <h4 className="text-base font-bold leading-7 text-gray-900">
                                    {userFormData.last_name} {userFormData.first_name} {userFormData.patronymic_name}
                                </h4>
                            </>
                            :
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Створення нової дитини
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
                        <ChildFormPart
                            childErrors={childErrors}
                            // @ts-ignore
                            childFormData={childFormData}
                            parrents={parrentsList}
                            groups={groups}
                            // @ts-ignore
                            setChildFormData={setChildFormData}
                            clearChildErrors={clearErrors}/>

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
