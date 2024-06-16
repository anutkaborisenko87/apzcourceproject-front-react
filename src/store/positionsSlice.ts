import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getPositionsList} from "../apiServices/positionsApiServices.ts";

export const axiosGetPositionsList = createAsyncThunk(
    'positions/axiosGetPositionsList',
    async function () {
        return await getPositionsList();
    }
);

const positionsSlice = createSlice({
    name: 'positions',
    initialState: {
        positions: [],
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(axiosGetPositionsList.pending, (state) => {
            state.error = null;
        });
        builder.addCase(axiosGetPositionsList.fulfilled, (state, action) => {
            state.error = null;
            state.positions = action.payload;
        });
        builder.addCase(axiosGetPositionsList.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message;
        });
    }
});

export const {
} = positionsSlice.actions;

export default positionsSlice.reducer;