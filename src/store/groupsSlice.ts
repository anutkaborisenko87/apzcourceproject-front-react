import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    addGroupInfo, deleteGroupInfo,
    getFullGroupInfo,
    getGroupsList,
    getGroupsListForSelect,
    getShortGroupInfo, updateGroupInfo
} from "../apiServices/groupsApiServices.ts";
import {GroupFormData, GroupInfoPayload} from "../apiServices/apiServicesTypes.ts";
import {openCloseModal} from "./modalSlice.ts";
export const axiosGetGroupsSelect = createAsyncThunk(
    'groups/axiosGetGroupsSelect',
    async function () {
        return await getGroupsListForSelect();
    }
);
export const axiosGetGroupsList = createAsyncThunk(
    'groups/axiosGetGroupsList',
    async function () {
        return await getGroupsList();
    }
);
export const axiosGetGroupInfo = createAsyncThunk(
    'groups/axiosGetGroupInfo',
    async function ({groupId, payload}: {groupId?: number, payload?: GroupInfoPayload}, {rejectWithValue, dispatch}) {
        // @ts-ignore
        dispatch(cleanGroupErrors());
        if (!groupId) {
            dispatch(getGroupToUpdate(null));
            return null;
        }
        try {
            dispatch(getGroupToUpdate({id: groupId}));
            if (payload) {
                return await getFullGroupInfo(groupId, payload);
            }
            return await getShortGroupInfo(groupId);
        } catch (error) {
            return rejectWithValue(error);
        }

    }
);
export const axiosCreateGroupInfo = createAsyncThunk(
    'groups/axiosCreateGroupInfo',
    async function (payload: GroupFormData, {rejectWithValue, dispatch}) {

        try {
            const resp = await addGroupInfo(payload);
            dispatch(axiosGetGroupsList());
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }

    }
);
export const axiosUpdateGroupInfo = createAsyncThunk(
    'groups/axiosUpdateGroupInfo',
    async function ({groupId, payload}: {groupId: number, payload: GroupFormData}, {rejectWithValue, dispatch}) {

        try {
            const resp = await updateGroupInfo(groupId, payload);
            dispatch(axiosGetGroupsList());
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const axiosDeleteGroupInfo = createAsyncThunk(
    'groups/axiosDeleteGroupInfo',
    async function (groupId: number, {rejectWithValue, dispatch}) {

        try {
            const resp = await deleteGroupInfo(groupId);
            dispatch(axiosGetGroupsList());
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const setFormErrors = (state: { groupValidationErrors: { title: any; children: any; teachers: any; educationalPrograms: any; }; error: any; statusForm: string; }, action: { payload: { response: any; }; }) => {
    const {response} = action.payload
    // @ts-ignore
    if (response.status === 422) {
        state.groupValidationErrors = {
            title: response?.data?.errors.title ?? [],
            children: response?.data?.errors.children ?? [],
            teachers: response?.data?.errors.teachers ?? [],
            educationalPrograms: response?.data?.errors.educationalPrograms ?? [],
        }
    } else {
        state.groupValidationErrors = {
            title: [],
            children: [],
            teachers: [],
            educationalPrograms: []
        };
        state.error = response.data.error;
    }
    // @ts-ignore
    state.statusForm = 'failed';
}

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groups: [],
        groupsList: [],
        groupValidationErrors: {
            title: [],
            children: [],
            teachers: [],
            educationalPrograms: []
        },
        groupToUpdate: null,
        group: null,
        statusForm: null,
        error: null,
        notification: {
            type: '',
            message: ''
        }
    },
    reducers: {
        getGroupToUpdate: (state, action) => {
            state.groupToUpdate = action.payload;
        },
        cleanGroupErrors: (state, action) => {
            if (action.payload?.field) {
                // @ts-ignore
                if (state.groupValidationErrors[action.payload.field]) state.groupValidationErrors[action.payload.field] = [];

            } else {
                state.groupValidationErrors = {
                    title: [],
                    children: [],
                    teachers: [],
                    educationalPrograms: []
                };
                state.error = null
            }
        },
        cleanGroupNotification: (state) => {
            state.notification = {type: '', message: ''}
        }

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
        builder.addCase(axiosGetGroupsList.pending, (state) => {
            state.error = null;
        });
        builder.addCase(axiosGetGroupsList.fulfilled, (state, action) => {
            state.groupsList = action.payload;
        });
        builder.addCase(axiosGetGroupsList.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
        });
        builder.addCase(axiosGetGroupInfo.pending, (state) => {
            state.error = null;
        });
        builder.addCase(axiosGetGroupInfo.fulfilled, (state, action) => {
            state.groupToUpdate = action.payload;
        });
        builder.addCase(axiosGetGroupInfo.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
        });
        builder.addCase(axiosCreateGroupInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosCreateGroupInfo.fulfilled, (state, action) => {
            state.groupToUpdate = action.payload;
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            state.group = null;
            state.groupToUpdate = null;
            let group = `${action.payload.title}`;
            state.notification = {type: "success", message: `Інформацію про групу ${group} додано!`};
        })
        // @ts-ignore
        builder.addCase(axiosCreateGroupInfo.rejected, setFormErrors);
        builder.addCase(axiosUpdateGroupInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosUpdateGroupInfo.fulfilled, (state, action) => {
            state.groupToUpdate = action.payload;
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            state.group = null;
            state.groupToUpdate = null;
            let group = `${action.payload.title}`;
            state.notification = {type: "success", message: `Інформацію про групу ${group} оновлено!`};
        })
        // @ts-ignore
        builder.addCase(axiosUpdateGroupInfo.rejected, setFormErrors);

        builder.addCase(axiosDeleteGroupInfo.pending, (state) => {
            state.error = null;
        });
        builder.addCase(axiosDeleteGroupInfo.fulfilled, (state, action) => {
            state.error = null;
            state.group = null;
            state.groupToUpdate = null;
            let group = `${action.payload.title}`;
            state.notification = {type: "success", message: `Інформацію про групу ${group} видалено!`};
        });
        builder.addCase(axiosDeleteGroupInfo.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
            state.notification = {type: "success", message: `Щось пішло не так!`};
        });
    }
});

export const {
    getGroupToUpdate,
    cleanGroupErrors,
    cleanGroupNotification,
} = groupsSlice.actions;

export default groupsSlice.reducer;