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
import { Portal } from "shared/ui/Portal";
import classes from "./Modal.module.scss";

interface Props {
    className?: string;
    isOpen?: boolean;
    onClose?: () => void;
}

const ANIMATION_DELAY = 300;

function Modal({ className, children, isOpen, onClose }: PropsWithChildren<Props>) {
    const [isClosing, setIsClosing] = useState(false);
    const timerRef = useRef<NodeJS.Timeout>();
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
            document.addEventListener("keydown", handleKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, handleKeyDown]);

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
