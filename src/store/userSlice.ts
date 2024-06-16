import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    createNewUser,
    deactivateUser,
    deleteUser,
    getNotActiveUsersList,
    getUserInfo,
    getUsersList,
    reactivateUser,
    updateUserInfo
} from "../apiServices/usersApiServices.ts";
import {UserFormData} from "../apiServices/apiServicesTypes.ts";
import {openCloseModal} from "./modalSlice.ts";
export const axiosActiveUsers = createAsyncThunk(
    'users/axiosActiveUsers',
    async function (page?: number) {
        return await getUsersList(page);
    }
);
export const axiosNotActiveUsers = createAsyncThunk(
    'users/axiosNotActiveUsers',
    async function (page?: number) {
        return await getNotActiveUsersList(page);
    }
);
export const axiosDeactivateUser = createAsyncThunk(
    'users/axiosDeactivateUser',
    async function ({userId, page, tableType}: { userId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await deactivateUser(userId);
            if (tableType == 'active') {
                dispatch(axiosActiveUsers(page))
            } else {
                dispatch(axiosNotActiveUsers(page))
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }

    }
);

export const axiosDeleteUser = createAsyncThunk(
    'users/axiosDeleteUser',
    async function ({userId, page, tableType}: { userId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await deleteUser(userId);
            if (tableType == 'active') {
                dispatch(axiosActiveUsers(page))
            } else {
                dispatch(axiosNotActiveUsers(page))
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }

    }
);
export const axiosReactivateUser = createAsyncThunk(
    'users/axiosReactivateUser',
    async function ({userId, page, tableType}: { userId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await reactivateUser(userId);
            if (tableType == 'active') {
                dispatch(axiosActiveUsers(page))
            } else {
                dispatch(axiosNotActiveUsers(page))
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);
export const axiosCreateNewUser = createAsyncThunk(
    'users/axiosCreateNewUser',
    async function (userFormData: UserFormData, {rejectWithValue, dispatch}) {
        try {
            const resp = await createNewUser(userFormData);
            dispatch(axiosActiveUsers())
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error)
        }

    }
);

export const axiosUpdateUserInfo = createAsyncThunk(
    'users/axiosUpdateUserInfo',
    async function ({userId, userFormData}: {userId: number, userFormData: UserFormData}, {rejectWithValue, dispatch}) {
          try {
            const resp = await updateUserInfo(userId, userFormData);
            dispatch(openCloseModal({open: false}))
            dispatch(axiosActiveUsers())
            return resp;
        } catch (error) {
            return rejectWithValue(error)
        }
    }
);
export const axiosGetUserInfo = createAsyncThunk(
    'users/axiosGetUserInfo',
    async function (userId?: number) {
        if (!userId) return null;
        return await getUserInfo(userId);
    }
);

const setFormErrors = (state: { validationErrors: { first_name: any; last_name: any; patronymic_name: any; email: any; role: any; city: any; street: any; house_number: any; apartment_number: any; birth_date: any; }; error: any; statusForm: string; }, action: { payload: { response: any; }; }) => {
    const {response} = action.payload
    // @ts-ignore
    if (response.status === 422) {
        state.validationErrors = {
            first_name: response?.data?.errors?.first_name ?? [],
            last_name: response?.data?.errors?.last_name ?? [],
            patronymic_name: response?.data?.errors?.patronymic_name ?? [],
            email: response?.data?.errors?.email ?? [],
            role: response?.data?.errors?.role ?? [],
            city: response?.data?.errors?.city ?? [],
            street: response?.data?.errors?.street ??  [],
            house_number: response?.data?.errors?.house_number ?? [],
            apartment_number:  response?.data?.errors?.apartment_number ?? [],
            birth_date:  response?.data?.errors?.birth_date ?? []
        }
    } else {
        state.error = response.data.error;
    }

    // @ts-ignore
    state.statusForm = 'failed';
}

const userSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        userToUpdate: null,
        user: null,
        status: null,
        statusForm: null,
        error: null,
        validationErrors: {
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
        notification: {
            type: '',
            message: ''
        }
    },
    reducers: {
        getUserToUpdate: (state, action) => {
            state.userToUpdate = action.payload;
        },
        cleanErrors: (state, action) => {
            if (action.payload?.field) {
                // @ts-ignore
                state.validationErrors[action.payload.field] = []
            } else {
              state.error = null
            }

        },
        cleanUserNotification: (state) => {
            state.notification = {type: '', message: ''}
        }
    },
    extraReducers: builder => {
        builder.addCase(axiosActiveUsers.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosActiveUsers.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.users = action.payload;
        });
        builder.addCase(axiosActiveUsers.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
        });
        builder.addCase(axiosNotActiveUsers.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosNotActiveUsers.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.users = action.payload;
        });
        builder.addCase(axiosNotActiveUsers.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
        });
        builder.addCase(axiosGetUserInfo.pending, (state) => {
            state.error = null;
            // @ts-ignore
            state.statusForm = 'loading';
        });
        builder.addCase(axiosGetUserInfo.fulfilled, (state, action) => {
            state.user = action.payload;
            // @ts-ignore
            state.statusForm = 'resolved';
        });
        builder.addCase(axiosGetUserInfo.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
            // @ts-ignore
            state.statusForm = 'failed';
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosCreateNewUser.pending, (state) => {
            state.error = null;
            // @ts-ignore
            state.statusForm = 'loading';
        });
        builder.addCase(axiosCreateNewUser.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            let category = action?.payload.user_category === "employee" ? "співробітники" : (action?.payload.user_category === "parent" ? "батьки" : (action?.payload.user_category === "children" ? "діти" : "адмін. персонал"));
            state.notification = {type: "success", message: `Користувача ${userName} додано до категорії ${category}!`};
        });
        // @ts-ignore
        builder.addCase(axiosCreateNewUser.rejected, setFormErrors);
        builder.addCase(axiosUpdateUserInfo.pending, (state) => {
            state.error = null;
            // @ts-ignore
            state.statusForm = 'loading';
        });
        builder.addCase(axiosUpdateUserInfo.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про користувача ${userName} оновлено успішно!`};
        });
        // @ts-ignore
        builder.addCase(axiosUpdateUserInfo.rejected, setFormErrors);
        builder.addCase(axiosDeactivateUser.pending, (state) => {
            state.error = null;
            // @ts-ignore
            state.status = 'loading';

        });
        builder.addCase(axiosDeactivateUser.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Користувача ${userName} деактивовано!`};
        });
        builder.addCase(axiosDeactivateUser.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
            // @ts-ignore
            state.status = 'failed';
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosDeleteUser.pending, (state) => {
            state.error = null;
            // @ts-ignore
            state.status = 'loading';

        });
        builder.addCase(axiosDeleteUser.fulfilled, (state, action) => {
            state.user = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            let userName = `${action.payload.user.last_name} ${action.payload.user.first_name}  ${action.payload.user.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про користувача ${userName} видалено!`};
        });
        builder.addCase(axiosDeleteUser.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
            // @ts-ignore
            state.status = 'failed';
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosReactivateUser.pending, (state) => {
            state.error = null;
            // @ts-ignore
            state.status = 'loading';
        });
        builder.addCase(axiosReactivateUser.fulfilled, (state, action) => {
            state.user = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Користувача ${userName} активовано!`};
        });
        builder.addCase(axiosReactivateUser.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
            // @ts-ignore
            state.status = 'failed';
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
    }
});

export const {
    getUserToUpdate,
    cleanUserNotification,
    cleanErrors
} = userSlice.actions;

export default userSlice.reducer;