import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { Profile } from "@/entities/Profile";

export const fetchProfile = createAsyncThunk<Profile, string, ThunkConfig<string>>(
    "profile/fetchProfile",
    async (profileId, { rejectWithValue, extra: { api } }) => {
        try {
            const response = await api.get<Profile>(`/profile/${profileId}`);

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
