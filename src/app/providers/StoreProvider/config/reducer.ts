import type { ReducersMapObject } from "@reduxjs/toolkit";
import { combineSlices } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import type { LazyLoadedSlices, StaticReducers } from "./StateSchema";

const reducers: ReducersMapObject<StaticReducers> = {
    user: userReducer,
};

export const rootReducer =
    combineSlices(reducers).withLazyLoadedSlices<LazyLoadedSlices>();
