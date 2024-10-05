import {useEffect, useState} from "react";
import Spinner from "./Spinner.tsx";
import {useDispatch, useSelector} from "react-redux";
import {openCloseModal} from "../store/modalSlice.ts";
import {
    axiosCreateGroupInfo,
    axiosUpdateGroupInfo,
    cleanGroupErrors
} from "../store/groupsSlice.ts";
import {axiosChildrenListForGroupSelect} from "../store/childrenListSlice.ts";
import {axiosTeachers} from "../store/employeesSlice.ts";


export default function AddUpdateGroupForm() {
    // @ts-ignore
    const group = useSelector(state => state.groups.groupToUpdate);
    // @ts-ignore
    const groupInfo = useSelector(state => state.groups.group);
    // @ts-ignore
    const isModalOpen = useSelector(state => state.modal.isOpen);
    // @ts-ignore
    const children = useSelector(state => state.childrenList.childrenforSelect);
    // @ts-ignore
    const employees = useSelector(state => state.employees.employees);
    // @ts-ignore
    const formLoading = useSelector(state => state.groups.statusForm === 'loading');

    // @ts-ignore
    const errors = useSelector(state => state.groups.groupValidationErrors);

    // @ts-ignore
    const allertError = useSelector(state => state.groups.error);

    const [groupFormData, setGroupFormData] = useState({
        title: groupInfo?.title ?? '',
        children: groupInfo?.children ?? [],
        teachers: groupInfo?.teachers ?? [],
        educationalPrograms: groupInfo?.educationalPrograms ?? []
    });
    const dispatch = useDispatch();
    const clearErrors = (field: string) => {
        // @ts-ignore
        dispatch(cleanGroupErrors());
        dispatch(cleanGroupErrors({field}));
    };


    const submitForm = (ev: { preventDefault: () => void; }) => {
        ev.preventDefault();
        if (!group) {
            createGroup();
        } else {
            updateGroup();
        }
    }
    const cleanObject = (object: ArrayLike<unknown> | { [s: string]: unknown; }) => {
        return Object.fromEntries(
            Object.entries(object).filter(([_, v]) => v != null && v !== '')
        );
    }
    const createGroup = async () => {
        const groupData = cleanObject(groupFormData);
        // @ts-ignore
        await dispatch(axiosCreateGroupInfo(groupData));
    }
    const updateGroup = async () => {
        const groupData = cleanObject(groupFormData);
        // @ts-ignore
        await dispatch(axiosUpdateGroupInfo({groupId: group?.id, payload: groupData}));

    }
    useEffect(() => {
        // @ts-ignore
        dispatch(axiosChildrenListForGroupSelect())
        // @ts-ignore
        dispatch(axiosTeachers())

    }, [dispatch, isModalOpen]);

    return (
        <form onSubmit={submitForm}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    {
                        group?.id
                            ?
                            <>
                                <h2 className="text-base font-semibold leading-7 text-gray-900">
                                    Редагування даних групи
                                </h2>
                                <h4 className="text-base font-bold leading-7 text-gray-900">
                                    {groupFormData.title}
                                </h4>
                            </>
                            :
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                                Створення нової групи
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
                    </div>
                    {/*Назва групи*/}
                    <div className="sm:col-span-6">
                        <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                            Назва групи
                        </label>
                        <div className="mt-2">
                    <input
                        name="title"
                        id="title"
                        // @ts-ignore
                        value={groupFormData?.title ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.title?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('title');
                            // @ts-ignore
                            setGroupFormData(groupFormData => ({
                                ...groupFormData,
                                title: e.target.value
                            }));
                        }}
                    />
                        </div>
                        {errors.title.length > 0 && (
                            <div className="text-red-500 text-xs">
                                {   // @ts-ignore
                                    errors.title.map((error, index) => (
                                        <p key={index}>{error}</p>
                                    ))}
                            </div>
                        )}
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
