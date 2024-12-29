import {
    ChevronUpDownIcon,
    ChevronUpIcon,
    FunnelIcon,
    MinusCircleIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {
    axiosActiveParrents,
    axiosDeactivateParrent,
    axiosDeleteParrent,
    axiosGetParrentInfo, axiosNotActiveParrents,
    axiosReactivateParrent, setParrentSearchableColumn,
} from "../store/parrentsSlice.ts";
import {openCloseModal} from "../store/modalSlice.ts";
import {useCallback, useEffect, useState} from "react";
import FiltersComponent from "./FiltersComponent.tsx";
import SearchComponent from "./SearchComponent.tsx";
import * as _ from "lodash";

type PropsType = {
    tableType: string;
}
const ParrentsTable = ({
                           tableType
                       }: PropsType) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const parrentsList = useSelector(state => state.parrents?.parrents?.data ?? []);
    // @ts-ignore
    const perPage = useSelector(state => state.parrents?.parrents?.per_page ?? 10);
    // @ts-ignore
    const filterParrentsBy = useSelector(state => state.parrents?.parrents?.filter_parrents_by ?? null);
    // @ts-ignore
    const currPage = useSelector(state => state.parrents?.parrents?.current_page ?? 1);
    // @ts-ignore
    const parrentSortBy = useSelector(state => state.parrents?.parrents?.parrent_sort_by ?? null);
    // @ts-ignore
    const sortDirection = useSelector(state => state.parrents?.parrents?.sort_direction ?? 'asc');
    // @ts-ignore
    const parrentSearchBy = useSelector(state => state.parrents?.parrents?.parrent_search_by ?? null);
    // @ts-ignore
    const searchTerm = useSelector(state => state.parrents?.parrents?.search_term ?? null);
    const [showParrentsFilters, setShowParrentsFilters] = useState(filterParrentsBy !== null && Object.keys(filterParrentsBy).length > 0);
    // @ts-ignore
    const filters = useSelector(state => state.parrents?.parrents?.filters ?? []);
    const [selectedParrentsFilters, setSelectedParrentsFilters] = useState(filters);
    // @ts-ignore
    const handleParrentsFilterChange = useCallback(async (sectionId: string, optionValue: string, checked: boolean) => {
        setSelectedParrentsFilters((prevFilters: { id: string; options: { value: string; }[]; }[]) =>
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
    const filterBy = () => {
        let localfilters = {};
        if (selectedParrentsFilters) {
            selectedParrentsFilters.forEach((item: {
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
        }
        return Object.keys(localfilters).length > 0 ? localfilters : null;
    };
    useEffect(() => {
        let formedFilters = filterBy();
        if (!_.isEqual(filterParrentsBy, formedFilters)) {
            (async () => {
                await filteringBy(formedFilters);
            })();
        }
    }, [selectedParrentsFilters, filterParrentsBy]);
    // @ts-ignore
    const filteringBy = useCallback(async (filters: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            dispatch(axiosActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_sort_by: parrentSortBy,
                sort_direction: sortDirection,
                parrent_search_by: parrentSearchBy,
                // @ts-ignore
                filter_parrents_by: filters,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            dispatch(axiosNotActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_sort_by: parrentSortBy,
                sort_direction: sortDirection,
                parrent_search_by: parrentSearchBy,
                // @ts-ignore
                filter_parrents_by: filters,
                search_term: searchTerm
            }));
        }
    }, [selectedParrentsFilters]);
    const cancelFiltering = async () => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_sort_by: parrentSortBy,
                sort_direction: sortDirection,
                parrent_search_by: parrentSearchBy,
                // @ts-ignore
                filter_parrents_by: filters,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_sort_by: parrentSortBy,
                sort_direction: sortDirection,
                parrent_search_by: parrentSearchBy,
                // @ts-ignore
                filter_parrents_by: filters,
                search_term: searchTerm
            }));
        }
    }
    const onDeletingParrent = async (parrentId: number) => {
        if (confirm("Ви впевнені, що хочете видалити цього батька?")) {
            // @ts-ignore
            await dispatch(axiosDeleteParrent({parrentId, tableType}));
        }
    }
    const onDeacttivatingParrent = async (parrentId: number) => {
        if (confirm("Ви впевнені, що хочете деактивувати цього батька?")) {
            // @ts-ignore
            await dispatch(axiosDeactivateParrent({parrentId, tableType}));
        }

    }
    const onReacttivatingParrent = async (parrentId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете активувати цього батька?")) {
            // @ts-ignore
            await dispatch(axiosReactivateParrent({parrentId, tableType}));
        }
    }
    const changePerPage = async (e: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveParrents({
                page: currPage,
                per_page: e.target.value,
                parrent_sort_by: parrentSortBy,
                sort_direction: sortDirection,
                parrent_search_by: parrentSearchBy,
                // @ts-ignore
                filter_parrents_by: filters,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveParrents({
                page: currPage,
                per_page: e.target.value,
                parrent_sort_by: parrentSortBy,
                sort_direction: sortDirection,
                parrent_search_by: parrentSearchBy,
                filter_parrents_by: filters,
                search_term: searchTerm
            }));
        }

    }
    const beginSearchBy = async ({parrent_search_by}: {
        parrent_search_by?: string | null
    }) => {
        if (parrent_search_by) dispatch(setParrentSearchableColumn({parrent_search_by}));
        if (!parrent_search_by) {
            if (tableType === 'active') {
                // @ts-ignore
                await dispatch(axiosActiveParrents({
                    page: currPage,
                    per_page: perPage,
                    parrent_sort_by: parrentSortBy,
                    sort_direction: sortDirection,
                }));
            } else {
                // @ts-ignore
                await dispatch(axiosNotActiveParrents({
                    page: currPage,
                    per_page: perPage,
                    parrent_sort_by: parrentSortBy,
                    sort_direction: sortDirection,
                }));
            }
        }
    }

    const searchingByColumn = async (event: string) => {
        if (event !== '' && event !== searchTerm) {
            if (tableType === 'active') {
                // @ts-ignore
                await dispatch(axiosActiveParrents({
                    page: currPage,
                    per_page: perPage,
                    parrent_sort_by: parrentSortBy,
                    sort_direction: sortDirection,
                    parrent_search_by: parrentSearchBy,
                    filter_parrents_by: filters,
                    search_term: event
                }));
            } else {
                // @ts-ignore
                await dispatch(axiosNotActiveParrents({
                    page: currPage,
                    per_page: perPage,
                    parrent_sort_by: parrentSortBy,
                    sort_direction: sortDirection,
                    parrent_search_by: parrentSearchBy,
                    filter_parrents_by: filters,
                    search_term: event
                }));
            }
        } else {
            beginSearchBy({parrent_search_by: null});
        }
    }
    const sortingBy = async ({parrent_sort_by}: {
        parrent_sort_by?: string
    }) => {
        let sortDir = 'desc';
        if ((parrent_sort_by === parrentSortBy) && sortDirection === sortDir) {
            sortDir = 'asc'
        }
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_search_by: parrentSearchBy,
                search_term: searchTerm,
                parrent_sort_by: parrent_sort_by ?? parrentSearchBy,
                sort_direction: sortDir
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_search_by: parrentSearchBy,
                search_term: searchTerm,
                parrent_sort_by: parrent_sort_by ?? parrentSearchBy,
                sort_direction: sortDir
            }));
        }
    }
    const cancelSortingBy = async () => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_search_by: parrentSearchBy,
                search_term: searchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveParrents({
                page: currPage,
                per_page: perPage,
                parrent_search_by: parrentSearchBy,
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
                                onClick={() => setShowParrentsFilters(showParrentsFilters => !showParrentsFilters)}
                                className={`w-6 cursor-pointer ${showParrentsFilters ? 'text-violet-600 hover:text-gray-800' : 'hover:text-violet-600'}`}/>
                            {
                                filterParrentsBy !== null ?
                                    <XCircleIcon
                                        className="w-6 text-violet-600 hover:text-gray-800 cursor-pointer"
                                        onClick={cancelFiltering} title="Скинути всі фільтри"/>
                                    : null
                            }

                        </div>
                    </div>
                    {
                        showParrentsFilters ?
                            <div className="w-full mb-2">
                                <FiltersComponent filters={selectedParrentsFilters}
                                                  onFilterChange={handleParrentsFilterChange}/>
                            </div>
                            : <></>
                    }
                    {parrentsList.length === 0 && !parrentSearchBy
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
                                isInputVisible={parrentSearchBy === 'all'}
                                // @ts-ignore
                                onBeganSearch={() => {
                                    beginSearchBy({parrent_search_by: "all"})
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
                {parrentsList.length === 0 && !parrentSearchBy
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
                                                isInputVisible={parrentSearchBy === 'user_name'}
                                                // @ts-ignore
                                                onBeganSearch={() => {
                                                    beginSearchBy({parrent_search_by: "user_name"})
                                                }}
                                                // @ts-ignore
                                                onCancelSearch={() => {
                                                    beginSearchBy({})
                                                }}
                                                onChange={searchingByColumn}
                                                search_value={searchTerm}
                                            />
                                            {
                                                parrentSortBy === 'last_name' ?
                                                    <>
                                                        <ChevronUpIcon
                                                            onClick={() => sortingBy({parrent_sort_by: 'last_name'})}
                                                            title={`Сортувати за ПІБ ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                            className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                        <XCircleIcon
                                                            className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                            onClick={cancelSortingBy} title="Скинути сортування"/>
                                                    </>
                                                    :
                                                    <ChevronUpDownIcon
                                                        onClick={() => sortingBy({parrent_sort_by: 'last_name'})}
                                                        title={"Сортувати за ПІБ"}
                                                        className={`w-4 h-4 cursor-pointer`}/>
                                            }
                                        </div>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Email</span>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 9l5-5 5 5H5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Адреса</span>
                                        <button className="text-gray-500 hover:text-gray-700">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 9l5-5 5 5H5z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Телефон</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Місце роботи</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Соціальний статус</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b">
                                    <div className="flex items-center justify-between">
                                        <span>Діти</span>
                                    </div>
                                </th>
                                <th className="py-2 px-4 border-b"></th>
                            </tr>
                            </thead>
                            <tbody>

                            {parrentsList.map((parrent: any) => {
                                    return (
                                        <tr key={parrent?.id} className={`${parrent?.founded == true ? 'bg-blue-300 hover:bg-blue-200' : 'hover:bg-gray-100'} `}>
                                            <td className="py-2 px-4 border-b">{parrent?.last_name ?? ''} {parrent?.first_name ?? ''} {parrent?.patronymic_name ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{parrent?.email}</td>
                                            <td className="py-2 px-4 border-b">{parrent?.city ?? ''} {parrent?.street ?? ''} {parrent?.house_number ?? ''} {parrent?.apartment_number ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{parrent?.phone ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{parrent?.work_place ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{parrent?.marital_status ?? ''}</td>
                                            <td className="py-2 px-4 border-b">{parrent?.children && parrent?.children.length > 0 ?
                                                parrent?.children.map((child: {
                                                    id: number;
                                                    child_name: string;
                                                    relations: any;
                                                }) => {
                                                    return (
                                                        <button key={child.id}
                                                                className="border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                                                            {child.child_name} {`(${child.relations})`}
                                                        </button>
                                                    )
                                                })
                                                : ''}</td>
                                            <td className="py-2 px-4 border-b">
                                                {
                                                    tableType === 'active' ?
                                                        <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                                onClick={async () => {
                                                                    // @ts-ignore
                                                                    await dispatch(axiosGetParrentInfo(parrent?.id));
                                                                    dispatch(openCloseModal({open: true}))
                                                                }}
                                                        >
                                                            <PencilSquareIcon className="w-6"/>

                                                        </button> : <></>}
                                                <button className="text-red-500 hover:text-red-700"
                                                        onClick={() => onDeletingParrent(parrent?.id)}
                                                >
                                                    <TrashIcon className="w-6"/>
                                                </button>
                                                {
                                                    tableType === 'active' ?
                                                        <button className="text-orange-500 hover:text-red-700"
                                                                onClick={() => onDeacttivatingParrent(parrent?.id)}
                                                        >
                                                            <MinusCircleIcon className="w-6"/>
                                                        </button>
                                                        :
                                                        <button className="text-green-500 hover:text-green-700"
                                                                onClick={() => onReacttivatingParrent(parrent?.id)}
                                                        >
                                                            <UserPlusIcon className="w-6"/>
                                                        </button>
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

export default ParrentsTable;