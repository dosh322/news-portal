import clsx from "clsx";
import { memo, useCallback } from "react";
import CopyIcon from "shared/assets/icons/copy-20-20.svg";
import { Button, ButtonTheme } from "shared/ui/Button";
import classes from "./Code.module.scss";

interface CodeProps {
    className?: string;
    text: string;
}

export const Code = memo(function Code({ className, text }: CodeProps) {
    const handleCopy = useCallback(() => {
        navigator.clipboard.writeText(text);
    }, [text]);

    return (
        <pre className={clsx(classes.Code, className)}>
            <Button
                onClick={handleCopy}
                className={classes.copyBtn}
                theme={ButtonTheme.CLEAR}
            >
                <CopyIcon className={classes.copyIcon} />
            </Button>
            <code>{text}</code>
        </pre>
    );
});
