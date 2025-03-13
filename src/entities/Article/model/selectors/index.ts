import { selectors } from "../slice/articleSlice";
import { selectCanEditArticle } from "./article";

export const articleSelectors = {
    ...selectors,
    selectCanEditArticle,
};
