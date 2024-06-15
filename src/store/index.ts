import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./userSlice.ts";
import rolesReducer from "./rolesSlice.ts";
import modalReducer from "./modalSlice.ts";
import parrentReducer from "./parrentsSlice.ts";
export default configureStore({
    reducer: {
        users: userReducer,
        roles: rolesReducer,
        modal: modalReducer,
        parrents: parrentReducer
    }
})