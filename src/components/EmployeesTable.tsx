import {
    ChevronUpDownIcon,
    ChevronUpIcon, FunnelIcon,
    MinusCircleIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon, XCircleIcon,
    XMarkIcon
} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosDeleteEmployee,
    axiosDeactivateEmployee,
    axiosReactivateEmployee,
    axiosGetEmployeeInfo,
    axiosActiveEmployees,
    axiosWorkingEmployeesList,
    axiosNotActiveEmployees,
    setEmployeeSearchableColumn,
} from "../store/employeesSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import SearchComponent from "./SearchComponent.tsx";
import FiltersComponent from "./FiltersComponent.tsx";
import {useCallback, useEffect, useState} from "react";
import * as _ from "lodash";
import DateFiltersComponent from "./DateFiltersComponent.tsx";

type PropsType = {
    tableType: string;
}
const EmployeesTable = ({tableType}: PropsType) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const employeesList = useSelector(state => state.employees?.employees?.data ?? []);
    // @ts-ignore
    const perPage = useSelector(state => state.employees?.employees?.per_page ?? 10);
    // @ts-ignore
    const filterEmployeesBy = useSelector(state => state.employees?.employees?.filter_employees_by ?? null);
    // @ts-ignore
    const dateFilterEmployeesBy = useSelector(state => state.employees?.employees?.date_filter_employees_by ?? null);
    // @ts-ignore
    const currPage = useSelector(state => state.employees?.employees?.current_page ?? 1);
    // @ts-ignore
    const employeeSortBy = useSelector(state => state.employees?.employees?.employee_sort_by ?? null);
    // @ts-ignore
    const sortDirection = useSelector(state => state.employees?.employees?.sort_direction ?? 'asc');
    // @ts-ignore
    const employeeSearchBy = useSelector(state => state.employees?.employees?.employee_search_by ?? null);
    // @ts-ignore
    const searchTerm = useSelector(state => state.employees?.employees?.search_term ?? null);
    const [showEmployeesFilters, setShowEmployeesFilters] = useState((filterEmployeesBy !== null && Object.keys(filterEmployeesBy).length > 0) || (dateFilterEmployeesBy !== null && Object.keys(dateFilterEmployeesBy).length > 0));
    // @ts-ignore
    const dateFilters = useSelector(state => state.employees?.employees?.dateFilters ?? []);
    // @ts-ignore
    const filters = useSelector(state => state.employees?.employees?.filters ?? []);
    const [selectedEmployeesFilters, setSelectedEmployeesFilters] = useState(filters);
    const [selectedDateEmployeesFilters, setDateSelectedEmployeesFilters] = useState(dateFilters);
    // @ts-ignore
    const handleEmployeesFilterChange = useCallback(async (sectionId: string, optionValue: string, checked: boolean) => {
        setSelectedEmployeesFilters((prevFilters: { id: string; options: { value: string; }[]; }[]) =>
            prevFilters.map((section: { id: string; options: { value: string; }[]; }) =>
                section.id === sectionId
                    ? {
                        ...section,
                        options: section.options.map((option: { value: string; }) =>
                            option.value === optionValue ? {...option, checked} : option
                        ),
                    }
                    : section
            )
        );
    }, []);
    const handleDateFilterChange = useCallback(async (sectionId: string, fromToKey: string, optionValue: string) => {
        setDateSelectedEmployeesFilters((prevFilters: any) => {
            return prevFilters.map((section: any) => {
                if (section.id === sectionId) {
                    return {
                        ...section,
                        [fromToKey]: {
                            ...section[fromToKey],
                            value: optionValue
                        }
                    };
                }
                return section;
            });
        });
    }, []);

    const filterBy = () => {
        let localfilters = {};
        if (selectedEmployeesFilters) {
            selectedEmployeesFilters.forEach((item: {
                options: { checked: boolean; value: string; label: string; }[];
                id: string;
                name: string;
            }): void => {
                let selectedOptions: string[] = [];
                item.options.forEach((option: { checked: boolean; value: string; label: string; }): void => {
                    if (option.checked) selectedOptions.push(option.value.toString());
                });
                // @ts-ignore
                if (selectedOptions.length > 0) localfilters[item.id] = selectedOptions;
            });
        }
        return Object.keys(localfilters).length > 0 ? localfilters : null;
    };
    const filterByDate = () => {
        let localfilters = {};
        selectedDateEmployeesFilters.forEach((item: any): void => {
            if (item.from?.value !== null && item.from?.value !== '') {
                // @ts-ignore
                localfilters[item.id] = {
                    // @ts-ignore
                    ...localfilters[item.id],
                    from: item.from.value,
                };
            }
            if (item.to?.value !== null && item.to?.value !== '') {
                // @ts-ignore
                localfilters[item.id] = {
                    // @ts-ignore
                    ...localfilters[item.id],
                    to: item.to.value,
                };
            }
        });

        return Object.keys(localfilters).length > 0 ? localfilters : null;
    };
    useEffect(() => {
        let formedFilters = filterBy();
        if (!_.isEqual(filterEmployeesBy, formedFilters)) {
            (async () => {
                await filteringBy(formedFilters);
            })();
        }
    }, [selectedEmployeesFilters, filterEmployeesBy]);
    useEffect(() => {
        let formedDateFilters = filterByDate();
        if (!_.isEqual(dateFilterEmployeesBy, formedDateFilters)) {
            (async () => {
                await filteringByDate(formedDateFilters);
            })();
        }
    }, [selectedDateEmployeesFilters, dateFilterEmployeesBy]);
    // @ts-ignore
    const filteringBy = useCallback(async (filters: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            dispatch(axiosActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                // @ts-ignore
                filter_employees_by: filters,
                search_term: searchTerm
            }));
        } else if (tableType === 'working') {
            // @ts-ignore
            dispatch(axiosWorkingEmployeesList({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                // @ts-ignore
                filter_employees_by: filters,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            dispatch(axiosNotActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                // @ts-ignore
                filter_employees_by: filters,
                search_term: searchTerm
            }));
        }
    }, [selectedEmployeesFilters]);
    // @ts-ignore
    const filteringByDate = useCallback(async (dateFilters: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            dispatch(axiosActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                // @ts-ignore
                filter_employees_by: filterEmployeesBy,
                search_term: searchTerm,
                // @ts-ignore
                date_filter_employees_by: dateFilters
            }));
        } else if (tableType === 'working') {
            // @ts-ignore
            dispatch(axiosWorkingEmployeesList({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                // @ts-ignore
                filter_employees_by: filterEmployeesBy,
                search_term: searchTerm,
                // @ts-ignore
                date_filter_employees_by: dateFilters
            }));
        } else {
            // @ts-ignore
            dispatch(axiosNotActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                // @ts-ignore
                filter_employees_by: filterEmployeesBy,
                search_term: searchTerm,
                // @ts-ignore
                date_filter_employees_by: dateFilters
            }));
        }
    }, [selectedDateEmployeesFilters]);
    const cancelFiltering = async () => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        } else if (tableType === 'working') {
            // @ts-ignore
            await dispatch(axiosWorkingEmployeesList({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        }
    }
    const onDeletingEmployee = async (employeeId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете видалити цього співробітника?")) {
            // @ts-ignore
            await dispatch(axiosDeleteEmployee({employeeId, tableType}));
        }
    }
    const onDeacttivatingEmployee = async (employeeId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього співробітника?")) {
            // @ts-ignore
            await dispatch(axiosDeactivateEmployee({employeeId, tableType}));
        }

    }
    const onReacttivatingEmployee = async (employeeId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете активувати цього співробітника?")) {
            // @ts-ignore

            await dispatch(axiosReactivateEmployee({employeeId, tableType}));
        }

    }
    const changePerPage = async (e: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveEmployees({
                page: 1,
                per_page: e.target.value,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        } else if (tableType === 'working') {
            // @ts-ignore
            await dispatch(axiosWorkingEmployeesList({
                page: 1,
                per_page: e.target.value,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveEmployees({
                page: 1,
                per_page: e.target.value,
                employee_sort_by: employeeSortBy,
                sort_direction: sortDirection,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        }

    }
    const beginSearchBy = async ({employee_search_by}: {
        employee_search_by?: string | null
    }) => {
        if (employee_search_by) dispatch(setEmployeeSearchableColumn({employee_search_by}));
        if (!employee_search_by) {
            if (tableType === 'active') {
                // @ts-ignore
                await dispatch(axiosActiveEmployees({
                    page: 1,
                    per_page: perPage,
                    employee_sort_by: employeeSortBy,
                    sort_direction: sortDirection
                }));
            } else if (tableType === 'working') {
                // @ts-ignore
                await dispatch(axiosWorkingEmployeesList({
                    page: 1,
                    per_page: perPage,
                    employee_sort_by: employeeSortBy,
                    sort_direction: sortDirection
                }));
            } else {
                // @ts-ignore
                await dispatch(axiosNotActiveEmployees({
                    page: 1,
                    per_page: perPage,
                    employee_sort_by: employeeSortBy,
                    sort_direction: sortDirection
                }));
            }
        }
    }

    const searchingByColumn = async (event: string) => {
        if (event !== '' && event !== searchTerm) {
            if (tableType === 'active') {
                // @ts-ignore
                await dispatch(axiosActiveEmployees({
                    page: 1,
                    per_page: perPage,
                    employee_search_by: employeeSearchBy,
                    search_term: event,
                    employee_sort_by: employeeSortBy,
                    sort_direction: sortDirection
                }));
            } else if (tableType === 'working') {
                // @ts-ignore
                await dispatch(axiosWorkingEmployeesList({
                    page: 1,
                    per_page: perPage,
                    employee_search_by: employeeSearchBy,
                    search_term: event,
                    employee_sort_by: employeeSortBy,
                    sort_direction: sortDirection
                }));
            } else {
                // @ts-ignore
                await dispatch(axiosNotActiveEmployees({
                    page: 1,
                    per_page: perPage,
                    employee_search_by: employeeSearchBy,
                    search_term: event,
                    employee_sort_by: employeeSortBy,
                    sort_direction: sortDirection
                }));
            }
        } else {
            beginSearchBy({employee_search_by: null});
        }
    }
    const sortingBy = async ({employee_sort_by}: {
        employee_sort_by?: string
    }) => {
        let sortDir = 'desc';
        if ((employee_sort_by === employeeSortBy) && sortDirection === sortDir) {
            sortDir = 'asc'
        }
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm,
                employee_sort_by: employee_sort_by ?? employeeSortBy,
                sort_direction: sortDir
            }));
        } else if (tableType === 'working') {
            // @ts-ignore
            await dispatch(axiosWorkingEmployeesList({
                page: currPage,
                per_page: perPage,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm,
                employee_sort_by: employee_sort_by ?? employeeSortBy,
                sort_direction: sortDir
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm,
                employee_sort_by: employee_sort_by ?? employeeSortBy,
                sort_direction: sortDir
            }));
        }
    }
    const cancelSortingBy = async () => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        } else if (tableType === 'working') {
            // @ts-ignore
            await dispatch(axiosWorkingEmployeesList({
                page: currPage,
                per_page: perPage,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveEmployees({
                page: currPage,
                per_page: perPage,
                employee_search_by: employeeSearchBy,
                search_term: searchTerm
            }));
        }
    }
    return (
        <>
            <div className="overflow-x-auto">
                <div className="flex items-center justify-between  flex-wrap">
                    <div className="w-full mb-2">
                        <div className="flex mr-auto">
                            <FunnelIcon
                                onClick={() => setShowEmployeesFilters(showEmployeesFilters => !showEmployeesFilters)}
                                className={`w-6 cursor-pointer ${showEmployeesFilters ? 'text-violet-600 hover:text-gray-800' : 'hover:text-violet-600'}`}/>
                            {
                                filterEmployeesBy !== null || dateFilterEmployeesBy !== null ?
                                    <XCircleIcon
                                        className="w-6 text-violet-600 hover:text-gray-800 cursor-pointer"
                                        onClick={cancelFiltering} title="Скинути всі фільтри"/>
                                    : null
                            }

                        </div>
                    </div>
                    {
                        showEmployeesFilters ?
                            <div className="w-full mb-2">
                                <FiltersComponent filters={selectedEmployeesFilters}
                                                  onFilterChange={handleEmployeesFilterChange}/>
                                {
                                    selectedDateEmployeesFilters.length > 0
                                        ?
                                        <DateFiltersComponent filters={selectedDateEmployeesFilters} onFilterChange={handleDateFilterChange}/>
                                        : <></>
                                }
                            </div>
                            : <></>
                    }
                    {employeesList.length === 0 && !employeeSearchBy
                        ? null
                        :
                        <>
                            <div className="w-1/12">
                                <div className="mt-2">
                                    <select
                                        title={"Кількість на одній сторінці"}
                                        id="country"
                                        name="country"
                                        autoComplete="country-name"
                                        value={[10, 15, 20, 50].includes(perPage) ? perPage : 'all'}
                                        onChange={changePerPage}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                                    >
                                        <option value="10">10</option>
                                        <option value="15">15</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="all">Всі</option>
                                    </select>
                                </div>
                            </div>
                            <SearchComponent
                                title={"Шукати за всіма полями"}
                                isInputVisible={employeeSearchBy === 'all'}
                                // @ts-ignore
                                onBeganSearch={() => {
                                    beginSearchBy({employee_search_by: "all"})
                                }}
                                // @ts-ignore
                                onCancelSearch={() => {
                                    beginSearchBy({})
                                }}
                                onChange={searchingByColumn}
                                search_value={searchTerm}
                            />
                        </>
                    }
                </div>
                {employeesList.length === 0 && !employeeSearchBy
                    ?
                    <>
                        <p>Тут поки що немає нічого </p>
                    </>
                    :
                    <>
                        <table className="min-w-full bg-white">
                            <thead>
                            <tr>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>ПІБ</span>
                                        <div className="ml-auto flex">
                                            <SearchComponent
                                                title={"Шукати за ПІБ"}
                                                isInputVisible={employeeSearchBy === 'user_name'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy({employee_search_by: "user_name"})
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy({})
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={searchTerm}
                                            />
                                            {
                                                employeeSortBy === 'last_name' ?
                                                    <>
                                                        <ChevronUpIcon
                                                            onClick={() => sortingBy({employee_sort_by: 'last_name'})}
                                                            title={`Сортувати за ПІБ ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                            className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortingBy({employee_sort_by: 'last_name'})}
                                                        title={"Сортувати за ПІБ"}
                                                        className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Email</span>
                                        <div className="ml-auto flex">
                                            <SearchComponent
                                                title={"Шукати за email"}
                                                isInputVisible={employeeSearchBy === 'email'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy({employee_search_by: "email"})
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy({})
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={searchTerm}
                                            />
                                            {
                                                employeeSortBy === 'email' ?
                                                    <>
                                                        <ChevronUpIcon
                                                            onClick={() => sortingBy({employee_sort_by: 'email'})}
                                                            title={`Сортувати за email ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                            className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortingBy({employee_sort_by: 'email'})}
                                                        title={"Сортувати за email"}
                                                        className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Адреса</span>
                                        <div className="ml-auto flex">
                                            <SearchComponent
                                                title={"Шукати за адресою"}
                                                isInputVisible={employeeSearchBy === 'address'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy({employee_search_by: "address"})
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy({})
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={searchTerm}
                                            />
                                            {
                                                employeeSortBy === 'city' ?
                                                    <>
                                                        <ChevronUpIcon
                                                            onClick={() => sortingBy({employee_sort_by: 'city'})}
                                                            title={`Сортувати за адресою ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                            className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortingBy({employee_sort_by: 'city'})}
                                                        title={"Сортувати за адресою"}
                                                        className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Телефон</span>
                                        <div className="ml-auto flex">
                                            <SearchComponent
                                                title={"Шукати за телефоном"}
                                                isInputVisible={employeeSearchBy === 'phone'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy({employee_search_by: "phone"})
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy({})
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={searchTerm}
                                            />
                                            {
                                                employeeSortBy === 'phone' ?
                                                    <>
                                                        <ChevronUpIcon
                                                            onClick={() => sortingBy({employee_sort_by: 'phone'})}
                                                            title={`Сортувати за телефоном ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                            className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortingBy({employee_sort_by: 'phone'})}
                                                        title={"Сортувати за телефоном"}
                                                        className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Дата народження</span>
                                        <div className="ml-auto flex">
                                            <SearchComponent
                                                title={"Шукати за датою народження"}
                                                isInputVisible={employeeSearchBy === 'birth_date'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy({employee_search_by: "birth_date"})
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy({})
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={searchTerm}
                                            />
                                            {
                                                employeeSortBy === 'birth_date' ?
                                                    <>
                                                        <ChevronUpIcon
                                                            onClick={() => sortingBy({employee_sort_by: 'birth_date'})}
                                                            title={`Сортувати за датою народження ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                            className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortingBy({employee_sort_by: 'birth_date'})}
                                                        title={"Сортувати за датою народження"}
                                                        className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Дата прийому на роботу</span>
                                        <div className="ml-auto flex">
                                            <SearchComponent
                                                title={"Шукати за датою прийому на роботу"}
                                                isInputVisible={employeeSearchBy === 'employment_date'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy({employee_search_by: "employment_date"})
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy({})
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={searchTerm}
                                            />
                                            {
                                                employeeSortBy === 'employment_date' ?
                                                    <>
                                                        <ChevronUpIcon
                                                            onClick={() => sortingBy({employee_sort_by: 'employment_date'})}
                                                            title={`Сортувати за датою прийому на роботу ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                            className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortingBy({employee_sort_by: 'employment_date'})}
                                                        title={"Сортувати за датою прийому на роботу"}
                                                        className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                            </thead>
                            <tbody>

                            {
                                // @ts-ignore
                                employeesList.map((employee) => {
                                        return (
                                            <tr key={employee?.id}
                                                className={`${employee?.founded == true ? 'bg-blue-300 hover:bg-blue-200' : 'hover:bg-gray-100'} `}>
                                                <td className="py-2 px-4 border-b">{employee?.last_name ?? ''} {employee?.first_name ?? ''} {employee?.patronymic_name ?? ''}</td>
                                                <td className="py-2 px-4 border-b">{employee?.email}</td>
                                                <td className="py-2 px-4 border-b">{employee?.city ?? ''} {employee?.street ?? ''} {employee?.house_number ?? ''} {employee?.apartment_number ?? ''}</td>
                                                <td className="py-2 px-4 border-b">{employee?.phone ?? ''}</td>
                                                <td className="py-2 px-4 border-b">{employee?.birthdate ?? ''}</td>
                                                <td className="py-2 px-4 border-b">{employee?.employment_date ?? ''}</td>
                                                <td className="py-2 px-4 border-b">
                                                    {
                                                        tableType === 'active' ?
                                                            <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                                    onClick={async () => {
                                                                        // @ts-ignore
                                                                        await dispatch(axiosGetEmployeeInfo({
                                                                            employeeId: employee?.id,
                                                                            type: 'update'
                                                                        }));
                                                                        dispatch(openCloseModal({open: true}));
                                                                    }}
                                                                    title="Редагувати інформацію про співробітника"
                                                            >
                                                                <PencilSquareIcon className="w-6"/>

                                                            </button> : <></>}
                                                    <button className="text-red-500 hover:text-red-700"
                                                            onClick={() => onDeletingEmployee(employee?.id)}
                                                            title="Видалити інформацію про співробітника"
                                                    >
                                                        <TrashIcon className="w-6"/>
                                                    </button>
                                                    {
                                                        tableType === 'active' || tableType === 'working' ?
                                                            <>
                                                                <button className="text-orange-500 hover:text-red-700"
                                                                        onClick={() => onDeacttivatingEmployee(employee?.id)}
                                                                        title="Деактивувати співробітника"
                                                                >
                                                                    <MinusCircleIcon className="w-6"/>
                                                                </button>
                                                                {
                                                                    employee?.employment_date !== null
                                                                        ?
                                                                        <button
                                                                            className="text-purple-500 hover:text-purple-700"
                                                                            onClick={async () => {
                                                                                // @ts-ignore
                                                                                await dispatch(axiosGetEmployeeInfo({
                                                                                    employeeId: employee?.id,
                                                                                    type: 'fire'
                                                                                }))
                                                                                dispatch(openCloseModal({open: true}))
                                                                            }}
                                                                            title="Звільнити співробітника"
                                                                        ><XMarkIcon className="w-6"/>
                                                                        </button>
                                                                        :
                                                                        <button
                                                                            className="text-purple-500 disabled:text-gray-700"
                                                                            disabled={true}
                                                                            title="Співробітника неможливо звільнити"
                                                                        ><XMarkIcon className="w-6"/>
                                                                        </button>
                                                                }
                                                            </>
                                                            :
                                                            <></>

                                                    }
                                                    {
                                                        tableType === 'not-active' && employee?.date_dismissal === null ?
                                                            <button className="text-green-500 hover:text-green-700"
                                                                    onClick={() => onReacttivatingEmployee(employee?.id)}
                                                                    title="Активувати співробітника"
                                                            >
                                                                <UserPlusIcon className="w-6"/>
                                                            </button>
                                                            :
                                                            <></>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    }
                                )}
                            </tbody>
                        </table>
                    </>
                }
            </div>
        </>
    );
};

export default EmployeesTable;