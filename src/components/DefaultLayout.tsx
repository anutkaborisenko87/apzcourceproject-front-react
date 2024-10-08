import {NavLink, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../../contexts/ContextProvider.tsx";
import {useEffect} from "react";
import NotificationComponent from "./NotificationComponent.tsx";
import {
    UserGroupIcon,
    UserCircleIcon,
    ArrowUturnRightIcon,
    WalletIcon,
    UsersIcon, BriefcaseIcon,
    AcademicCapIcon
} from '@heroicons/react/24/outline';
import {getLoggedUserInfo, logoutUser} from "../apiServices/authApiServices.ts";

const DefaultLayout = () => {
    // @ts-ignore
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }
    // @ts-ignore
    const {user, token, notification, setToken, setUser} = useStateContext();
    if (!token) {
        return <Navigate to="/login"/>
    }
    const logout = async () => {
        try {
            await logoutUser();
            // @ts-ignore
            setToken(null);
            // @ts-ignore
            setUser(null);
        } catch (error) {
            // @ts-ignore
            console.log(error.response);
        }
    }
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        getLoggedUserInfo().then((data) => {
            setUser(data?.user);
        }).catch((error) => {
            // @ts-ignore
            setToken(null);
            // @ts-ignore
            setUser(null);
            console.error(error)
        })
    }, []);
    return (
        <div className="relative overflow-y-visible">
            <div className="min-h-screen flex bg-gray-100">
                {/* Sidebar */}
                <div
                    className="bg-gray-900 text-white w-64 space-y-6 py-2 px-2 absolute left-0 top-0 bottom-0 flex flex-col justify-between">
                    <div>
                        <NavLink to="/" className="text-white flex items-center space-x-2 px-4 mb-4">
                            <svg className="w-8 h-8" fill="white">
                                <path id="logo" fillRule="evenodd" d="..."/>
                            </svg>
                            <span
                                className="text-lg text-center font-extrabold">ІС "Центр дошкільного розвитку"</span>
                        </NavLink>
                        <nav>
                            <NavLink to="/users"
                                     className={({isActive}) => classNames(`flex py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`)}>
                                <UserGroupIcon className="w-6 mr-2"/>
                                Користувачі
                            </NavLink>
                            <NavLink to="/employees"
                                     className={({isActive}) => classNames(`flex py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`)}>
                                <WalletIcon className="w-6 mr-2"/>
                                Співробітники
                            </NavLink>
                            <NavLink to="/parrents"
                                     className={({isActive}) => classNames(`flex py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`)}>
                                <UsersIcon className="w-6 mr-2"/>
                                Батьки
                            </NavLink>
                            <NavLink to="/children"
                                     className={({isActive}) => classNames(`flex py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`)}>
                                <AcademicCapIcon className="w-6 mr-2"/>
                                Діти
                            </NavLink>
                            <NavLink to="/groups"
                                     className={({isActive}) => classNames(`flex py-2.5 px-4 rounded transition duration-200 ${isActive ? 'bg-gray-700 text-white' : 'hover:bg-gray-700 hover:text-white'}`)}>
                                <BriefcaseIcon className="w-6 mr-2"/>
                                Групи
                            </NavLink>
                        </nav>
                    </div>
                    <NavLink to="#" onClick={logout}
                             className="flex py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white items-center space-x-2">
                        <ArrowUturnRightIcon className="w-6 mr-2"/>

                        Вийти
                    </NavLink>
                </div>
                <div className="flex-shrink-0 w-64"></div>
                <div className="flex-1 flex flex-col">
                    <header className="flex justify-between items-center p-6">
                        <div className="items-center text-gray-500">
                            <span className="text-xl font-semibold"></span>
                        </div>
                        <NavLink to="/profile" className="flex items-center text-gray-500">
                            <UserCircleIcon className="w-6 mr-2"/>
                            <span className="text-xl font-semibold">{user?.name}</span>
                        </NavLink>
                    </header>
                    <main className="flex-1 overflow-x-hidden overflow-y-visible bg-gray-200">
                        {
                            notification.message !== ''
                                ?
                                <NotificationComponent type={notification.type}
                                                       message={notification.message}/> : <></>
                        }

                        <div className="container mx-auto px-6 py-8 overflow-y-visible">
                            <Outlet/>
                        </div>
                    </main>
                </div>
            </div>
            <footer className="bg-zinc-50 text-center dark:bg-neutral-700 lg:text-left">
                <div className="bg-black/5 p-4 text-center text-surface dark:text-white">
                    © 2024 Автор -
                    <a href="https://github.com/anutkaborisenko87" target="_blank"> Анна Борисенко</a>
                </div>
            </footer>
        </div>

    )
        ;
};

export default DefaultLayout;
