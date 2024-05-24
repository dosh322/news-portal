import { lazy } from "react";

export const NotFoundPageLazy = lazy(
    () =>
        new Promise((resolve) => {
            // @ts-expect-error For testing purposes
            setTimeout(() => resolve(import("./NotFoundPage")), 5000);
        }),
);
