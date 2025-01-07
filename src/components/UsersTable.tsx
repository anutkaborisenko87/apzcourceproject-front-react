import {
    ChevronUpDownIcon, ChevronUpIcon,
    MinusCircleIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon,
    XCircleIcon,
    FunnelIcon
} from "@heroicons/react/24/outline";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosDeactivateUser,
    axiosDeleteUser, axiosReactivateUser,
    axiosGetUserInfo,
    getUserToUpdate, axiosActiveUsers, axiosNotActiveUsers, setSearchableColumn
} from "../store/userSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import SearchComponent from "./SearchComponent.tsx";
import FiltersComponent from "./FiltersComponent.tsx";
import {useCallback, useEffect, useState} from "react";
import * as _ from "lodash";
import DateFiltersComponent from "./DateFiltersComponent.tsx";

type PropsType = {
    tableType: string;
}
const UsersTable = ({tableType}: PropsType) => {
    // @ts-ignore
    const usersList = useSelector(state => state.users?.users?.data ?? []);
    const dispatch = useDispatch();
    // @ts-ignore
    const filterUsersBy = useSelector(state => state.users?.users?.filter_users_by ?? null)
    // @ts-ignore
    const dateFilterUsersBy = useSelector(state => state.users?.users?.date_filter_users_by ?? null)
    // @ts-ignore
    const perPage = useSelector(state => state.users?.users?.per_page ?? 10);
    // @ts-ignore
    const currPage = useSelector(state => state.users?.users?.current_page ?? 1);
    // @ts-ignore
    const sarchBy = useSelector(state => state.users?.users?.user_search_by);
    // @ts-ignore
    const sarchTerm = useSelector(state => state.users?.users?.search_term);
    // @ts-ignore
    const sortBy = useSelector(state => state.users?.users?.user_sort_by);
    // @ts-ignore
    const sortDirection = useSelector(state => state.users?.users?.sort_direction);
    const [showFilters, setShowFilters] = useState((filterUsersBy !== null && Object.keys(filterUsersBy).length > 0) || (dateFilterUsersBy !== null && Object.keys(dateFilterUsersBy).length > 0));
    // @ts-ignore
    const filters = useSelector(state => state.users?.users?.filters);
    // @ts-ignore
    const dateFilters = useSelector(state => state.users?.users?.dateFilters);
    const [selectedFilters, setSelectedFilters] = useState(filters);
    const [selectedDateFilters, setDateSelectedFilters] = useState(dateFilters);
    const handleFilterChange = useCallback(async (sectionId: string, optionValue: string, checked: boolean) => {
        setSelectedFilters((prevFilters: { id: string; options: { value: string; }[]; }[]) =>
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
        setDateSelectedFilters((prevFilters: any) => {
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
        selectedFilters.forEach((item: {
            options: { checked: boolean; value: string; label: string; }[];
            id: string;
            name: string;
        }): void => {
            let selectedOptions: string[] = [];
            item.options.forEach((option: { checked: boolean; value: string; label: string; }): void => {
                if (option.checked) selectedOptions.push(option.value);
            });
            // @ts-ignore
            if (selectedOptions.length > 0) localfilters[item.id] = selectedOptions;
        });
        return Object.keys(localfilters).length > 0 ? localfilters : null;
    };

    const filterByDate = () => {
        let localfilters = {};
        selectedDateFilters.forEach((item: any): void => {
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
        if (!_.isEqual(filterUsersBy, formedFilters)) {
            (async () => {
                await filteringBy(formedFilters);
            })();
        }
    }, [selectedFilters, filterUsersBy]);

    useEffect(() => {
        let formedDateFilters = filterByDate();
        if (!_.isEqual(dateFilterUsersBy, formedDateFilters)) {
            (async () => {
                await filteringByDate(formedDateFilters);
            })();
        }
    }, [selectedDateFilters, dateFilterUsersBy]);
    const ondeletingUser = async (userId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            // @ts-ignore
            await dispatch(axiosDeleteUser({userId, tableType}));
        }
    }
    const onDeacttivatingUser = async (userId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього користувача?")) {
            // @ts-ignore
            await dispatch(axiosDeactivateUser({userId, tableType}));
        }

    }
    const onReacttivatingUser = async (userId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете активувати цього користувача?")) {
            // @ts-ignore
            await dispatch(axiosReactivateUser({userId, tableType}));
        }
    }
    const changePerPage = useCallback(async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newPerPage = e.target.value;
        if (newPerPage !== perPage) {
            if (tableType === 'active') {
                // @ts-ignore
                await dispatch(axiosActiveUsers({
                    page: 1,
                    per_page: newPerPage,
                }));
            } else {
                // @ts-ignore
                await dispatch(axiosNotActiveUsers({
                    page: 1,
                    per_page: newPerPage,
                    // Остальные параметры остаются неизменными
                }));
            }
        }
    }, [dispatch, perPage, tableType]);

    const sortingBy = async (columnName: string) => {
        let sortDir = 'desc';
        if (columnName === sortBy && sortDirection === sortDir) {
            sortDir = 'asc'
        }
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: columnName,
                sort_direction: sortDir,
                search_by: sarchBy,
                search_term: sarchTerm,
                filter_users_by: filterUsersBy,
                date_filter_users_by: dateFilterUsersBy
            }))
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: columnName,
                sort_direction: sortDir,
                search_by: sarchBy,
                search_term: sarchTerm,
                filter_users_by: filterUsersBy,
                date_filter_users_by: dateFilterUsersBy
            }))
        }
    }
    const cancelSortingBy = async () => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: 'user_id',
                sort_direction: 'asc',
                search_by: sarchBy,
                search_term: sarchTerm,
                filter_users_by: filterUsersBy,
                date_filter_users_by: dateFilterUsersBy
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: 'user_id',
                sort_direction: 'asc',
                search_by: sarchBy,
                search_term: sarchTerm,
                filter_users_by: filterUsersBy,
                date_filter_users_by: dateFilterUsersBy
            }));
        }
    }
    const cancelFiltering = async () => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm
            }));
        }
    }

    const searchingByColumn = (event: string) => {
        if (event !== '' && event !== sarchTerm) {
            if (tableType === 'active') {
                // @ts-ignore
                dispatch(axiosActiveUsers({
                    page: currPage,
                    per_page: perPage,
                    sort_by: sortBy,
                    sort_direction: sortDirection,
                    search_by: sarchBy,
                    search_term: event,
                    filter_users_by: filterUsersBy,
                    date_filter_users_by: dateFilterUsersBy
                }));
            } else {
                // @ts-ignore
                dispatch(axiosNotActiveUsers({
                    page: currPage,
                    per_page: perPage,
                    sort_by: sortBy,
                    sort_direction: sortDirection,
                    search_by: sarchBy,
                    search_term: event,
                    filter_users_by: filterUsersBy,
                    date_filter_users_by: dateFilterUsersBy
                }));
            }
        } else {
            beginSearchBy();
        }
    }
    // @ts-ignore
    const filteringBy = useCallback(async (filters: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            dispatch(axiosActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm,
                // @ts-ignore
                filter_users_by: filters,
                // @ts-ignore
                date_filter_users_by: dateFilterUsersBy,
            }));
        } else {
            // @ts-ignore
            dispatch(axiosNotActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm,
                // @ts-ignore
                filter_users_by: filters,
                // @ts-ignore
                date_filter_users_by: dateFilterUsersBy,
            }));
        }
    }, [selectedFilters])
    // @ts-ignore
    const filteringByDate = useCallback(async (datefilters: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            dispatch(axiosActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm,
                // @ts-ignore
                filter_users_by: filterUsersBy,
                // @ts-ignore
                date_filter_users_by: datefilters,
            }));
        } else {
            // @ts-ignore
            dispatch(axiosNotActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm,
                // @ts-ignore
                filter_users_by: filterUsersBy,
                // @ts-ignore
                date_filter_users_by: datefilters,
            }));
        }
    }, [selectedDateFilters])

    const beginSearchBy = (columnName?: string) => {
        dispatch(setSearchableColumn({columnName: columnName}));
        if (!columnName) {
            if (tableType === 'active') {
                // @ts-ignore
                dispatch(axiosActiveUsers({
                    page: currPage,
                    per_page: perPage,
                    sort_by: sortBy,
                    sort_direction: sortDirection,
                    filter_users_by: filterUsersBy,
                    date_filter_users_by: dateFilterUsersBy
                }));
            } else {
                // @ts-ignore
                dispatch(axiosNotActiveUsers({
                    page: currPage,
                    per_page: perPage,
                    sort_by: sortBy,
                    sort_direction: sortDirection,
                    filter_users_by: filterUsersBy,
                    date_filter_users_by: dateFilterUsersBy
                }));
            }
        }
    }

    return (
        <>
            <div className="overflow-x-auto">
                <div className="flex items-center justify-between flex-wrap">
                    <div className="w-full mb-2">
                        <div className="-flex mr-auto">
                            <FunnelIcon onClick={() => setShowFilters(showFilters => !showFilters)}
                                        className={`w-6 cursor-pointer ${showFilters ? 'text-violet-600 hover:text-gray-800' : 'hover:text-violet-600'}`}/>
                            {
                                filterUsersBy !== null || dateFilterUsersBy !== null ?
                                    <XCircleIcon
                                        className="w-6 text-violet-600 hover:text-gray-800 cursor-pointer"
                                        onClick={cancelFiltering} title="Скинути всі фільтри"/>
                                    : null
                            }

                        </div>
                    </div>
                    {
                        showFilters ?
                            <div className="w-full mb-2">
                                <FiltersComponent filters={selectedFilters}
                                                  onFilterChange={handleFilterChange}/>
                                {
                                    selectedDateFilters.length > 0
                                        ?
                                    <DateFiltersComponent filters={selectedDateFilters} onFilterChange={handleDateFilterChange}/>
                                        : <></>
                                }
                            </div>
                            : <></>
                    }
                    {usersList.length === 0 && !sarchBy
                        ?
                        null
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
                                isInputVisible={sarchBy === 'all'}
                                // @ts-ignore
                                onBeganSearch={() => {
                                    beginSearchBy("all");
                                }}
                                // @ts-ignore
                                onCancelSearch={() => {
                                    beginSearchBy();
                                }}
                                onChange={searchingByColumn}
                                search_value={sarchTerm}/>
                        </>
                    }
                </div>
                {usersList.length === 0 && !sarchBy
                    ?
                    <p>Тут поки що немає нічого </p>
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
                                                isInputVisible={sarchBy === 'user_name'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy("user_name")
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy()
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={sarchTerm}
                                            />
                                            {
                                                sortBy === 'last_name' ?
                                                    <>
                                                        <ChevronUpIcon onClick={() => sortingBy('last_name')}
                                                                       title={`Сортувати за ПІБ ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                                       className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon onClick={() => sortingBy('last_name')}
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
                                                isInputVisible={sarchBy === 'email'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy("email")
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy()
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={sarchTerm}
                                            />
                                            {
                                                sortBy === 'email' ?
                                                    <>
                                                        <ChevronUpIcon onClick={() => sortingBy('email')}
                                                                       title={`Сортувати за email ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                                       className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon onClick={() => sortingBy('email')}
                                                                       title={"Сортувати за email"}
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
                                                isInputVisible={sarchBy === 'birth_date'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy("birth_date")
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy()
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={sarchTerm}
                                            />
                                            {
                                                sortBy === 'birth_date' ?
                                                    <>
                                                        <ChevronUpIcon onClick={() => sortingBy('birth_date')}
                                                                       title={`Сортувати за датою народження ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                                       className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon onClick={() => sortingBy('birth_date')}
                                                                       title={"Сортувати за датою народження"}
                                                                       className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Категорія</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                            </thead>
                            <tbody>

                            {usersList.map((user: {
                                    birthdate: string;
                                    user_id: number;
                                    last_name: string | null;
                                    first_name: string | null;
                                    patronymic_name: string | null;
                                    email: string;
                                    city: string | null;
                                    founded?: boolean;
                                    street: string | null;
                                    house_number: string | null;
                                    apartment_number: string | null;
                                    user_category: string;
                                }) => {
                                    return (
                                        <tr key={user?.user_id}
                                            className={`${user?.founded == true ? 'bg-blue-300 hover:bg-blue-200' : 'hover:bg-gray-100'} `}>
                                            <td className="py-2 px-4 border-b">{user?.last_name ?? ''} {user?.first_name ?? ''} {user?.patronymic_name ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{user?.email}</td>
                                            <td className="py-2 px-4 border-b">{user?.birthdate ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{user?.user_category === "employee" ? <Link
                                                to="/employees">співробітники</Link> : (user?.user_category === "parent" ?
                                                <Link
                                                    to="/parrents">батьки</Link> : (user?.user_category === "children" ?
                                                    <Link
                                                        to="/children">діти</Link> : "адмін. персонал"))}</td>
                                            <td className="py-2 px-4 border-b">

                                                {tableType === 'active' && !["employee", "parent", "children"].includes(user?.user_category) ?
                                                    <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                            onClick={async () => {
                                                                // @ts-ignore
                                                                await dispatch(axiosGetUserInfo(user?.user_id));
                                                                dispatch(getUserToUpdate({id: user?.user_id}));
                                                                dispatch(openCloseModal({open: true}));
                                                            }}
                                                    >
                                                        <PencilSquareIcon className="w-6"/>

                                                    </button> : <></>}
                                                {!["employee", "parent", "children"].includes(user?.user_category) ?
                                                    <button className="text-red-500 hover:text-red-700"
                                                            onClick={() => ondeletingUser(user?.user_id)}
                                                    >
                                                        <TrashIcon className="w-6"/>
                                                    </button> : <></>}
                                                {!["employee", "parent", "children"].includes(user?.user_category) ?
                                                    (tableType === 'active' ?
                                                            <button className="text-orange-500 hover:text-red-700"
                                                                    onClick={() => onDeacttivatingUser(user?.user_id)}
                                                            >
                                                                <MinusCircleIcon className="w-6"/>
                                                            </button>
                                                            :
                                                            <button className="text-green-500 hover:text-green-700"
                                                                    onClick={() => onReacttivatingUser(user?.user_id)}
                                                            >
                                                                <UserPlusIcon className="w-6"/>
                                                            </button>
                                                    )
                                                    : <></>}
                                            </td>
                                        </tr>
                                    );
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

export default UsersTable;