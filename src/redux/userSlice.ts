import { createSlice, createAsyncThunk, Reducer, AnyAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AuthState } from "../models/AuthState";
import { remoteUrl } from "../models/URL";
import { User } from "../models/User";

const user: User = {
    id: "0",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    userRole: ""
}

const initialState: AuthState =  {
    isLoggedIn: false, 
    registeredError: false, 
    loginError: false, 
    user,
    isRegistered: false,
    isLoading: false
};

export const registerUser = createAsyncThunk(
    "user/registerUser",
    async (userData: User, thunkAPI) => {
        console.log("This is from the AsyncThunk", userData);
        try{
            // const res = await axios.post(`${remoteUrl}/users/register`, userData);
            const res = await axios.post(`${remoteUrl}/users`, userData);
            console.log(res.data);
            return res.data;
        } catch(e) {
            return thunkAPI.rejectWithValue('Email Already Exist');
        }
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            return state;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state, action) => {
            state.isLoading = true;
            return state;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.registeredError = false;
            state.user = {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                password: action.payload.password,
                userRole: action.payload.userRole
            }
            return state;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.registeredError = true;
            return state;
        });
    }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;