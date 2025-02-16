import { combineSlices } from "@reduxjs/toolkit";
import { ArticlePageSchema } from "../types";

export const articlePageReducer = combineSlices(
    {},
).withLazyLoadedSlices<ArticlePageSchema>();
