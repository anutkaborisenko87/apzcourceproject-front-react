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
    async function (childID?: number) {
        return await getSelectList(childID);
    }
);

export const axiosActiveParrents = createAsyncThunk(
    'parrents/axiosActiveParrents',
    async function ({
                        page,
                        per_page,
                        parrent_sort_by,
                        sort_direction,
                        parrent_search_by,
                        filter_parrents_by,
                        search_term
                    }:
                    {
                        page?: number,
                        per_page?: string,
                        parrent_sort_by?: string,
                        sort_direction?: string,
                        parrent_search_by?: string,
                        filter_parrents_by?: {},
                        search_term?: string
                    }) {
        return await getActiveParrentsList({
            page,
            per_page,
            parrent_sort_by,
            sort_direction,
            parrent_search_by,
            filter_parrents_by,
            search_term
        });
    }
);

export const axiosNotActiveParrents = createAsyncThunk(
    'parrents/axiosNotActiveParrents',
    async function ({
                        page,
                        per_page,
                        parrent_sort_by,
                        sort_direction,
                        parrent_search_by,
                        filter_parrents_by,
                        search_term
                    }:
                    {
                        page?: number,
                        per_page?: string,
                        parrent_sort_by?: string,
                        sort_direction?: string,
                        parrent_search_by?: string,
                        filter_parrents_by?: {},
                        search_term?: string
                    }) {
        return await getNotActiveParrentsList({
            page,
            per_page,
            parrent_sort_by,
            sort_direction,
            parrent_search_by,
            filter_parrents_by,
            search_term
        });
    }
);


export const axiosGetParrentInfo = createAsyncThunk(
    'parrents/axiosGetParrentInfo',
    // @ts-ignore
    async function (parrentId?: number, {rejectWithValue, dispatch}) {
        // @ts-ignore
        dispatch(cleanParrentErrors());
        try {
            if (!parrentId) return null;
            dispatch(getParrentToUpdate({id: parrentId}));
            return await getParrentInfo(parrentId);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosDeactivateParrent = createAsyncThunk(
    'parrents/axiosDeactivateParrent',
    async function ({parrentId, tableType}: { parrentId: number, tableType: string }, {
        getState,
        rejectWithValue,
        dispatch
    }) {
        try {
            // @ts-ignore
            const {parrents} = getState();
            const resp = await deactivateParrent(parrentId);
            if (tableType == 'active') {
                dispatch(axiosActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
            } else {
                dispatch(axiosNotActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosReactivateParrent = createAsyncThunk(
    'parrents/axiosReactivateParrent',
    async function ({parrentId, tableType}: { parrentId: number, tableType: string }, {
        getState,
        rejectWithValue,
        dispatch
    }) {
        try {
            // @ts-ignore
            const {parrents} = getState();
            const resp = await reactivateParrent(parrentId);
            if (tableType == 'active') {
                dispatch(axiosActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
            } else {
                dispatch(axiosNotActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosDeleteParrent = createAsyncThunk(
    'parrents/axiosDeleteParrent',
    async function ({parrentId, tableType}: { parrentId: number, tableType: string }, {
        getState,
        rejectWithValue,
        dispatch
    }) {
        try {
            // @ts-ignore
            const {parrents} = getState();
            const resp = await deleteParrentInfo(parrentId);
            if (tableType == 'active') {
                dispatch(axiosActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
            } else {
                dispatch(axiosNotActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosCreateParrentInfo = createAsyncThunk(
    'parrents/axiosCreateParrentInfo',
    async function (parrentFormData: ParrentFormData, {
        getState,
        rejectWithValue,
        dispatch
    }) {
        try {
            // @ts-ignore
            const {parrents} = getState();
            const resp = await createParrentInfo(parrentFormData);
            dispatch(axiosActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
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
    }, {
        getState,
        rejectWithValue,
        dispatch
    }) {
        try {
            // @ts-ignore
            const {parrents} = getState();
            const resp = await updateParrentInfo(parrentId, parrentFormData);
            dispatch(axiosActiveParrents({page: parrents.parrents.current_page, per_page: parrents.parrents.per_page}));
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const setFormErrors = (state: {
    userValidationErrors: {
        first_name: any;
        last_name: any;
        patronymic_name: any;
        email: any;
        role: any;
        city: any;
        street: any;
        house_number: any;
        apartment_number: any;
        birth_date: any;
    };
    parrentValidationErrors: { phone: any; work_place: any; passport_data: any; marital_status: any; children: any; };
    error: any;
    statusForm: string;
}, action: { payload: { response: any; }; }) => {
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
            street: response?.data?.errors['user.street'] ?? [],
            house_number: response?.data?.errors['user.house_number'] ?? [],
            apartment_number: response?.data?.errors['user.apartment_number'] ?? [],
            birth_date: response?.data?.errors['user.birth_date'] ?? []
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
        parrents: {
            data: [],
            links: [],
            to: 0,
            from: 0,
            last_page: 0,
            current_page: 1,
            per_page: 10,
            filter_parrents_by: null,
            filters: [],
            parrent_sort_by: null,
            sort_direction: 'asc',
            parrent_search_by: null,
            search_term: null
        },
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
                state.userValidationErrors = {
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
                };
                state.parrentValidationErrors = {
                    phone: [],
                    work_place: [],
                    passport_data: [],
                    marital_status: [],
                    children: []
                };
                state.error = null
            }
        },
        cleanParrentNotification: (state) => {
            state.notification = {type: '', message: ''}
        },
        setParrentSearchableColumn: (state, action) => {
            // @ts-ignore
            state.parrents.parrent_search_by = action.payload.parrent_search_by;
        },
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
            state.parrentToUpdate = null;
            state.parrent = null;
        });
        // @ts-ignore
        builder.addCase(axiosUpdateParrentInfo.rejected, setFormErrors);

    }
});

export const {
    setParrentSearchableColumn,
    getParrentToUpdate,
    cleanParrentNotification,
    cleanParrentErrors
} = parrentSlice.actions;

export default parrentSlice.reducer;