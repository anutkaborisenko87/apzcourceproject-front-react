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
        title: group?.title ?? '',
        children: group?.children ?? [],
        teachers: group?.teachers ?? [],
        date_start: group?.date_start ?? '',
        date_finish: group?.date_finish ?? ''
    });
    const dispatch = useDispatch();
    const clearErrors = (field: string) => {
        // @ts-ignore
        dispatch(cleanGroupErrors());
        dispatch(cleanGroupErrors({field}));
    };
    const handleChildSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedChildId = parseInt(e.target.value);
        if (groupFormData.children.includes(selectedChildId)) {
            setGroupFormData(prevState => ({
                ...prevState,
                children: prevState.children.filter((childId: number) => childId !== selectedChildId)
            }));
        } else {
            setGroupFormData(prevState => ({
                ...prevState,
                children: [...prevState.children, selectedChildId]
            }));
        }
    };
    const handleTeachersSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedTeacherId = parseInt(e.target.value);
        if (groupFormData.teachers.includes(selectedTeacherId)) {
            setGroupFormData(prevState => ({
                ...prevState,
                teachers: prevState.teachers.filter((childId: number) => childId !== selectedTeacherId)
            }));
        } else {
            setGroupFormData(prevState => ({
                ...prevState,
                teachers: [...prevState.teachers, selectedTeacherId]
            }));
        }
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
    // @ts-ignore
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
            {/* Вихователі групи */}
            <div className="sm:col-span-full">
                <label htmlFor="teachers" className="block text-sm font-medium leading-6 text-gray-900">Вихователі
                    групи:</label>
                {
                    // @ts-ignore
                    group !== null && group?.teachers?.length > 0 ?
                        // @ts-ignore
                        group.teachers.map(teacher => {
                            return (<div key={teacher.teacher_id}
                                         className="w-2/5 p-2 border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                                {teacher.teacher_name} {`(${teacher.teaching_period?.from} - ${teacher.teaching_period?.to})`}

                            </div>)
                        })
                        : <></>
                }

            </div>
            <div className="sm:col-span-6 my-2">
                <label htmlFor="teachers" className="block text-sm font-medium leading-6 text-gray-900">Назначити
                    вихователів</label>
                <div className="relative mt-2 rounded-md shadow-sm flex">
                    <div className="w-1/2 flex items-center">
                        <select id="teachers" name="teachers"
                                className="w-full h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                value={groupFormData.teachers}
                                onChange={handleTeachersSelect} multiple
                                disabled={groupFormData.teachers.length >= 2 || group?.teachers?.length >= 2 ? true : false}
                        >
                            {employees.length > 0 ?
                                employees.map((employee: { id: number; label: string; }) => (
                                    // @ts-ignore
                                    <option key={employee.id} value={employee.id}>{employee.label}</option>
                                ))
                                :
                                <></>
                            }
                        </select>
                    </div>
                </div>
                {/*employeeErrors.position_id.length > 0 && (
                      <div className="text-red-500 text-xs">
                          {employeeErrors.position_id.map((error, index) => (
                              <p key={index}>{error}</p>
                          ))}
                      </div>
                  )*/}
            </div>
            {/* Діти групи */}
            <div className="sm:col-span-full">
                <label htmlFor="cildren" className="block text-sm font-medium leading-6 text-gray-900">Діти в
                    групі:</label>
                {
                    // @ts-ignore
                    group !== null && group?.children?.length > 0 ?
                        // @ts-ignore
                        group.children.map(child => {
                            return (<div key={child.child_id}
                                         className="w-2/5 p-2 border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                                {child.child_name} {`(${child.enrolment_period?.from} - ${child.enrolment_period?.to})`}

                            </div>)
                        })
                        : <></>
                }

            </div>
            <div className="sm:col-span-6 my-2">
                <label htmlFor="cildren" className="block text-sm font-medium leading-6 text-gray-900">Діти до
                    зарахування</label>
                <div className="relative mt-2 rounded-md shadow-sm flex">
                    <div className="w-1/2 flex items-center">
                        <select id="cildren" name="cildren"
                                className="w-full h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                value={groupFormData.children}
                                onChange={handleChildSelect} multiple
                        >
                            {children.length > 0 ?
                                children.map((child: { id: number; label: string; }) => (
                                    // @ts-ignore
                                    <option key={child.id} value={child.id}>{child.label}</option>
                                ))
                                :
                                <></>
                            }
                        </select>
                    </div>
                </div>
                {/*employeeErrors.position_id.length > 0 && (
                      <div className="text-red-500 text-xs">
                          {employeeErrors.position_id.map((error, index) => (
                              <p key={index}>{error}</p>
                          ))}
                      </div>
                  )*/}
            </div>
            {/*Дата початку навчання*/}
            <div className="sm:col-span-3">
                <label htmlFor="enrollment_date" className="block text-sm font-medium leading-6 text-gray-900">
                    Дата початку навчання в групі
                </label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="enrollment_date"
                        id="enrollment_date"
                        value={groupFormData?.date_start ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.date_start?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('date_start');
                            // @ts-ignore
                            setGroupFormData(groupFormData => ({
                                ...groupFormData,
                                date_start: e.target.value
                            }));
                        }}
                    />
                </div>
                {errors.date_start.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {
                            // @ts-ignore
                            errors.date_start.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                    </div>
                )}
            </div>
            {/* Дата випуску */}
            <div className="sm:col-span-3">
                <label htmlFor="graduation_date" className="block text-sm font-medium leading-6 text-gray-900">
                    Дата випуску групи
                </label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="graduation_date"
                        id="graduation_date"
                        min={groupFormData?.date_start ?? ''}
                        value={groupFormData?.date_finish ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            errors.date_finish?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearErrors('date_finish');
                            // @ts-ignore
                            setGroupFormData(groupFormData => ({
                                ...groupFormData,
                                date_finish: e.target.value
                            }));
                        }}
                        disabled={groupFormData?.date_start === ''}
                    />
                </div>
                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button onClick={() => dispatch(openCloseModal({open: false}))} type="button"
                            className="text-sm font-semibold leading-6 text-gray-900"
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
            </div>
        </form>
)
}
