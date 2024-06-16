import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

import {getRolesList} from "../apiServices/rolesApiServices.ts";

export const axiosGetRolesList = createAsyncThunk(
    'roles/axiosRolesList',
    async function () {
        return await getRolesList();
    }
);

const rolesSlice = createSlice({
    name: 'roles',
    initialState: {
        roles: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(axiosGetRolesList.pending, (state) => {
            state.error = null;
        });
        builder.addCase(axiosGetRolesList.fulfilled, (state, action) => {
            state.roles = action.payload;
        });
        builder.addCase(axiosGetRolesList.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
        });
    }
});

export const {
} = rolesSlice.actions;

export default rolesSlice.reducer;