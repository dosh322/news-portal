import { Skeleton } from "@/shared/ui/Skeleton";
import { lazy, Suspense } from "react";
import { ArticleRatingProps } from "./ArticleRating";

const ArticleRatingLazy = lazy(() => import("./ArticleRating"));

export function ArticleRatingAsync(props: ArticleRatingProps) {
    return (
        <Suspense fallback={<Skeleton width="100%" height={140} />}>
            <ArticleRatingLazy {...props} />
        </Suspense>
    );
}
