import { useTranslation } from "react-i18next";

function HomePage() {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>{t("home page")}</h1>
        </div>
    );
}

export default HomePage;
