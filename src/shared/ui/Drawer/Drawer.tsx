import clsx from "clsx";
import { memo, ReactNode } from "react";
import { useModal } from "shared/lib/hooks/useModal/useModal";
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

export const Drawer = memo(function Drawer({
    className,
    children,
    onClose,
    isOpen,
    lazy = false,
}: DrawerProps) {
    const { isClosing, isMounted, close } = useModal({
        onClose,
        isOpen,
        animationDelay: 300,
    });

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                className={clsx(
                    isOpen && classes.opened,
                    isClosing && classes.isClosing,
                    classes.Drawer,
                    className,
                )}
            >
                <Overlay onClick={close} />
                <div className={classes.content}>{children}</div>
            </div>
        </Portal>
    );
});
