import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDashboardInfo} from "../apiServices/dashboardApiServices.ts";

export const axiosDashboardData = createAsyncThunk('dashboard/axiosDashboardData', async function (){
   return await getDashboardInfo();
});

const dashbordSlice = createSlice({
    name: 'dashboard',
    initialState: {
        groups: [],
        teachers: [],
        childrens: [],
        educationPeriod: '',
        status: null,
        error: null
    },
    reducers: {},
    extraReducers: builder => {
        builder.addCase(axiosDashboardData.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosDashboardData.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.groups = action.payload.groups ?? [];
            state.teachers = action.payload.teachers ?? [];
            state.childrens = action.payload.childrens ?? [];
            state.educationPeriod = action.payload.educationPeriod ?? '';
        });
        builder.addCase(axiosDashboardData.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.error.message;
        });
    }
});
export const {} = dashbordSlice.actions;
export default dashbordSlice.reducer;