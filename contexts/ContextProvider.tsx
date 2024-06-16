import {createContext, ReactNode, useContext, useState} from "react";
import {useDispatch} from "react-redux";
import {cleanEmployeeNotification} from "../src/store/employeesSlice.ts";
import {cleanChildrenNotification} from "../src/store/childrenListSlice.ts";
import {cleanParrentNotification} from "../src/store/parrentsSlice.ts";
import {cleanUserNotification} from "../src/store/userSlice.ts";
type UserType = {
    id: number;
    name: string;
    email: string;
    role: string;
}
type StateContextType = {
    currentUser: UserType | null,
    token: string | null,
    notification: {type: string, message: string},
    setUser: (value: UserType) => void,
    setToken: (value: string) => void
}
const StateContext = createContext<StateContextType>({
    currentUser: null,
    token: null,
    notification: {type: '', message: ''},
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});


export const ContextProvider = ({children}: { children: ReactNode }) => {
    const dispatch = useDispatch();
    const [user, setUser] = useState<UserType | null>(null);
    const [notification, _setNotification] = useState({type: '', message: ''})
    const [token, _setToken] = useState(localStorage.getItem('react_front_access_token'));
    const setToken = (token: string) => {
        _setToken(token);
        if (token) {
            localStorage.setItem('react_front_access_token', token);
        } else {
            localStorage.removeItem('react_front_access_token');
        }

    }
    const setNotification = ({type, message}: {type: string, message: string}) => {
        _setNotification({type, message});
        setTimeout(() => {
            _setNotification({type: '', message: ''});
            dispatch(cleanEmployeeNotification());
            dispatch(cleanChildrenNotification());
            dispatch(cleanParrentNotification());
            dispatch(cleanUserNotification());

        }, 5000)
    }
    return (
        <StateContext.Provider value={{
            user,
            token,
            notification,
            setUser,
            setToken,
            setNotification

        }}>
            {children}
        </StateContext.Provider>
    )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStateContext = () => useContext(StateContext);
