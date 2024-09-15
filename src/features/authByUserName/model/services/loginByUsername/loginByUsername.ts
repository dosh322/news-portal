import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/constants/localStorage";

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    loginByUsernameProps,
    { rejectValue: string }
>(
    "loginForm/loginByUsername",
    async ({ username, password }, { rejectWithValue, dispatch }) => {
        try {
            const response = await axios.post<User>("http://localhost:8000/login", {
                username,
                password,
            });

            if (!response.data) {
                throw new Error();
            }
            localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(response.data));
            dispatch(userActions.setAuthData(response.data));

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return rejectWithValue("wrongLogin");
        }
    },
);
