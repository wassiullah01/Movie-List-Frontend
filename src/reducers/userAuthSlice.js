import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    users: JSON.parse(localStorage.getItem('users')) || [],
};

const usersAuthSlice = createSlice({
    name: "usersAuth",
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
            // setItem("users", state.users);
        },
        setUsers: (state, action) => {
            state.users = action.payload;
            // setItem("users", state.users);
        },
    },
});

export const { addUser, setUsers } = usersAuthSlice.actions;
export default usersAuthSlice.reducer;
