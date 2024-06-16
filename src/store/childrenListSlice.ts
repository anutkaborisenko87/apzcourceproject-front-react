import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getChildrenListForSelect} from "../apiServices/childrenApiService.ts";


export const axiosChildrenSelectList = createAsyncThunk(
    'children/axiosChildrenSelectList',
    async function (parentId?: number) {
        return await getChildrenListForSelect(parentId);
    }
);


const childrenListSlice = createSlice({
    name: 'childrenList',
    initialState: {
        childrenforSelect: [],
        status: null,
        statusForm: null,
        error: null,
        notification: {
            type: '',
            message: ''
        }
    },
    reducers: {
        cleanChildrenNotification : (state) => {
            state.notification.type = '';
            state.notification.message = '';
        }
    },
    extraReducers: builder => {
        builder.addCase(axiosChildrenSelectList.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosChildrenSelectList.fulfilled, (state, action) => {
            state.childrenforSelect = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosChildrenSelectList.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });

    }
});

export const {
    cleanChildrenNotification
} = childrenListSlice.actions;

export default childrenListSlice.reducer;