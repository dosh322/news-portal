import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "app/providers/StoreProvider";
import { fetchProfile } from "../services/fetchProfile/fetchProfile";
import { updateProfileData } from "../services/updateProfileData/updateProfileData";
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
        setProfileReadOnly: (state, action: PayloadAction<boolean>) => {
            state.readonly = action.payload;
        },
        cancelEdit: (state) => {
            state.readonly = true;
            state.form = state.data || undefined;
            state.validateErrors = undefined;
        },
        updateProfile: (state, action: PayloadAction<Profile>) => {
            state.form = {
                ...state.form,
                ...action.payload,
            };
        },
    },
    selectors: {
        selectProfileData: (state) => state.data,
        selectProfileError: (state) => state.error,
        selectProfileIsLoading: (state) => state.isLoading,
        selectProfileReadonly: (state) => state.readonly,
        selectProfileForm: (state) => state.form,
        selectValidateErrors: (state) => state.validateErrors,
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
                state.form = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload ?? null;
            })
            .addCase(updateProfileData.pending, (state) => {
                state.validateErrors = undefined;
                state.isLoading = true;
            })
            .addCase(updateProfileData.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
                state.form = action.payload;
                state.readonly = true;
            })
            .addCase(updateProfileData.rejected, (state, action) => {
                state.isLoading = false;
                state.validateErrors = action.payload;
            });
    },
});

const injectedProfileSlice = profileSlice.injectInto(rootReducer);

export const {
    actions: profileActions,
    reducer: profileReducer,
    selectors: profileSelectors,
} = injectedProfileSlice;
