import { useTranslation } from "react-i18next";
import { Button } from "shared/ui/Button";

interface Props {
    classname?: string;
}

function LangSwitcher({ classname }: Props) {
    const { t, i18n } = useTranslation();

    const toggleLang = () => {
        i18n.changeLanguage(i18n.language === "ru" ? "en" : "ru").catch(() => {
            console.error("Cannot change language");
        });
    };

    return (
        <Button type="button" onClick={toggleLang} className={classname}>
            {t("language")}
        </Button>
    );
}

export { LangSwitcher };
