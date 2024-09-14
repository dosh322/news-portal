import clsx from "clsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import classes from "./LoginForm.module.scss";

interface Props {
    className?: string;
}

function LoginForm({ className }: Props) {
    const [value, setValue] = useState("");
    const { t } = useTranslation("authentification");

    const onChange = (val: string) => {
        setValue(val);
    };

    return (
        <form className={clsx(classes.loginForm, className)}>
            <Input
                className={classes.input}
                value={value}
                onChange={onChange}
                placeholder={t("username")}
                autoFocus
            />
            <Input className={classes.input} placeholder={t("password")} />
            <Button theme={ButtonTheme.OUTLINE} className={classes.loginBtn}>
                {t("log in")}
            </Button>
        </form>
    );
}

export { LoginForm };
