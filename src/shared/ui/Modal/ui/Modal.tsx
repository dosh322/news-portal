import { useTheme } from "app/providers/ThemeProvider";
import clsx from "clsx";
import {
    MouseEvent,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
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
    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const { theme } = useTheme();

    const handleClose = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const handleContentClick = (e: MouseEvent) => {
        e.stopPropagation();
    };

    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                handleClose();
            }
        },
        [handleClose],
    );

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }

        return () => {
            setIsMounted(false);
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

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
                <div className={classes.overlay} onClick={handleClose}>
                    <div
                        className={clsx(classes.content, theme)}
                        onClick={handleContentClick}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
}

export { Modal };
