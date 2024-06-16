import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getProfileInfo} from "../apiServices/profileApiServices.ts";

export const axiosGetProfile = createAsyncThunk(
    'profile/axiosGetProfile',
    async function () {
        return await getProfileInfo();
    }
);

const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        profile: {
            last_name: '',
            first_name: '',
            patronymic_name: '',
            role: null,
            user_category: '',
            email: '',
            city: '',
            street: '',
            house_number: '',
            apartment_number: '',
            birthdate: ''
        },
        error: null
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(axiosGetProfile.pending, (state) => {
            state.error = null;
        });
        builder.addCase(axiosGetProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
            state.error = null;
        });
        builder.addCase(axiosGetProfile.rejected, (state, action) => {
            // @ts-ignore
            state.error = action.error.message; // assuming error information is in `message` property
        });
    }
});

export const {
} = profileSlice.actions;

export default profileSlice.reducer;