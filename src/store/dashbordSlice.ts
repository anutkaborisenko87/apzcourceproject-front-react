import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getDashboardInfo} from "../apiServices/dashboardApiServices.ts";

export const axiosDashboardData = createAsyncThunk('dashboard/axiosDashboardData', async function (){
   return await getDashboardInfo();
});

const setFormErrors = (state: {
    validationDAshboardErrors: {
        group_id: any;
        teacher_id: any;
        from: any;
        to: any;
    };
    error: any;
    statusForm: string;
}, action: { payload: { response: any; }; }) => {
    const {response} = action.payload
    // @ts-ignore
    if (response.status === 422) {
        state.validationDAshboardErrors = {
            group_id: response?.data?.errors?.group_id ?? [],
            teacher_id: response?.data?.errors?.teacher_id ?? [],
            from: response?.data?.errors?.from ?? [],
            to: response?.data?.errors?.to ?? [],
        }
    } else {
        state.error = response.data.error;
    }
    // @ts-ignore
    state.statusDashboardForm = 'failed';
}

const dashbordSlice = createSlice({
    name: 'dashboard',
    initialState: {
        groups: [],
        teachers: [],
        childrens: [],
        groupToReport: null,
        childrenGroupToReport: null,
        teacherToReport: null,
        educationPeriod: '',
        status: null,
        error: null,
        validationDAshboardErrors: {
            group_id: [],
            teacher_id: [],
            from: [],
            to: []
        },
        notification: {
            type: '',
            message: ''
        },
        statusDashboardForm: null
    },
    reducers: {
        getGroupForReport: (state, action) => {
            state.groupToReport = action.payload;
        },
        getChildrenGroupForReport: (state, action) => {
            state.childrenGroupToReport = action.payload;
        },
        getTeacherForReport: (state, action) => {
            state.teacherToReport = action.payload;
        },
        cleanDashdoardErrors: (state, action) => {
            if (action.payload?.field) {
                // @ts-ignore
                state.validationDAshboardErrors[action.payload.field] = []
            } else {
                state.error = null
            }
        },
    },
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
export const {
    getGroupForReport,
    getTeacherForReport,
    getChildrenGroupForReport,
    cleanDashdoardErrors
} = dashbordSlice.actions;
export default dashbordSlice.reducer;