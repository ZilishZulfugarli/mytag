import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
}

export const userPanelSlice = createSlice({
    name: "userPanel",
    initialState,
    reducers: {
        userPanelAction: (state, action) => {
            const { user, socialMedias } = action.payload;
            state.user = user;
            state.socialMedias = socialMedias;
        }
    },
});

export const { userPanelAction } = userPanelSlice.actions;

export default userPanelSlice.reducer;
