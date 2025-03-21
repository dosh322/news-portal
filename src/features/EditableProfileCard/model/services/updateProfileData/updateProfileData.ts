import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkConfig } from "@/app/providers/StoreProvider";
import { validateProfileData } from "../validateProfileData/validateProfileData";
import { Profile } from "@/entities/Profile";
import { ValidateProfileError } from "../../types";

export const updateProfileData = createAsyncThunk<
    Profile,
    void,
    ThunkConfig<ValidateProfileError[]>
>(
    "profile/updateProfileData",
    async (_, { rejectWithValue, extra: { api }, getState }) => {
        const formData = getState().profile?.form;
        const errors = validateProfileData(formData);

        if (errors.length > 0) {
            return rejectWithValue(errors);
        }
        try {
            const response = await api.put<Profile>(`/profile/${formData?.id}`, formData);

            if (!response.data) {
                throw new Error();
            }

            return response.data;
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
            return rejectWithValue([ValidateProfileError.SERVER_ERROR]);
        }
    },
);
