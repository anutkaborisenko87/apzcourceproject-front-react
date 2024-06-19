import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";
import rolesReducer from "./rolesSlice.ts";
import modalReducer from "./modalSlice.ts";
import parrentReducer from "./parrentsSlice.ts";
import employeesReducer from "./employeesSlice.ts";
import childrenListReducer from "./childrenListSlice.ts";
import positionsReducer from "./positionsSlice.ts";
import profileReducer from "./profileSlice.ts";
import groupsReducer from "./groupsSlice.ts";
export default configureStore({
    reducer: {
        users: userReducer,
        roles: rolesReducer,
        modal: modalReducer,
        parrents: parrentReducer,
        childrenList: childrenListReducer,
        employees: employeesReducer,
        positions: positionsReducer,
        profile: profileReducer,
        groups: groupsReducer,
    }
})