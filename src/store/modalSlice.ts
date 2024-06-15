import {createSlice} from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: 'modal',
    initialState: {
        isOpen: false,
    },
    reducers: {
        openCloseModal: (state, action) => {
            state.isOpen = action.payload.open;
        },
    }
});

export const {
    openCloseModal,
} = modalSlice.actions;

export default modalSlice.reducer;