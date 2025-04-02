import { rootReducer } from "@/app/providers/StoreProvider";
import { buildSlice } from "@/shared/lib/store";
import { PayloadAction } from "@reduxjs/toolkit";
import type { ScrollRestorationSchema } from "../types/ScrollRestorationSchema";

const initialState: ScrollRestorationSchema = {
    scroll: {},
};

export const scrollRestorationSlice = buildSlice({
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
