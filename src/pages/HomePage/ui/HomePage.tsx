import { memo } from "react";
import { useTranslation } from "react-i18next";

const HomePage = memo(function HomePage() {
    const { t } = useTranslation();

    return (
        <div>
            <h1>{t("home page")}</h1>
        </div>
    );
});

export default HomePage;
