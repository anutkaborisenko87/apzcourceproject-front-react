import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    deactivateParrent,
    getActiveParrentsList,
    getNotActiveParrentsList,
    getParrentInfo,
    getSelectList,
    reactivateParrent,
    createParrentInfo,
    updateParrentInfo,
    deleteParrentInfo
} from "../apiServices/parrentApiService.ts";
import {ParrentFormData} from "../apiServices/apiServicesTypes.ts";
import {openCloseModal} from "./modalSlice.ts";

export const axiosParrentsSelect = createAsyncThunk(
    'parrents/axiosParrentsSelect',
    async function () {
        return await getSelectList();
    }
);

export const axiosActiveParrents = createAsyncThunk(
    'parrents/axiosActiveParrents',
    async function (page?: number) {
        return await getActiveParrentsList(page);
    }
);

export const axiosNotActiveParrents = createAsyncThunk(
    'parrents/axiosNotActiveParrents',
    async function (page?: number) {
        return await getNotActiveParrentsList(page);
    }
);

export const axiosGetParrentInfo = createAsyncThunk(
    'parrents/axiosGetParrentInfo',
    async function (parrentId?: number, {rejectWithValue}) {
        try {
            if (!parrentId) return null;
            return await getParrentInfo(parrentId);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosDeactivateParrent = createAsyncThunk(
    'parrents/axiosDeactivateParrent',
    async function ({parrentId, page, tableType}: { parrentId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await deactivateParrent(parrentId);
            if (tableType == 'active') {
                dispatch(axiosActiveParrents(page));
            } else {
                dispatch(axiosNotActiveParrents(page));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosReactivateParrent = createAsyncThunk(
    'parrents/axiosReactivateParrent',
    async function ({parrentId, page, tableType}: { parrentId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await reactivateParrent(parrentId);
            if (tableType == 'active') {
                dispatch(axiosActiveParrents(page));
            } else {
                dispatch(axiosNotActiveParrents(page));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosDeleteParrent = createAsyncThunk(
    'parrents/axiosDeleteParrent',
    async function ({parrentId, page, tableType}: { parrentId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await deleteParrentInfo(parrentId);
            if (tableType == 'active') {
                dispatch(axiosActiveParrents(page));
            } else {
                dispatch(axiosNotActiveParrents(page));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosCreateParrentInfo = createAsyncThunk(
    'parrents/axiosCreateParrentInfo',
    async function (parrentFormData: ParrentFormData, {rejectWithValue, dispatch}) {
        try {
            const resp = await createParrentInfo(parrentFormData);
            dispatch(axiosActiveParrents());
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosUpdateParrentInfo = createAsyncThunk(
    'parrents/axiosUpdateParrentInfo',
    async function ({parrentId, parrentFormData}: {
        parrentId: number,
        parrentFormData: ParrentFormData
    }, {rejectWithValue, dispatch}) {
        try {
            const resp = await updateParrentInfo(parrentId, parrentFormData);
            dispatch(axiosActiveParrents());
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const setFormErrors = (state: { userValidationErrors: { first_name: any; last_name: any; patronymic_name: any; email: any; role: any; city: any; street: any; house_number: any; apartment_number: any; birth_date: any; }; parrentValidationErrors: { phone: any; work_place: any; passport_data: any; marital_status: any; children: any; }; error: any; statusForm: string; }, action: { payload: { response: any; }; }) => {
    const {response} = action.payload
    // @ts-ignore
    if (response.status === 422) {
        state.userValidationErrors = {
            first_name: response?.data?.errors['user.first_name'] ?? [],
            last_name: response?.data?.errors['user.last_name'] ?? [],
            patronymic_name: response?.data?.errors['user.patronymic_name'] ?? [],
            email: response?.data?.errors['user.email'] ?? [],
            role: response?.data?.errors['user.role'] ?? [],
            city: response?.data?.errors['user.city'] ?? [],
            street: response?.data?.errors['user.street'] ??  [],
            house_number: response?.data?.errors['user.house_number'] ?? [],
            apartment_number:  response?.data?.errors['user.apartment_number'] ?? [],
            birth_date:  response?.data?.errors['user.birth_date'] ?? []
        }
        state.parrentValidationErrors = {
            phone: response?.data?.errors['parrent.phone'] ?? [],
            work_place: response?.data?.errors['parrent.work_place'] ?? [],
            passport_data: response?.data?.errors['parrent.passport_data'] ?? [],
            marital_status: response?.data?.errors['parrent.marital_status'] ?? [],
            children: response?.data?.errors['parrent.children'] ?? [],
        }
    } else {
        state.error = response.data.error;
    }

    // @ts-ignore
    state.statusForm = 'failed';
}

const parrentSlice = createSlice({
    name: 'parrents',
    initialState: {
        parrents: [],
        parrentsforSelect: [],
        parrentToUpdate: null,
        parrent: null,
        status: null,
        statusForm: null,
        error: null,
        userValidationErrors: {
            first_name: [],
            last_name: [],
            patronymic_name: [],
            email: [],
            role: [],
            city: [],
            street: [],
            house_number: [],
            apartment_number: [],
            birth_date: []
        },
        parrentValidationErrors: {
            phone: [],
            work_place: [],
            passport_data: [],
            marital_status: [],
            children: []
        },
        notification: {
            type: '',
            message: ''
        }
    },
    reducers: {
        getParrentToUpdate: (state, action) => {
            state.parrentToUpdate = action.payload;
        },
        cleanParrentErrors: (state, action) => {
            if (action.payload?.field) {
                // @ts-ignore
                if (state.userValidationErrors[action.payload.field]) state.userValidationErrors[action.payload.field] = [];
                // @ts-ignore
                if (state.parrentValidationErrors[action.payload.field]) state.parrentValidationErrors[action.payload.field] = [];
            } else {
                state.error = null
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(axiosParrentsSelect.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosParrentsSelect.fulfilled, (state, action) => {
            state.parrentsforSelect = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosParrentsSelect.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosActiveParrents.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosActiveParrents.fulfilled, (state, action) => {
            state.parrents = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosActiveParrents.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosNotActiveParrents.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosNotActiveParrents.fulfilled, (state, action) => {
            state.parrents = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosNotActiveParrents.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosGetParrentInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosGetParrentInfo.fulfilled, (state, action) => {
            state.parrent = action.payload;
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosGetParrentInfo.rejected, (state, action) => {
            // @ts-ignore
            state.statusForm = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosDeactivateParrent.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosDeactivateParrent.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Батька ${userName} деактивовано!`};
        });
        builder.addCase(axiosDeactivateParrent.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosReactivateParrent.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosReactivateParrent.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Батька ${userName} активовано!`};
        });
        builder.addCase(axiosReactivateParrent.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosDeleteParrent.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosDeleteParrent.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
            let userName = `${action.payload.parrent.last_name} ${action.payload.parrent.first_name}  ${action.payload.parrent.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про батька ${userName} видалено!`};
        });
        builder.addCase(axiosDeleteParrent.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosCreateParrentInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosCreateParrentInfo.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про батька ${userName} додано!`};
        });
        // @ts-ignore
        builder.addCase(axiosCreateParrentInfo.rejected, setFormErrors);
        builder.addCase(axiosUpdateParrentInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosUpdateParrentInfo.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про батька ${userName} оновлено!`};
        });
        // @ts-ignore
        builder.addCase(axiosUpdateParrentInfo.rejected, setFormErrors);

    }
});

export const {
    getParrentToUpdate,
    cleanParrentErrors
} = parrentSlice.actions;

export default parrentSlice.reducer;