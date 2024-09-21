import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "app/providers/StoreProvider";
import { loginByUsername } from "../services/loginByUsername/loginByUsername";
import { LoginFormSchema } from "../types/loginFormSchema";

const initialState: LoginFormSchema = {
    username: "",
    password: "",
    isLoading: false,
};

export const loginFormSlice = createSlice({
    name: "loginForm",
    initialState,
    reducers: {
        setUsername: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        reset: () => initialState,
    },
    selectors: {
        selectLoginFormState: (state) => state,
        selectLoginFormUsername: (state) => state.username,
        selectLoginFormPassword: (state) => state.password,
        selectLoginFormError: (state) => state.error,
        selectLoginFormIsLoading: (state) => state.isLoading,
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginByUsername.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(loginByUsername.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(loginByUsername.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

const injectedLoginFormSlice = loginFormSlice.injectInto(rootReducer);

export const {
    actions: loginFormActions,
    reducer: loginFormReducer,
    selectors: loginFormSelectors,
} = injectedLoginFormSlice;
