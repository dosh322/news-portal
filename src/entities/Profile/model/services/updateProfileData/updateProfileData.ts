import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const updateProfileData = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    "profile/updateProfileData",
    async (_, { rejectWithValue, extra: { api }, getState }) => {
        const formData = getState().profile?.form;
        try {
            const response = await api.put<Profile>("/profile", formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return rejectWithValue("NO_PROFILE");
        }
    },
);
