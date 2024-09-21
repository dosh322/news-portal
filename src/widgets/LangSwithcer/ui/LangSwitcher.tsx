import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Button, ButtonTheme } from "shared/ui/Button";

interface Props {
    classname?: string;
    short?: boolean;
}

const LangSwitcher = memo(function LangSwitcher({ classname, short }: Props) {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru").catch(() => {
            console.error("Cannot change language");
        });
    };

    return (
        <Button
            type="button"
            onClick={toggleLang}
            className={classname}
            theme={ButtonTheme.CLEAR}
        >
            {t(short ? "shortLang" : "language")}
        </Button>
    );
});

export { LangSwitcher };
