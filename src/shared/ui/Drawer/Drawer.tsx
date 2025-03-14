import clsx from "clsx";
import { memo, ReactNode, useCallback, useEffect } from "react";
import { useAnimationLibs } from "shared/lib/components/AnimationProvider";
import { Overlay } from "../Overlay/Overlay";
import { Portal } from "../Portal";
import classes from "./Drawer.module.scss";

interface DrawerProps {
    className?: string;
    children: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const height = window.innerHeight - 100;

export const DrawerContent = memo(function DrawerContent({
    className,
    children,
    onClose,
    isOpen,
    lazy = false,
}: DrawerProps) {
    const { Gesture, Spring } = useAnimationLibs();
    const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

    const openDrawer = useCallback(() => {
        api.start({ y: 0, immediate: false });
    }, [api]);

    useEffect(() => {
        if (isOpen) {
            openDrawer();
        }
    }, [api, isOpen, openDrawer]);

    const close = (velocity = 0) => {
        api.start({
            y: height,
            immediate: false,
            config: { ...Spring.config.stiff, velocity },
            onResolve: onClose,
        });
    };

    const bind = Gesture.useDrag(
        ({ last, velocity: [, vy], direction: [, dy], movement: [, my], cancel }) => {
            // if the user drags up passed a threshold, then we cancel
            // the drag so that the sheet resets to its open position
            if (my < -70) {
                cancel();
            }

            // when the user releases the sheet, we check whether it passed
            // the threshold for it to close, or if we reset it to its open position
            if (last) {
                my > height * 0.5 || (vy > 0.5 && dy > 0) ? close() : openDrawer();
            }
            // when the user keeps dragging, we just move the sheet according to
            // the cursor position
            else {
                api.start({ y: my, immediate: true });
            }
        },
        {
            from: () => [0, y.get()],
            filterTaps: true,
            bounds: { top: 0 },
            rubberband: true,
        },
    );

    if (!isOpen) {
        return null;
    }

    const display = y.to((py) => (py < height ? "block" : "none"));

    return (
        <Portal>
            <div className={clsx(classes.Drawer, className)}>
                <Overlay onClick={close} />
                <Spring.a.div
                    className={classes.sheet}
                    style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
                    {...bind()}
                >
                    {children}
                </Spring.a.div>
            </div>
        </Portal>
    );
});

export const Drawer = memo(function Drawer(props: DrawerProps) {
    const { isLoaded } = useAnimationLibs();

    if (!isLoaded) {
        return null;
    }

    return <DrawerContent {...props} />;
});
