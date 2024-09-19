import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutPage = memo(function AboutPage() {
    const { t } = useTranslation("about");

    return (
        <div>
            <h1>{t("about page")}</h1>
            <Link to={"/"}>{t("backBtn")}</Link>
        </div>
    );
});

export default AboutPage;
