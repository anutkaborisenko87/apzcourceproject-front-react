import {createBrowserRouter} from "react-router-dom";
import Login from "./views/Login.tsx";
import NotFound from "./views/NotFound.tsx";
import DefaultLayout from "./components/DefaultLayout.tsx";
import GuestLayout from "./components/GuestLayout.tsx";
import Dashboard from "./views/Dashboard.tsx";
import UserProfile from "./views/UserProfile.tsx";
import UsersView from "./views/UsersView.tsx";
import EmployeesView from "./views/EmployeesView.tsx";
import ParrentsView from "./views/ParrentsView.tsx";
import ChildrenView from "./views/ChildrenView.tsx";
import GroupsView from "./views/GroupsView.tsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaultLayout/>,
        children: [
            {
                path: '',
                element: <Dashboard/>
            },
            {
                path: 'profile',
                element: <UserProfile/>
            },
            {
                path: 'users',
                element: <UsersView/>
            },
            {
                path: 'employees',
                element: <EmployeesView/>
            },
            {
                path: 'parrents',
                element: <ParrentsView/>
            },
            {
                path: 'children',
                element: <ChildrenView/>
            },
            {
                path: 'groups',
                element: <GroupsView/>
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout/>,
        children: [
            {
                path: 'login',
                element: <Login/>
            },
        ]
    },


    {
        path: '*',
        element: <NotFound/>
    },
]);

export default router;
