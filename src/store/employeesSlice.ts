import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {EmployeeFormData} from "../apiServices/apiServicesTypes.ts";
import {openCloseModal} from "./modalSlice.ts";
import {
    addNewEmployeeInfo,
    deactivateEmployee, deleteEmployeeInfo, fireEmployee,
    getActiveEmployeesList, getEmployeeInfo,
    getNotActiveEmployeesList,
    getWorkingEmployeesList, reactivateEmployee, updateEmployeeInfo
} from "../apiServices/employeesApiServices.ts";


export const axiosActiveEmployees = createAsyncThunk(
    'employees/axiosActiveEmployees',
    async function (page?: number) {
        return await getActiveEmployeesList(page);
    }
);

export const axiosNotActiveEmployees = createAsyncThunk(
    'employees/axiosNotActiveEmployees',
    async function (page?: number) {
        return await getNotActiveEmployeesList(page);
    }
);

export const axiosWorkingEmployeesList = createAsyncThunk(
    'employees/axiosWorkingEmployeesList',
    async function (page?: number) {
        return await getWorkingEmployeesList(page);
    }
);

export const axiosGetEmployeeInfo = createAsyncThunk(
    'employees/axiosGetEmployeeInfo',
    // @ts-ignore
    async function (employeeId?: number, {rejectWithValue}) {
        try {
            if (!employeeId) return null;
            return await getEmployeeInfo(employeeId);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosDeactivateEmployee = createAsyncThunk(
    'employees/axiosDeactivateEmployee',
    async function ({employeeId, page, tableType}: { employeeId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await deactivateEmployee(employeeId);
            if (tableType == 'active') {
                dispatch(axiosActiveEmployees(page));
            } else if (tableType == 'working') {
                dispatch(axiosWorkingEmployeesList(page))
            } else {
                dispatch(axiosNotActiveEmployees(page));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosFireEmployee = createAsyncThunk(
    'employees/axiosFireEmployee',
    async function ({employeeId, tableType, payload}: { employeeId: number, tableType: string, payload?: {date_dismissal: string }}, {
        rejectWithValue,
        dispatch
    }) {
        try {
            // @ts-ignore
            const resp = await fireEmployee(employeeId, payload);
            if (tableType == 'active') {
                dispatch(axiosActiveEmployees());
            } else if (tableType == 'working') {
                dispatch(axiosWorkingEmployeesList());
            } else {
                dispatch(axiosNotActiveEmployees());
            }
            dispatch(openCloseModal({open: false}));
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosReactivateEmployee = createAsyncThunk(
    'employees/axiosReactivateEmployee',
    async function ({employeeId, page, tableType}: { employeeId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await reactivateEmployee(employeeId);
            if (tableType == 'active') {
                dispatch(axiosActiveEmployees(page));
            } else if (tableType == 'working') {
                dispatch(axiosWorkingEmployeesList(page))
            } else {
                dispatch(axiosNotActiveEmployees(page));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosDeleteEmployee = createAsyncThunk(
    'employees/axiosDeleteEmployee',
    async function ({employeeId, page, tableType}: { employeeId: number, page: number, tableType: string }, {
        rejectWithValue,
        dispatch
    }) {
        try {
            const resp = await deleteEmployeeInfo(employeeId);
            if (tableType == 'active') {
                dispatch(axiosActiveEmployees(page));
            } else if (tableType == 'working') {
                dispatch(axiosWorkingEmployeesList(page))
            } else {
                dispatch(axiosNotActiveEmployees(page));
            }
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosCreateEmployeeInfo = createAsyncThunk(
    'employees/axiosCreateEmployeeInfo',
    async function (employeeFormData: EmployeeFormData, {rejectWithValue, dispatch}) {
        try {
            const resp = await addNewEmployeeInfo(employeeFormData);
            dispatch(axiosActiveEmployees());
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const axiosUpdateEmployeeInfo = createAsyncThunk(
    'employees/axiosUpdateEmployeeInfo',
    async function ({employeeId, employeeFormData}: {
        employeeId: number,
        employeeFormData: EmployeeFormData
    }, {rejectWithValue, dispatch}) {
        try {
            const resp = await updateEmployeeInfo(employeeId, employeeFormData);
            dispatch(axiosActiveEmployees());
            dispatch(openCloseModal({open: false}))
            return resp;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const setFormErrors = (state: { userValidationErrors: { first_name: any; last_name: any; patronymic_name: any; email: any; role: any; city: any; street: any; house_number: any; apartment_number: any; birth_date: any; }; employeeValidationErrors: { position_id: any; phone: any; contract_number: any; passport_data: any; bank_account: any; bank_title: any; EDRPOU_bank_code: any; code_IBAN: any; medical_card_number: any; employment_date: any; }; error: any; statusForm: string; }, action: { payload: { response: any; }; }) => {
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
        state.employeeValidationErrors = {
            position_id: response?.data?.errors['employee.position_id'] ?? [],
            phone: response?.data?.errors['employee.phone'] ?? [],
            contract_number: response?.data?.errors['employee.contract_number'] ?? [],
            passport_data: response?.data?.errors['employee.passport_data'] ?? [],
            bank_account: response?.data?.errors['employee.bank_account'] ?? [],
            bank_title: response?.data?.errors['employee.bank_title'] ?? [],
            EDRPOU_bank_code: response?.data?.errors['employee.EDRPOU_bank_code'] ?? [],
            code_IBAN: response?.data?.errors['employee.code_IBAN'] ?? [],
            medical_card_number: response?.data?.errors['employee.medical_card_number'] ?? [],
            employment_date: response?.data?.errors['employee.employment_date'] ?? [],
        }
    } else {
        state.error = response.data.error;
    }

    // @ts-ignore
    state.statusForm = 'failed';
}

const employeesSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        employeeToUpdate: null,
        employee: null,
        firingEmployee: null,
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
        employeeValidationErrors: {
            position_id: [],
            phone: [],
            contract_number: [],
            passport_data: [],
            bank_account: [],
            bank_title: [],
            EDRPOU_bank_code: [],
            code_IBAN: [],
            medical_card_number: [],
            employment_date: [],
        },
        notification: {
            type: '',
            message: ''
        }
    },
    reducers: {
        getEmployeeToUpdate: (state, action) => {
            state.employeeToUpdate = action.payload;
        },
        getEmployeeToFire: (state, action) => {
            state.firingEmployee = action.payload;
        },
        cleanEmployeeErrors: (state, action) => {
            if (action.payload?.field) {
                // @ts-ignore
                if (state.userValidationErrors[action.payload.field]) state.userValidationErrors[action.payload.field] = [];
                // @ts-ignore
                if (state.employeeValidationErrors[action.payload.field]) state.employeeValidationErrors[action.payload.field] = [];
            } else {
                state.error = null
            }
        },
        cleanEmployeeNotification: (state) => {
            state.notification = {type: '', message: ''}
        }
    },
    extraReducers: builder => {
        builder.addCase(axiosWorkingEmployeesList.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosWorkingEmployeesList.fulfilled, (state, action) => {
            state.employees = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosWorkingEmployeesList.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosActiveEmployees.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosActiveEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosActiveEmployees.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosNotActiveEmployees.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosNotActiveEmployees.fulfilled, (state, action) => {
            state.employees = action.payload;
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosNotActiveEmployees.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosGetEmployeeInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosGetEmployeeInfo.fulfilled, (state, action) => {
            state.employee = action.payload;
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
        });
        builder.addCase(axiosGetEmployeeInfo.rejected, (state, action) => {
            // @ts-ignore
            state.statusForm = 'failed';
            // @ts-ignore
            state.error = action.payload;
        });
        builder.addCase(axiosDeactivateEmployee.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosDeactivateEmployee.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Співробітника ${userName} деактивовано!`};
        });
        builder.addCase(axiosDeactivateEmployee.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosReactivateEmployee.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosReactivateEmployee.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Співробітника ${userName} активовано!`};
        });
        builder.addCase(axiosReactivateEmployee.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosFireEmployee.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosFireEmployee.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Співробітника ${userName} звільнено!`};
        });
        builder.addCase(axiosFireEmployee.rejected, (state, action) => {
            // @ts-ignore
            state.statusForm = 'failed';
            console.log('error', action)
            // @ts-ignore
            state.error = action.payload?.response?.data?.error;
            // @ts-ignore
            state.notification = {type: "error", message: action.payload?.response?.data?.error};
        });
        builder.addCase(axiosDeleteEmployee.pending, (state) => {
            // @ts-ignore
            state.status = 'loading';
            state.error = null;
        });
        builder.addCase(axiosDeleteEmployee.fulfilled, (state, action) => {
            // @ts-ignore
            state.status = 'resolved';
            state.error = null;
            let userName = `${action.payload.parrent.last_name} ${action.payload.parrent.first_name}  ${action.payload.parrent.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про співробітника ${userName} видалено!`};
        });
        builder.addCase(axiosDeleteEmployee.rejected, (state, action) => {
            // @ts-ignore
            state.status = 'failed';
            // @ts-ignore
            state.error = action.payload;
            state.notification = {type: "error", message: `Щось пішло не так!`};
        });
        builder.addCase(axiosCreateEmployeeInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosCreateEmployeeInfo.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про співробітника ${userName} додано!`};
        });
        // @ts-ignore
        builder.addCase(axiosCreateEmployeeInfo.rejected, setFormErrors);
        builder.addCase(axiosUpdateEmployeeInfo.pending, (state) => {
            // @ts-ignore
            state.statusForm = 'loading';
            state.error = null;
        });
        builder.addCase(axiosUpdateEmployeeInfo.fulfilled, (state, action) => {
            // @ts-ignore
            state.statusForm = 'resolved';
            state.error = null;
            let userName = `${action.payload.last_name} ${action.payload.first_name}  ${action.payload.patronymic_name ?? ''}`;
            state.notification = {type: "success", message: `Інформацію про співробітника ${userName} оновлено!`};
        });
        // @ts-ignore
        builder.addCase(axiosUpdateEmployeeInfo.rejected, setFormErrors);

    }
});

export const {
    getEmployeeToUpdate,
    cleanEmployeeErrors,
    getEmployeeToFire,
    cleanEmployeeNotification
} = employeesSlice.actions;

export default employeesSlice.reducer;