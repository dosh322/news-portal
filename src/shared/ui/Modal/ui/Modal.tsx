import { useTheme } from "@/shared/lib/hooks/useTheme/useTheme";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { useModal } from "@/shared/lib/hooks/useModal/useModal";
import { Overlay } from "../../Overlay/Overlay";
import { Portal } from "../../Portal";
import classes from "./Modal.module.scss";

interface Props {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

function Modal({ className, children, isOpen, onClose, lazy }: PropsWithChildren<Props>) {
    const { isClosing, isMounted, close } = useModal({
        onClose,
        isOpen,
        animationDelay: ANIMATION_DELAY,
    });

    const { theme } = useTheme();

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal>
            <div
                className={clsx(
                    classes.Modal,
                    className,
                    isOpen && classes.opened,
                    isClosing && classes.isClosing,
                )}
            >
                <Overlay onClick={close} />
                <div className={clsx(classes.content, theme)}>{children}</div>
            </div>
        </Portal>
    );
}

export { Modal };
