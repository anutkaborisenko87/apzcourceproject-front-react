import {ParrentFormData} from "../apiServices/apiServicesTypes.ts";
import {useEffect, useState} from "react";

type FormParProps = {
    parrentFormData: ParrentFormData;
    setParrentFormData: () => void;
    clearParrentErrors: () => void;
    parrentErrors: {
        phone: [],
        work_place: [],
        passport_data: [],
        marital_status: [],
        children: []
    };
    children: [];
}
const ParrentFormPart = ({
                             parrentFormData,
                             setParrentFormData,
                             clearParrentErrors,
                             parrentErrors,
                             children
                         }: FormParProps) => {
    const [inputValue, setInputValue] = useState("");
    const [selectedChild, setSelectedChild] = useState("");
    const removeChild = (index: any) => {
        setParrentFormData(parrentFormData => {
            return {
                ...parrentFormData,
                children: parrentFormData.children.filter((child) => child.child_id !== index)
            }
        });
        setInputValue('');
        setSelectedChild('');
    };
    useEffect(() => {

        if (selectedChild && inputValue) {
            const selectedChildData = children.find((child) => {
               return child.id == selectedChild
            });
            // @ts-ignore
            setParrentFormData((parrentFormData) => {
                const existingChild = parrentFormData.children.find(
                    (child: { child_id: any; }) => child.child_id === selectedChildData.id
                );

                if (existingChild) {
                    // Если ребенок уже есть в массиве, обновите его свойство 'relations'
                    return {
                        ...parrentFormData,
                        children: parrentFormData.children.map((child: { child_id: any; }) =>
                            child.child_id === selectedChildData.id
                                ? {...child, relations: inputValue}
                                : child
                        ),
                    };
                } else {
                    // Если ребенка нет в массиве, добавьте нового ребенка
                    return {
                        ...parrentFormData,
                        children: [
                            ...parrentFormData.children,
                            {
                                child_id: selectedChildData.id,
                                child_name: selectedChildData.label,
                                relations: inputValue,
                            },
                        ],
                    };
                }
            });
        }
    }, [selectedChild, inputValue]);
    return (
        <>

            {/* номер телефону */}
            <div className="sm:col-span-4">
                <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                    Номер телефону
                </label>
                <div className="mt-2">
                    <input
                        type="phone"
                        name="phone"
                        id="phone"
                        value={parrentFormData?.phone ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            parrentErrors.phone?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearParrentErrors('phone');
                            setParrentFormData(parrentFormData => ({...parrentFormData, phone: e.target.value}));
                        }}
                    />
                </div>
                {parrentErrors.phone.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {parrentErrors.phone.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/*Місце роботи*/}
            <div className="sm:col-span-6">
                <label htmlFor="work_place" className="block text-sm font-medium leading-6 text-gray-900">
                    Місце роботи
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="work_place"
                        id="work_place"
                        value={parrentFormData?.work_place ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            parrentErrors.work_place?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearParrentErrors('work_place');
                            setParrentFormData(parrentFormData => ({
                                ...parrentFormData,
                                work_place: e.target.value
                            }));
                        }}
                    />
                </div>
                {parrentErrors.work_place.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {parrentErrors.work_place.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Паспортні дані  */}
            <div className="sm:col-span-3">
                <label htmlFor="passport_data" className="block text-sm font-medium leading-6 text-gray-900">
                    Паспортні дані
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="passport_data"
                        id="passport_data"
                        value={parrentFormData?.passport_data ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            parrentErrors.passport_data?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearParrentErrors('passport_data');
                            setParrentFormData(parrentFormData => ({
                                ...parrentFormData,
                                passport_data: e.target.value
                            }));
                        }}
                    />
                </div>
                {parrentErrors.passport_data.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {parrentErrors.passport_data.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>

            {/* Соціальний статус */}
            <div className="sm:col-span-3">
                <label htmlFor="marital_status" className="block text-sm font-medium leading-6 text-gray-900">
                    Соціальний статус
                </label>
                <div className="mt-2">
                    <input
                        id="marital_status"
                        name="marital_status"
                        type="marital_status"
                        value={parrentFormData?.marital_status ?? ''}
                        className={`block w-full rounded-md border-1 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:leading-6 ${
                            parrentErrors.marital_status?.length > 0 ? 'border-red-600 focus:border-red-300 focus:ring-red-500' : 'border-gray-300 focus:ring-indigo-600'
                        }`}
                        onChange={e => {
                            clearParrentErrors('marital_status');
                            setParrentFormData(parrentFormData => ({
                                ...parrentFormData,
                                marital_status: e.target.value
                            }));
                        }}
                    />
                </div>
                {parrentErrors.marital_status.length > 0 && (
                    <div className="text-red-500 text-xs">
                        {parrentErrors.marital_status.map((error, index) => (
                            <p key={index}>{error}</p>
                        ))}
                    </div>
                )}
            </div>
            {/* Діти батька */}
            <div className="sm:col-span-full">
                {parrentFormData.children.length > 0 ?
                    parrentFormData.children.map(child => {
                        return (<div key={child.child_id}
                            className="w-2/5 p-2 border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                            {child.child_name} {`(${child.relations})`}
                            <button className="text-small text-red-500 hover:text-red-700 ml-3"
                                    onClick={() => removeChild(child.child_id)}
                            >&times;</button>
                        </div>)
                    })
                    : <></>}

            </div>
            <div className="sm:col-span-6">
                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">Діти</label>
                <div className="relative mt-2 rounded-md shadow-sm flex flex-row-reverse">
                    <input type="text" name="price" id="price"
                           className="w-1/2 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                           disabled={selectedChild === ''}
                           value={inputValue}
                           onChange={e => setInputValue(e.target.value)}
                    />
                    <div className="w-1/2 flex items-center">
                        <select id="currency" name="currency"
                                className="w-full h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                value={selectedChild}
                                onChange={(e) => setSelectedChild(e.target.value)}
                        >
                            <option>не назначати</option>
                            {
                                children.map((child) => (
                                    <option key={child.id} value={child.id}>{child.label}</option>
                                ))
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
        </>
    );
};

export default ParrentFormPart;
