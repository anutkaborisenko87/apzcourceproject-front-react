import {ChildData} from "../apiServices/apiServicesTypes.ts";
import {useEffect, useState} from "react";

type FormParProps = {
    childFormData: ChildData;
    setChildFormData: () => void;
    clearChildErrors: (maritalStatus: string) => void;
    childErrors: {
        group_id: [],
        mental_helth: [],
        birth_certificate: [],
        medical_card_number: [],
        social_status: [],
        enrollment_date: [],
        graduation_date: [],
        parrents: [],
    };
    groups: [];
    parrents: [];
}
const ChildFormPart = ({
                           childFormData,
                           setChildFormData,
                           clearChildErrors,
                           childErrors,
                           groups,
                           parrents
                       }: FormParProps) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedParrent, setSelectedParrent] = useState("");
    const removeParrent = (index: any) => {
        // @ts-ignore
        setChildFormData((childFormData: any) => {
            return {
                ...childFormData,
                parrents: childFormData.parrents.filter((parrent: any) => {
                    parrent.parrent_id !== index
                })
            }
        });
        setInputValue('');
        setSelectedParrent('');
    };
    useEffect(() => {

        if (selectedParrent && inputValue) {
            const selectedParrentData = parrents.find((parrent) => {
                // @ts-ignore
                return parrent.id == selectedParrent
            });
            // @ts-ignore
            setChildFormData((childFormData: any) => {
                // @ts-ignore
                const existingParrent = childFormData.parrents.find((parrent: any) => parrent.parrent_id === selectedParrentData.id);
                if (existingParrent) {
                    return {
                        ...childFormData,
                        // @ts-ignore
                        parrents: childFormData.parrents.map((parrent: { parrent_id: any; }) => parrent.parrent_id === selectedParrentData.id
                                ? {...parrent, relations: inputValue}
                                : parrent),
                    };

                } else {
                    return {
                        ...childFormData,
                        parrents: [
                            ...childFormData.parrents,
                            {
                                // @ts-ignore
                                parrent_id: selectedParrentData.id,
                                // @ts-ignore
                                parrent_name: selectedParrentData.label,
                                relations: inputValue,
                            },
                        ],
                    };
                }
            });
        }
    }, [selectedParrent, inputValue]);
    return (
        <>
            {/* Дата вступу */}
            <div className="sm:col-span-3">
                <label htmlFor="enrollment_date" className="block text-sm font-medium leading-6 text-gray-900">
                    Дата вступу
                </label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="enrollment_date"
                        id="enrollment_date"
                        value={childFormData?.enrollment_date ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            childErrors.enrollment_date?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearChildErrors('enrollment_date');
                            // @ts-ignore
                            setChildFormData(childFormData => ({...childFormData, enrollment_date: e.target.value}));
                        }}
                    />
                </div>
                {childErrors.enrollment_date.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {
                            // @ts-ignore
                            childErrors.enrollment_date.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                    </div>
                )}
            </div>
            {/* Дата випуску */}
            <div className="sm:col-span-3">
                <label htmlFor="graduation_date" className="block text-sm font-medium leading-6 text-gray-900">
                    Дата випуску
                </label>
                <div className="mt-2">
                    <input
                        type="date"
                        name="graduation_date"
                        id="graduation_date"
                        min={childFormData?.enrollment_date ?? ''}
                        value={childFormData?.graduation_date ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            childErrors.graduation_date?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearChildErrors('enrollment_date');
                            // @ts-ignore
                            setChildFormData(childFormData => ({...childFormData, graduation_date: e.target.value}));
                        }}
                        disabled={childFormData?.enrollment_date === ''}
                    />
                </div>
                {childErrors.enrollment_date.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {
                            // @ts-ignore
                            childErrors.graduation_date.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                    </div>
                )}
            </div>
            {/* група */}
            <div className="sm:col-span-6">
                <label htmlFor="group_id" className="block text-sm font-medium leading-6 text-gray-900">
                    Група
                </label>
                <div className="mt-2 w-full flex">
                    <select
                        id="group_id"
                        name="group_id"
                        // @ts-ignore
                        value={childFormData?.group_id ?? ''}
                        onChange={e => {
                            clearChildErrors('group_id');
                            // @ts-ignore
                            setChildFormData(childFormData => ({...childFormData, group_id: e.target.value}));
                        }}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                        <option>не назначено</option>
                        {groups.length > 0 &&
                            // @ts-ignore
                            groups.map((group) => (
                                // @ts-ignore
                                <option key={group.id} value={group.id}>{group.title}</option>
                            ))}
                    </select>
                </div>
                {childErrors.group_id.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {
                            // @ts-ignore
                            childErrors.group_id.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                    </div>
                )}
            </div>

            {/*Психологічна характеристика*/}
            <div className="sm:col-span-6">
                <label htmlFor="mental_helth" className="block text-sm font-medium leading-6 text-gray-900">
                    Психологічна характеристика
                </label>
                <div className="mt-2">
                    <textarea
                        name="mental_helth"
                        id="mental_helth"
                        // @ts-ignore
                        value={childFormData?.mental_helth ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            childErrors.mental_helth?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearChildErrors('mental_helth');
                            // @ts-ignore
                            setChildFormData(childFormData => ({
                                ...childFormData,
                                mental_helth: e.target.value
                            }));
                        }}
                    />
                </div>
                {childErrors.mental_helth.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {   // @ts-ignore
                            childErrors.mental_helth.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                    </div>
                )}
            </div>

            {/* Свідоцтво про народження  */}
            <div className="sm:col-span-3">
                <label htmlFor="birth_certificate" className="block text-sm font-medium leading-6 text-gray-900">
                    Свідоцтво про народження
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="birth_certificate"
                        id="birth_certificate"
                        // @ts-ignore
                        value={childFormData?.birth_certificate ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            childErrors.birth_certificate?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearChildErrors('birth_certificate');
                            // @ts-ignore
                            setChildFormData(childFormData => ({
                                ...childFormData,
                                birth_certificate: e.target.value
                            }));
                        }}
                    />
                </div>
                {childErrors.birth_certificate.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {childErrors.birth_certificate.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Номер медичної карти  */}
            <div className="sm:col-span-3">
                <label htmlFor="medical_card_number" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер медичної карти
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="medical_card_number"
                        id="medical_card_number"
                        // @ts-ignore
                        value={childFormData?.medical_card_number ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            childErrors.medical_card_number?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearChildErrors('medical_card_number');
                            // @ts-ignore
                            setChildFormData(childFormData => ({
                                ...childFormData,
                                medical_card_number: e.target.value
                            }));
                        }}
                    />
                </div>
                {childErrors.medical_card_number.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {childErrors.medical_card_number.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Соціальний статус */}
            <div className="sm:col-span-3">
                <label htmlFor="social_status" className="block text-sm font-medium leading-6 text-gray-900">
                    Соціальний статус
                </label>
                <div className="mt-2">
                    <input
                        id="social_status"
                        name="social_status"
                        type="social_status"
                        // @ts-ignore
                        value={childFormData?.social_status ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            childErrors.social_status?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearChildErrors('social_status');
                            // @ts-ignore
                            setChildFormData(childFormData => ({
                                ...childFormData,
                                social_status: e.target.value
                            }));
                        }}
                    />
                </div>
                {childErrors.social_status.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {childErrors.social_status.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
            {/* Батьки дитини */}
            <div className="sm:col-span-full">
                <label htmlFor="price"
                       className="block text-sm font-medium leading-6 text-gray-900">Батьки</label>
                {
                    // @ts-ignore
                    childFormData.parrents.length > 0 ?
                        // @ts-ignore
                        childFormData.parrents.map(parrent => {
                            if (parrent) {
                                return (<div key={parrent?.parrent_id}
                                             className="w-2/5 p-2 border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                                    {parrent?.parrent_name} {`(${parrent?.relations})`}
                                    <button className="text-small text-red-500 hover:text-red-700 ml-3"
                                            onClick={() => removeParrent(parrent.parrent_id)}
                                    >&times;</button>
                                </div>)
                            }

                        })
                        : <></>}

            </div>
            <div className="sm:col-span-6">
                <div className="relative mt-2 rounded-md shadow-sm flex flex-row-reverse">
                    <input type="text" name="price" id="price"
                           className="w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           disabled={selectedParrent === ''}
                           value={inputValue}
                           onChange={e => setInputValue(e.target.value)}
                    />
                    <div className="w-1/2 flex items-center">
                        <select id="currency" name="currency"
                                className="w-full h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                value={selectedParrent}
                                onChange={(e) => setSelectedParrent(e.target.value)}
                        >
                            <option>не назначати</option>
                            {
                                parrents.map((parrent) => (
                                    // @ts-ignore
                                    <option key={parrent.id} value={parrent.id}>{parrent.label}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChildFormPart;
