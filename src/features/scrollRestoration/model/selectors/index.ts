import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/app/providers/StoreProvider";

export const selectScrollPositions = (state: StateSchema) =>
    state.scrollRestoration?.scroll;
export const selectScrollPositionByPath = createSelector(
    selectScrollPositions,
    (state: StateSchema, path: string) => path,
    (scroll, path) => scroll?.[path] || 0,
);
