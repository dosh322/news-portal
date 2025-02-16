import type { ReducersMapObject } from "@reduxjs/toolkit";
import { combineSlices } from "@reduxjs/toolkit";
import { userReducer } from "entities/User";
import { articlePageReducer } from "pages/ArticlePage/model/slices";
import type { LazyLoadedSlices, StaticReducers } from "./StateSchema";

const reducers: ReducersMapObject<StaticReducers> = {
    user: userReducer,
    articlePage: articlePageReducer,
};

export const rootReducer =
    combineSlices(reducers).withLazyLoadedSlices<LazyLoadedSlices>();
