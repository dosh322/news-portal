import clsx from "clsx";
import { getLoginState } from "features/authByUserName/model/selectors/getLoginFormState/getLoginFormState";
import { loginByUsername } from "features/authByUserName/model/services/loginByUsername/loginByUsername";
import { FormEvent, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import useAppDispatch from "shared/lib/hooks/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import { Text, TextTheme } from "shared/ui/Text";
import { loginFormActions } from "../../model/slices/loginFormSlice";
import classes from "./LoginForm.module.scss";

interface Props {
    className?: string;
}

const LoginForm = memo(function LoginForm({ className }: Props) {
    const { t } = useTranslation("authorization");
    const dispatch = useAppDispatch();
    const { username, password, error, isLoading } = useSelector(getLoginState);

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
        await dispatch(loginByUsername({ username, password }));
    };

    // TODO: fix lint error later
    return (
        <form
            className={clsx(classes.loginForm, className)}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
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

export { LoginForm };
