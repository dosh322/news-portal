import { lazy } from "react";

export const NotFoundPageLazy = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-ignore
            setTimeout(() => resolve(import("./NotFoundPage")), 5000);
        }),
);
