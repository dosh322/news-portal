import clsx from "clsx";
import {
    getLoginFormError,
    getLoginFormIsLoading,
    getLoginFormPassword,
    getLoginFormUsername,
} from "features/authByUserName/model/selectors";
import { loginByUsername } from "features/authByUserName/model/services/loginByUsername/loginByUsername";
import { FormEvent, memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader";
import useAppDispatch from "shared/lib/hooks/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import { Text, TextTheme } from "shared/ui/Text";
import { loginFormActions, loginFormReducer } from "../../model/slices/loginFormSlice";
import classes from "./LoginForm.module.scss";

export interface LoginFormProps {
    className?: string;
    onSuccess: () => void;
}

const initialReducers: ReducersList = { loginForm: loginFormReducer };

const LoginForm = memo(function LoginForm({ className, onSuccess }: LoginFormProps) {
    const { t } = useTranslation("authorization");
    const dispatch = useAppDispatch();
    const username = useSelector(getLoginFormUsername);
    const password = useSelector(getLoginFormPassword);
    const error = useSelector(getLoginFormError);
    const isLoading = useSelector(getLoginFormIsLoading);

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
        }
    };

    // TODO: fix lint error later
    return (
        <DynamicModuleLoader reducers={initialReducers}>
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
        </DynamicModuleLoader>
    );
});

export default LoginForm;
