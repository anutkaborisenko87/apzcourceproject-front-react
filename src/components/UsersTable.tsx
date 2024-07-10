import {
    ChevronUpDownIcon, ChevronUpIcon,
    MinusCircleIcon,
    PencilSquareIcon,
    TrashIcon,
    UserPlusIcon,
    XCircleIcon
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

type PropsType = {
    tableType: string;
}
const UsersTable = ({tableType}: PropsType) => {
    // @ts-ignore
    const usersList = useSelector(state => state.users?.users?.data ?? []);
    const dispatch = useDispatch();
    // @ts-ignore
    const perPage = useSelector(state => state.users?.users?.per_page ?? 10);
    // @ts-ignore
    const currPage = useSelector(state => state.users?.users?.current_page ?? 1);
    // @ts-ignore
    const sarchBy = useSelector(state => state.users?.users?.search_by);
    // @ts-ignore
    const sarchTerm = useSelector(state => state.users?.users?.search_term);
    const ondeletingUser = async (userId: React.Key | null | undefined) => {
        if (confirm("Ви впевнені, що хочете видалити цього користувача?")) {
            // @ts-ignore
            await dispatch(axiosDeleteUser({userId, tableType}));
        }
    }
    // @ts-ignore
    const sortBy = useSelector(state => state.users?.users?.sort_by);
    // @ts-ignore
    const sortDirection = useSelector(state => state.users?.users?.sort_direction);
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
    const changePerPage = async (e: any) => {
        if (tableType === 'active') {
            // @ts-ignore
            await dispatch(axiosActiveUsers({
                page: 1,
                per_page: e.target.value,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveUsers({
                page: 1,
                per_page: e.target.value,
                sort_by: sortBy,
                sort_direction: sortDirection,
                search_by: sarchBy,
                search_term: sarchTerm
            }));
        }

    }

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
                search_term: sarchTerm
            }))
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: columnName,
                sort_direction: sortDir,
                search_by: sarchBy,
                search_term: sarchTerm
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
                search_term: sarchTerm
            }));
        } else {
            // @ts-ignore
            await dispatch(axiosNotActiveUsers({
                page: currPage,
                per_page: perPage,
                sort_by: 'user_id',
                sort_direction: 'asc',
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
                    search_term: event
                }));
            } else {
                // @ts-ignore
                dispatch(axiosNotActiveUsers({
                    page: currPage,
                    per_page: perPage,
                    sort_by: sortBy,
                    sort_direction: sortDirection,
                    search_by: sarchBy,
                    search_term: event
                }));
            }
        } else {
            beginSearchBy();
        }
    }
    const beginSearchBy = (columnName?: string) => {
        dispatch(setSearchableColumn({columnName: columnName}));
        if (!columnName) {
            if (tableType === 'active') {
                // @ts-ignore
                dispatch(axiosActiveUsers({
                    page: currPage,
                    per_page: perPage,
                    sort_by: sortBy,
                    sort_direction: sortDirection
                }));
            } else {
                // @ts-ignore
                dispatch(axiosNotActiveUsers({
                    page: currPage,
                    per_page: perPage,
                    sort_by: sortBy,
                    sort_direction: sortDirection
                }));
            }
        }
    }
    return (
        <>
            <div className="overflow-x-auto">
                {usersList.length === 0 && !sarchBy
                    ?
                    <p>Тут поки що немає нічого </p>
                    :
                    <>
                        <div className="flex items-center justify-between">
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
                                    beginSearchBy("all")
                                }}
                                // @ts-ignore
                                onCancelSearch={() => {
                                    beginSearchBy()
                                }}
                                onChange={searchingByColumn}
                                search_value={sarchTerm}
                            />
                        </div>
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
                                    street: string | null;
                                    house_number: string | null;
                                    apartment_number: string | null;
                                    user_category: string;
                                }) => {
                                    return (
                                        <tr key={user?.user_id} className="hover:bg-gray-100">
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