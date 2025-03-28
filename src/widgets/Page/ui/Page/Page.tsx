import { StateSchema } from "@/app/providers/StoreProvider";
import { clsx } from "clsx";
import {
    scrollRestorationActions,
    selectScrollPositionByPath,
} from "@/features/scrollRestoration";
import { MutableRefObject, PropsWithChildren, UIEvent, memo, useRef } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useInfiniteScroll } from "@/shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect";
import { useThrottle } from "@/shared/lib/hooks/useThrottle/useThrottle";
import classes from "./Page.module.scss";

interface Props {
    className?: string;
    onScrollEnd?: () => void;
}

export const Page = memo(function Page({
    children,
    className,
    onScrollEnd,
}: PropsWithChildren<Props>) {
    const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
    const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
    const dispatch = useAppDispatch();
    const { pathname } = useLocation();
    const scrollPosition = useSelector((state: StateSchema) =>
        selectScrollPositionByPath(state, pathname),
    );

    useInitialEffect(() => {
        if (wrapperRef.current) {
            wrapperRef.current.scrollTop = scrollPosition;
        }
    });

    useInfiniteScroll({
        wrapperRef,
        triggerRef,
        callback: onScrollEnd,
    });

    const handleScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
        dispatch(
            scrollRestorationActions.setScrollPosition({
                position: e.currentTarget.scrollTop,
                path: pathname,
            }),
        );
    }, 500);

    return (
        <main
            id="page"
            ref={wrapperRef}
            className={clsx(classes.page, className)}
            onScroll={handleScroll}
        >
            {children}
            {onScrollEnd && <div className={classes.trigger} ref={triggerRef} />}
        </main>
    );
});
