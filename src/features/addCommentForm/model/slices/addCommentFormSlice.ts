import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "@/app/providers/StoreProvider";
import { AddCommentFormSchema } from "../types/addCommentForm";

const initialState: AddCommentFormSchema = {
    text: "",
};

export const addCommentFormSlice = createSlice({
    name: "addCommentForm",
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
    },
    selectors: {
        selectAddCommentFormText: (state) => state.text,
        selectAddCommentFormError: (state) => state.error,
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(loginByUsername.pending, (state) => {
    //             state.error = undefined;
    //             state.isLoading = true;
    //         })
    //         .addCase(loginByUsername.fulfilled, (state) => {
    //             state.isLoading = false;
    //         })
    //         .addCase(loginByUsername.rejected, (state, action) => {
    //             state.isLoading = false;
    //             state.error = action.payload;
    //         });
    // },
});

const injectedCommentFormSlice = addCommentFormSlice.injectInto(rootReducer);

export const {
    actions: addCommentFormActions,
    reducer: addCommentFormReducer,
    selectors: addCommentFormSelectors,
} = injectedCommentFormSlice;
