import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: [],
    userRole: null,
};

const usersAuthSlice = createSlice({
    name: "usersAuth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        setUserRole: (state, action) => {
            state.userRole = action.payload;
        },
    },
});

export const { addUser, setUserRole } = usersAuthSlice.actions;
export default usersAuthSlice.reducer;