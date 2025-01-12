import {
    ChevronUpDownIcon,
    ChevronUpIcon,
    FunnelIcon,
    PencilSquareIcon,
    TrashIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import {useDispatch, useSelector} from "react-redux";
import {openCloseModal} from "../store/modalSlice.ts";
import {
    axiosChildInfo,
    axiosChildrenAllList,
    axiosDeleteChildInfo,
    axiosForEnrolmentChildrenList, axiosGraduatedChildrenList, axiosInTrainingChildrenList, setChildSearchableColumn
} from "../store/childrenListSlice.ts";
import {useState, useCallback, useEffect} from "react";
import * as _ from "lodash";
import FiltersComponent from "./FiltersComponent.tsx";
import SearchComponent from "./SearchComponent.tsx";
import DateFiltersComponent from "./DateFiltersComponent.tsx";

type PropsType = {
    tableType: string;
}
const ChildrenTable = ({
                           tableType,
                       }: PropsType) => {


    const dispatch = useDispatch();
    // @ts-ignore
    const childrenList = useSelector(state => state.childrenList?.childrenList?.data ?? []);
    // @ts-ignore
    const perPage = useSelector(state => state.childrenList?.childrenList?.per_page ?? 10);
    // @ts-ignore
    const filterChildrensBy = useSelector(state => state.childrenList?.childrenList?.filter_childrens_by ?? null);
    // @ts-ignore
    const dateFilterChildrensBy = useSelector(state => state.childrenList?.childrenList?.date_filter_childrens_by ?? null);
    // @ts-ignore
    const currPage = useSelector(state => state.childrenList?.childrenList?.current_page ?? 1);
    // @ts-ignore
    const childSortBy = useSelector(state => state.childrenList?.childrenList?.child_sort_by ?? null);
    // @ts-ignore
    const sortDirection = useSelector(state => state.childrenList?.childrenList?.sort_direction ?? 'asc');
    // @ts-ignore
    const childSearchBy = useSelector(state => state.childrenList?.childrenList?.child_search_by ?? null);
    // @ts-ignore
    const searchTerm = useSelector(state => state.childrenList?.childrenList?.search_term ?? null);
    const [showChildrensFilters, setShowChildrensFilters] = useState((filterChildrensBy !== null && Object.keys(filterChildrensBy).length > 0) || (dateFilterChildrensBy !== null && Object.keys(dateFilterChildrensBy).length > 0));
    // @ts-ignore
    const filters = useSelector(state => state.childrenList?.childrenList?.filters ?? []);
    // @ts-ignore
    const dateFilters = useSelector(state => state.childrenList?.childrenList?.dateFilters ?? []);
    const [selectedChildrensFilters, setSelectedChildrensFilters] = useState(filters);
    const [selectedChildrensDateFilters, setSelectedChildrensDateFilters] = useState(dateFilters);
    // @ts-ignore
    const handleChildrensFilterChange = useCallback(async (sectionId: string, optionValue: string, checked: boolean) => {
        setSelectedChildrensFilters((prevFilters: { id: string; options: { value: string; }[]; }[]) =>
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
        setSelectedChildrensDateFilters((prevFilters: any) => {
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
        if (selectedChildrensFilters) {
            selectedChildrensFilters.forEach((item: {
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
        selectedChildrensDateFilters.forEach((item: any): void => {
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
        if (!_.isEqual(filterChildrensBy, formedFilters)) {
            (async () => {
                await filteringBy(formedFilters);
            })();
        }
    }, [selectedChildrensFilters, filterChildrensBy]);
    useEffect(() => {
        let formedDateFilters = filterByDate();
        if (!_.isEqual(dateFilterChildrensBy, formedDateFilters)) {
            (async () => {
                await filteringByDate(formedDateFilters);
            })();
        }
    }, [selectedChildrensDateFilters, dateFilterChildrensBy]);
    // @ts-ignore
    const filteringBy = useCallback(async (filters: any) => {
        switch (tableType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filters,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filters,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filters,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filters,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filters,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
        }
    }, [selectedChildrensFilters]);
    // @ts-ignore
    const filteringByDate = useCallback(async (dateFilters: any) => {
        switch (tableType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilters,
                    search_term: searchTerm
                }));
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilters,
                    search_term: searchTerm
                }));
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilters,
                    search_term: searchTerm
                }));
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilters,
                    search_term: searchTerm
                }));
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilters,
                    search_term: searchTerm
                }));
        }
    }, [selectedChildrensDateFilters]);
    const cancelFiltering = async () => {
        switch (tableType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    search_term: searchTerm
                }));
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    search_term: searchTerm
                }));
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    search_term: searchTerm
                }));
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    search_term: searchTerm
                }));
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    search_term: searchTerm
                }));
        }
    }
    const onDeletingChild = async (childId: number) => {
        if (confirm("Ви впевнені, що хочете видалити цю дитину?")) {
            // @ts-ignore
            await dispatch(axiosDeleteChildInfo({childId, tableType}));
        }
    }
    const changePerPage = async (e: any) => {
        switch (tableType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: 1,
                    per_page: e.target.value,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList({
                    page: 1,
                    per_page: e.target.value,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList({
                    page: 1,
                    per_page: e.target.value,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList({
                    page: 1,
                    per_page: e.target.value,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: 1,
                    per_page: e.target.value,
                    child_sort_by: childSortBy,
                    sort_direction: sortDirection,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
        }
    }
    const beginSearchBy = async ({child_search_by}: { child_search_by?: string | null }) => {
        if (child_search_by) dispatch(setChildSearchableColumn({child_search_by}));
        if (!child_search_by) {
            switch (tableType) {
                case 'all':
                    // @ts-ignore
                    dispatch(axiosChildrenAllList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy
                    }));
                    break;
                case 'for-enrollment':
                    // @ts-ignore
                    dispatch(axiosForEnrolmentChildrenList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy
                    }));
                    break;
                case 'in-training':
                    // @ts-ignore
                    dispatch(axiosInTrainingChildrenList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy
                    }));
                    break;
                case 'graduated':
                    // @ts-ignore
                    dispatch(axiosGraduatedChildrenList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy
                    }));
                    break;
                default:
                    // @ts-ignore
                    dispatch(axiosChildrenAllList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy
                    }));
            }
        }
    }
    const searchingByColumn = async (event: string) => {
        if (event !== '' && event !== searchTerm) {
            switch (tableType) {
                case 'all':
                    // @ts-ignore
                    dispatch(axiosChildrenAllList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        child_search_by: childSearchBy,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy,
                        search_term: event
                    }));
                    break;
                case 'for-enrollment':
                    // @ts-ignore
                    dispatch(axiosForEnrolmentChildrenList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        child_search_by: childSearchBy,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy,
                        search_term: event
                    }));
                    break;
                case 'in-training':
                    // @ts-ignore
                    dispatch(axiosInTrainingChildrenList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        child_search_by: childSearchBy,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy,
                        search_term: event
                    }));
                    break;
                case 'graduated':
                    // @ts-ignore
                    dispatch(axiosGraduatedChildrenList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        child_search_by: childSearchBy,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy,
                        search_term: event
                    }));
                    break;
                default:
                    // @ts-ignore
                    dispatch(axiosChildrenAllList({
                        page: currPage,
                        per_page: perPage,
                        child_sort_by: childSortBy,
                        sort_direction: sortDirection,
                        child_search_by: childSearchBy,
                        filter_childrens_by: filterChildrensBy,
                        date_filter_childrens_by: dateFilterChildrensBy,
                        search_term: event
                    }));
            }
        } else {
            await beginSearchBy({child_search_by: null});
        }
    }
    const sortingBy = async ({child_sort_by}: { child_sort_by?: string }) => {
        let sortDir = 'desc';
        if (child_sort_by === childSortBy && sortDirection === sortDir) {
            sortDir = 'asc';
        }
        switch (tableType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: child_sort_by ?? childSortBy,
                    sort_direction: sortDir,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: child_sort_by ?? childSortBy,
                    sort_direction: sortDir,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: child_sort_by ?? childSortBy,
                    sort_direction: sortDir,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: child_sort_by ?? childSortBy,
                    sort_direction: sortDir,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_sort_by: child_sort_by ?? childSortBy,
                    sort_direction: sortDir,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
        }
    }
    const cancelSortingBy = async () => {
        switch (tableType) {
            case 'all':
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'for-enrollment':
                // @ts-ignore
                dispatch(axiosForEnrolmentChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'in-training':
                // @ts-ignore
                dispatch(axiosInTrainingChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            case 'graduated':
                // @ts-ignore
                dispatch(axiosGraduatedChildrenList({
                    page: currPage,
                    per_page: perPage,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
                    search_term: searchTerm
                }));
                break;
            default:
                // @ts-ignore
                dispatch(axiosChildrenAllList({
                    page: currPage,
                    per_page: perPage,
                    child_search_by: childSearchBy,
                    filter_childrens_by: filterChildrensBy,
                    date_filter_childrens_by: dateFilterChildrensBy,
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
                                onClick={() => setShowChildrensFilters(showChildrensFilters => !showChildrensFilters)}
                                className={`w-6 cursor-pointer ${showChildrensFilters ? 'text-violet-600 hover:text-gray-800' : 'hover:text-violet-600'}`}/>
                            {
                                filterChildrensBy !== null || dateFilterChildrensBy !== null ?
                                    <XCircleIcon
                                        className="w-6 text-violet-600 hover:text-gray-800 cursor-pointer"
                                        onClick={cancelFiltering} title="Скинути всі фільтри"/>
                                    : null
                            }

                        </div>
                    </div>
                    {
                        showChildrensFilters ?
                            <div className="w-full mb-2">
                                <FiltersComponent filters={selectedChildrensFilters}
                                                  onFilterChange={handleChildrensFilterChange}/>
                                {
                                    selectedChildrensDateFilters.length > 0
                                        ?
                                        <DateFiltersComponent filters={selectedChildrensDateFilters} onFilterChange={handleDateFilterChange}/>
                                        : <></>
                                }
                            </div>
                            : <></>
                    }
                    {childrenList.length === 0 && !childSearchBy
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
                                isInputVisible={childSearchBy === 'all'}
                                // @ts-ignore
                                onBeganSearch={() => {
                                    beginSearchBy({child_search_by: "all"})
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
                {childrenList.length === 0
                    ?
                    <p>Тут поки що немає нічого </p>
                    :

                    <table className="min-w-full bg-white">
                        <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>ПІБ</span>
                                    <div className="ml-auto flex">
                                        <SearchComponent
                                            title={"Шукати за ПІБ"}
                                            isInputVisible={childSearchBy === 'user_name'}
                                            // @ts-ignore
                                            onBeganSearch={() => {
                                                beginSearchBy({child_search_by: "user_name"})
                                            }}
                                            // @ts-ignore
                                            onCancelSearch={() => {
                                                beginSearchBy({})
                                            }}
                                            onChange={searchingByColumn}
                                            search_value={searchTerm}
                                        />
                                        {
                                            childSortBy === 'last_name' ?
                                                <>
                                                    <ChevronUpIcon
                                                        onClick={() => sortingBy({child_sort_by: 'last_name'})}
                                                        title={`Сортувати за ПІБ ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                        className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                    <XCircleIcon
                                                        className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                        onClick={cancelSortingBy} title="Скинути сортування"/>
                                                </>
                                                :
                                                <ChevronUpDownIcon
                                                    onClick={() => sortingBy({child_sort_by: 'last_name'})}
                                                    title={"Сортувати за ПІБ"}
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
                                            isInputVisible={childSearchBy === 'birth_date'}
                                            // @ts-ignore
                                            onBeganSearch={() => {
                                                beginSearchBy({child_search_by: "birth_date"})
                                            }}
                                            // @ts-ignore
                                            onCancelSearch={() => {
                                                beginSearchBy({})
                                            }}
                                            onChange={searchingByColumn}
                                            search_value={searchTerm}
                                        />
                                        {
                                            childSortBy === 'birth_date' ?
                                                <>
                                                    <ChevronUpIcon
                                                        onClick={() => sortingBy({child_sort_by: 'birth_date'})}
                                                        title={`Сортувати за датою народження ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                        className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                    <XCircleIcon
                                                        className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                        onClick={cancelSortingBy} title="Скинути сортування"/>
                                                </>
                                                :
                                                <ChevronUpDownIcon
                                                    onClick={() => sortingBy({child_sort_by: 'birth_date'})}
                                                    title={"Сортувати за датою народження"}
                                                    className={`w-4 h-4 cursor-pointer`}/>
                                        }
                                    </div>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Рік зарахування</span>
                                    <div className="ml-auto flex">
                                        <SearchComponent
                                            title={"Шукати за роком зарахування"}
                                            isInputVisible={childSearchBy === 'enrollment_year'}
                                            // @ts-ignore
                                            onBeganSearch={() => {
                                                beginSearchBy({child_search_by: "enrollment_year"})
                                            }}
                                            // @ts-ignore
                                            onCancelSearch={() => {
                                                beginSearchBy({})
                                            }}
                                            onChange={searchingByColumn}
                                            search_value={searchTerm}
                                        />
                                        {
                                            childSortBy === 'enrollment_date' ?
                                                <>
                                                    <ChevronUpIcon
                                                        onClick={() => sortingBy({child_sort_by: 'enrollment_date'})}
                                                        title={`Сортувати за роком зарахування ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                        className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                    <XCircleIcon
                                                        className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                        onClick={cancelSortingBy} title="Скинути сортування"/>
                                                </>
                                                :
                                                <ChevronUpDownIcon
                                                    onClick={() => sortingBy({child_sort_by: 'enrollment_date'})}
                                                    title={"Сортувати за роком зарахування"}
                                                    className={`w-4 h-4 cursor-pointer`}/>
                                        }
                                    </div>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Рік випуску</span>
                                    <div className="ml-auto flex">
                                        <SearchComponent
                                            title={"Шукати за роком випуску"}
                                            isInputVisible={childSearchBy === 'graduation_year'}
                                            // @ts-ignore
                                            onBeganSearch={() => {
                                                beginSearchBy({child_search_by: "graduation_year"})
                                            }}
                                            // @ts-ignore
                                            onCancelSearch={() => {
                                                beginSearchBy({})
                                            }}
                                            onChange={searchingByColumn}
                                            search_value={searchTerm}
                                        />
                                        {
                                            childSortBy === 'graduation_date' ?
                                                <>
                                                    <ChevronUpIcon
                                                        onClick={() => sortingBy({child_sort_by: 'graduation_date'})}
                                                        title={`Сортувати за роком випуску ${sortDirection === 'desc' ? 'за зростанням' : 'за спаданням'}`}
                                                        className={`w-4 h-4 text-blue-500 hover:text-blue-700 cursor-pointer ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}/>
                                                    <XCircleIcon
                                                        className="w-4 text-blue-500 hover:text-blue-700 cursor-pointer"
                                                        onClick={cancelSortingBy} title="Скинути сортування"/>
                                                </>
                                                :
                                                <ChevronUpDownIcon
                                                    onClick={() => sortingBy({child_sort_by: 'graduation_date'})}
                                                    title={"Сортувати за роком випуску"}
                                                    className={`w-4 h-4 cursor-pointer`}/>
                                        }
                                    </div>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Група</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b">
                                <div className="flex items-center justify-between">
                                    <span>Батьки</span>
                                </div>
                            </th>
                            <th className="py-2 px-4 border-b"></th>
                        </tr>
                        </thead>
                        <tbody>

                        {childrenList.map((child: any) => {
                                return (
                                    <tr key={child?.id}
                                        className={`${child?.founded == true ? 'bg-blue-300 hover:bg-blue-200' : 'hover:bg-gray-100'} `}>
                                        <td className="py-2 px-4 border-b">{child?.last_name ?? ''} {child?.first_name ?? ''} {child?.patronymic_name ?? ''}</td>
                                        <td className="py-2 px-4 border-b">{child?.birthdate}</td>
                                        <td className="py-2 px-4 border-b"><span
                                            title={child?.enrollment_date ?? "Немає інформації про дату вступу"}>{child?.enrollment_year ?? ''}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b"><span
                                            title={child?.graduation_date ?? "Немає інформації про дату випуску"}>{child?.graduation_year ?? ''}</span>
                                        </td>
                                        <td className="py-2 px-4 border-b">{child?.group ? child?.group?.title : ''} </td>
                                        <td className="py-2 px-4 border-b">{child?.parrents && child?.parrents.length > 0 ?
                                            child?.parrents.map((parrent: {
                                                id: number;
                                                parrent_name: string;
                                                relations: string;
                                            }) => {
                                                return (
                                                    <button key={parrent.id}
                                                            className="border border-green-500 text-green-500 hover:border-green-700 hover:text-green-700 mr-2 text-sm">
                                                        {parrent.parrent_name} {`(${parrent.relations})`}
                                                    </button>
                                                )
                                            })
                                            : ''}</td>
                                        <td className="py-2 px-4 border-b">
                                            <button className="text-blue-500 hover:text-blue-700 mr-2"
                                                    onClick={async () => {
                                                        // @ts-ignore
                                                        await dispatch(axiosChildInfo(child?.id));
                                                        dispatch(openCloseModal({open: true}))
                                                    }}
                                            >
                                                <PencilSquareIcon className="w-6"/>

                                            </button>
                                            <button className="text-red-500 hover:text-red-700"
                                                    onClick={() => onDeletingChild(child.id)}
                                            >
                                                <TrashIcon className="w-6"/>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            }
                        )}
                        </tbody>
                    </table>
                }
            </div>
        </>
    );
};
export default ChildrenTable;