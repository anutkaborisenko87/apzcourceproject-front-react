import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {
    createChildInfo, deleteChildInfo,
    getAllChildrenList,
    getChildInfo, getChildrenListForGroupSelect,
    getChildrenListForSelect,
    getForEnrolmentChildrenList,
    getGraduatedChildrenList,
    getInTrainingChildrenList,
    updateChildInfo
} from "../apiServices/childrenApiService.ts";
import {ChildFormData} from "../apiServices/apiServicesTypes.ts";
import {openCloseModal} from "./modalSlice.ts";

export const axiosChildrenSelectList = createAsyncThunk(
    'children/axiosChildrenSelectList',
    async function (parentId?: number) {
        return await getChildrenListForSelect(parentId);
    }
);

export const axiosChildrenListForGroupSelect = createAsyncThunk(
    'children/axiosChildrenListForGroupSelect',
    async function () {
        return await getChildrenListForGroupSelect();
    }
);
export const axiosChildrenAllList = createAsyncThunk(
    'children/axiosChildrenAllList',
    async function (page?: number) {
        return await getAllChildrenList(page);
    }
);
export const axiosForEnrolmentChildrenList = createAsyncThunk(
    'children/axiosForEnrolmentChildrenList',
    async function (page?: number) {
        return await getForEnrolmentChildrenList(page);
    }
);
export const axiosInTrainingChildrenList = createAsyncThunk(
    'children/axiosInTrainingChildrenList',
    async function (page?: number) {
        return await getInTrainingChildrenList(page);
    }
);
export const axiosGraduatedChildrenList = createAsyncThunk(
    'children/axiosGraduatedChildrenList',
    async function (page?: number) {
        return await getGraduatedChildrenList(page);
    }
);
export const axiosChildInfo = createAsyncThunk(
    'children/axiosChildInfo',
    // @ts-ignore
    async function (childId?: number, {rejectWithValue, dispatch}) {
         try {
             if (!childId) return null;
             dispatch(getChildToUpdate({id: childId}));
             // @ts-ignore
             dispatch(cleanChildErrors());
             return await getChildInfo(childId);
         } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosCreateChildInfo = createAsyncThunk(
    'children/axiosCreateChildInfo',
    // @ts-ignore
    async function ({payload, tableType}: {payload: ChildFormData, tableType: string},  {rejectWithValue, dispatch}) {
        try {
            const resp = await createChildInfo(payload);
            switch (tableType) {
                case 'all':
                    dispatch(axiosChildrenAllList());
                    break;
                case 'for-enrollment':
                    dispatch(axiosForEnrolmentChildrenList());
                    break;
                case 'in-training':
                    dispatch(axiosInTrainingChildrenList());
                    break;
                case 'graduated':
                    dispatch(axiosGraduatedChildrenList());
                    break;
                default: dispatch(axiosChildrenAllList());
            }
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosUpdateChildInfo = createAsyncThunk(
    'children/axiosUpdateChildInfo',
    // @ts-ignore
    async function ({childId, payload, tableType}: {childId: number, payload: ChildFormData, tableType: string},  {rejectWithValue, dispatch}) {
        try {
            const resp = await updateChildInfo(childId, payload);
            switch (tableType) {
                case 'all':
                    dispatch(axiosChildrenAllList());
                    break;
                case 'for-enrollment':
                    dispatch(axiosForEnrolmentChildrenList());
                    break;
                case 'in-training':
                    dispatch(axiosInTrainingChildrenList());
                    break;
                case 'graduated':
                    dispatch(axiosGraduatedChildrenList());
                    break;
                default: dispatch(axiosChildrenAllList());
            }
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosDeleteChildInfo = createAsyncThunk(
    'children/axiosDeleteChildInfo',
    // @ts-ignore
    async function ({childId, page, tableType}: {childId: number, page: number, tableType: string},  {rejectWithValue, dispatch}) {
        try {
            const resp = await deleteChildInfo(childId);
            switch (tableType) {
                case 'all':
                    dispatch(axiosChildrenAllList(page));
                    break;
                case 'for-enrollment':
                    dispatch(axiosForEnrolmentChildrenList(page));
                    break;
                case 'in-training':
                    dispatch(axiosInTrainingChildrenList(page));
                    break;
                case 'graduated':
                    dispatch(axiosGraduatedChildrenList(page));
                    break;
                default: dispatch(axiosChildrenAllList(page));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const setChildFormErrors = (state: { userValidationErrors: { first_name: any; last_name: any; patronymic_name: any; email: any; role: any; city: any; street: any; house_number: any; apartment_number: any; birth_date: any; }; parrentValidationErrors: { group_id: any; mental_helth: any; birth_certificate: any; medical_card_number: any; social_status: any; enrollment_date: any; graduation_date: any; parrents: any; }; error: any; statusForm: string; }, action: { payload: { response: any; }; }) => {
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
            group_id: response?.data?.errors['child.group_id'] ?? [],
            mental_helth: response?.data?.errors['child.mental_helth'] ?? [],
            birth_certificate: response?.data?.errors['child.birth_certificate'] ?? [],
            medical_card_number: response?.data?.errors['child.medical_card_number'] ?? [],
            social_status: response?.data?.errors['child.social_status'] ?? [],
            enrollment_date: response?.data?.errors['child.enrollment_date'] ?? [],
            graduation_date: response?.data?.errors['child.graduation_date'] ?? [],
            parrents: response?.data?.errors['child.parrents'] ?? [],
        }
    } else {
        state.error = response.data.error;
    }

    // @ts-ignore
    state.statusForm = 'failed';
}

const childrenListSlice = createSlice({
    name: 'childrenList',
    initialState: {
        childrenforSelect: [],
        childrenList: [],
        childToUpdate: null,
        child: null,
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
        childValidationErrors: {
            group_id: [],
            mental_helth: [],
            birth_certificate: [],
            medical_card_number: [],
            social_status: [],
            enrollment_date: [],
            graduation_date: [],
            parrents: []
        },
        notification: {
            type: '',
            message: ''
        }
    },
    reducers: {
        cleanChildrenNotification : (state) => {
            state.notification.type = '';
            state.notification.message = '';
        },
        getChildToUpdate: (state, action) => {
            state.childToUpdate = action.payload;
        },
        cleanChildErrors: (state, action) => {
            if (action.payload?.field) {
                // @ts-ignore
                if (state.userValidationErrors[action.payload.field]) state.userValidationErrors[action.payload.field] = [];
                // @ts-ignore
                if (state.childValidationErrors[action.payload.field]) state.childValidationErrors[action.payload.field] = [];
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
                }
                state.childValidationErrors = {
                    group_id: [],
                    mental_helth: [],
                    birth_certificate: [],
                    medical_card_number: [],
                    social_status: [],
                    enrollment_date: [],
                    graduation_date: [],
                    parrents: []
                }
                state.error = null
            }
        },
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
        builder.addCase(axiosChildrenListForGroupSelect.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosChildrenListForGroupSelect.fulfilled, (state, action) => {
            state.childrenforSelect = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosChildrenListForGroupSelect.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosChildrenAllList.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosChildrenAllList.fulfilled, (state, action) => {
            state.childrenList = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosChildrenAllList.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosForEnrolmentChildrenList.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosForEnrolmentChildrenList.fulfilled, (state, action) => {
            state.childrenList = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosForEnrolmentChildrenList.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosInTrainingChildrenList.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosInTrainingChildrenList.fulfilled, (state, action) => {
            state.childrenList = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosInTrainingChildrenList.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosGraduatedChildrenList.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosGraduatedChildrenList.fulfilled, (state, action) => {
            state.childrenList = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosGraduatedChildrenList.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosChildInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosChildInfo.fulfilled, (state, action) => {
            state.child = action.payload;
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosChildInfo.rejected, (state, action) => {
            // @ts-ignore
            state.statusForm = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosCreateChildInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosCreateChildInfo.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про дитину ${userName} додано!`};
        });
        // @ts-ignore
        builder.addCase(axiosCreateChildInfo.rejected, setChildFormErrors);
        builder.addCase(axiosUpdateChildInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosUpdateChildInfo.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            state.childToUpdate = null;
            state.child = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про дитину ${userName} оновлено!`};
        });
        // @ts-ignore
        builder.addCase(axiosUpdateChildInfo.rejected, setChildFormErrors);
        builder.addCase(axiosDeleteChildInfo.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosDeleteChildInfo.fulfilled, (state, action) => {
            state.child = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosDeleteChildInfo.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
    }
});

export const {
    cleanChildrenNotification,
    getChildToUpdate,
    cleanChildErrors
} = childrenListSlice.actions;

export default childrenListSlice.reducer;