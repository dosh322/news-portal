import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { User, userActions } from "entities/User";
import { USER_LOCALSTORAGE_KEY } from "shared/constants/localStorage";

interface loginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    loginByUsernameProps,
    ThunkConfig<string>
>(
    "loginForm/loginByUsername",
    async ({ username, password }, { rejectWithValue, dispatch, extra: { api } }) => {
        try {
            const response = await api.post<User>("/login", {
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
