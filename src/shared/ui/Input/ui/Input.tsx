import clsx from "clsx";
import {
    ChangeEvent,
    ComponentProps,
    FocusEvent,
    memo,
    SyntheticEvent,
    useEffect,
    useRef,
    useState,
} from "react";
import classes from "./Input.module.scss";

export interface InputProps
    extends Omit<ComponentProps<"input">, "onChange" | "value" | "readOnly"> {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
}

const FONT_WIDTH = 9;

export const Input = memo(function Input({
    className,
    value,
    onChange,
    type = "text",
    placeholder,
    onFocus,
    onBlur,
    autoFocus,
    readOnly,
    ...inputProps
}: InputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const isCaretVisible = isFocused && !readOnly;

    const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(true);

        if (onFocus) {
            onFocus(e);
        }
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        setIsFocused(false);

        if (onBlur) {
            onBlur(e);
        }
    };

    const handleSelect = (e: SyntheticEvent<HTMLInputElement, Event>) => {
        if (e.currentTarget.selectionStart) {
            setCaretPosition(e.currentTarget.selectionStart * FONT_WIDTH);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (onChange) {
            onChange(e.target.value);
        }

        setCaretPosition(e.target.value.length * FONT_WIDTH);
    };

    useEffect(() => {
        if (autoFocus) {
            setIsFocused(true);
            inputRef.current?.focus();
        }
    }, [autoFocus]);

    return (
        <div className={clsx(classes.inputWrapper, className)}>
            {placeholder && (
                <div className={classes.placeholder}>{`${placeholder}>`}</div>
            )}
            <div className={classes.caretWrapper}>
                <input
                    ref={inputRef}
                    value={value}
                    onChange={handleChange}
                    className={clsx(classes.input, readOnly && classes.readOnly)}
                    type={type}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    onSelect={handleSelect}
                    readOnly={readOnly}
                    {...inputProps}
                />
                {isCaretVisible && (
                    <span className={classes.caret} style={{ left: caretPosition }} />
                )}
            </div>
        </div>
    );
});
