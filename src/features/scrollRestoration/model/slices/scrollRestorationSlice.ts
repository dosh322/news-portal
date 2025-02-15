import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { rootReducer } from "app/providers/StoreProvider";
import type { ScrollRestorationSchema } from "../types/ScrollRestorationSchema";

const initialState: ScrollRestorationSchema = {
    scroll: {},
};

export const scrollRestorationSlice = createSlice({
    name: "scrollRestoration",
    initialState,
    reducers: {
        setScrollPosition: (
            state,
            {
                payload: { path, position },
            }: PayloadAction<{ path: string; position: number }>,
        ) => {
            state.scroll[path] = position;
        },
    },
});

const injectedScrollRestorationSlice = scrollRestorationSlice.injectInto(rootReducer);

export const { actions: scrollRestorationActions, reducer: scrollRestorationReducer } =
    injectedScrollRestorationSlice;
