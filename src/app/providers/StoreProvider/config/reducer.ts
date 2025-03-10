import type { ReducersMapObject } from "@reduxjs/toolkit";
import { combineSlices } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { rtkApi } from "shared/api/rtkApi";
import type { LazyLoadedSlices, StaticReducers } from "./StateSchema";

const reducers: ReducersMapObject<StaticReducers> = {
    user: userReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
};

export const rootReducer =
    combineSlices(reducers).withLazyLoadedSlices<LazyLoadedSlices>();
