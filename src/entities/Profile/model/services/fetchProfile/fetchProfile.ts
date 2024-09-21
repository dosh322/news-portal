import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "app/providers/StoreProvider";
import { Profile } from "../../types/profile";

export const fetchProfile = createAsyncThunk<Profile, void, ThunkConfig<string>>(
    "profile/fetchProfile",
    async (_, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Profile>("/profile");

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
