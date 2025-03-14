import clsx from "clsx";
import { loginByUsername } from "../../model/services/loginByUsername/loginByUsername";
import { FormEvent, memo, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { Button, ButtonTheme } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Text, TextTheme } from "@/shared/ui/Text";
import { loginFormActions, loginFormSelectors } from "../../model/slices/loginFormSlice";
import classes from "./LoginForm.module.scss";

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const LoginForm = memo(function LoginForm({ className, onSuccess }: LoginFormProps) {
    const { t } = useTranslation("authorization");
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const username = useSelector(loginFormSelectors.selectLoginFormUsername);
    const password = useSelector(loginFormSelectors.selectLoginFormPassword);
    const error = useSelector(loginFormSelectors.selectLoginFormError);
    const isLoading = useSelector(loginFormSelectors.selectLoginFormIsLoading);

    const handleChangeUsername = useCallback(
        (value: string) => {
            dispatch(loginFormActions.setUsername(value));
        },
        [dispatch],
    );

    const handleChangePassword = useCallback(
        (value: string) => {
            dispatch(loginFormActions.setPassword(value));
        },
        [dispatch],
    );

    const handleSubmitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = await dispatch(loginByUsername({ username, password }));
        if (result.meta.requestStatus === "fulfilled") {
            onSuccess();
            navigate("/about");
        }
    };

    useEffect(() => {
        return () => {
            dispatch(loginFormActions.reset());
        };
    }, [dispatch]);

    // TODO: fix lint error later
    return (
        <form
            className={clsx(classes.loginForm, className)}
            onSubmit={handleSubmitLoginForm}
        >
            <Text title={t("authForm")} />
            {error && <Text theme={TextTheme.ERROR} text={t(error)} />}
            <Input
                className={classes.input}
                value={username}
                onChange={handleChangeUsername}
                placeholder={t("username")}
                autoFocus
            />
            <Input
                className={classes.input}
                value={password}
                onChange={handleChangePassword}
                placeholder={t("password")}
            />
            <Button
                theme={ButtonTheme.OUTLINE}
                className={classes.loginBtn}
                type="submit"
                disabled={isLoading}
            >
                {t("log in")}
            </Button>
        </form>
    );
});

export default LoginForm;
