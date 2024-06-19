import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getGroupsList} from "../apiServices/groupsApiServices.ts";
export const axiosGetGroupsSelect = createAsyncThunk(
    'groups/axiosGetGroupsSelect',
    async function () {
        return await getGroupsList();
    }
);

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(axiosGetGroupsSelect.pending, (state) => {
            state.error = null;
        });
        builder.addCase(axiosGetGroupsSelect.fulfilled, (state, action) => {
            state.groups = action.payload;
        });
        builder.addCase(axiosGetGroupsSelect.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
        });
    }
});

export const {
} = groupsSlice.actions;

export default groupsSlice.reducer;