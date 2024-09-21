import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "app/providers/StoreProvider";
import { fetchProfile } from "../services/fetchProfile/fetchProfile";
import { Profile, ProfileSchema } from "../types/profile";

const initialState: ProfileSchema = {
    data: null,
    isLoading: false,
    readonly: true,
    error: null,
};

export const profileSlice = createSlice({
    name: "profile",
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<Profile>) => {
            state.data = action.payload;
        },
    },
    selectors: {
        selectProfileData: (state) => state.data,
        selectProfileError: (state) => state.error,
        selectProfileIsLoading: (state) => state.isLoading,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.error = null;
                state.isLoading = true;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            });
    },
});

const injectedProfileSlice = profileSlice.injectInto(rootReducer);

export const {
    actions: profileActions,
    reducer: profileReducer,
    selectors: profileSelectors,
} = injectedProfileSlice;
