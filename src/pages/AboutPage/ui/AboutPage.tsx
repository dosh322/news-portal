import { Page } from "@/widgets/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const AboutPage = memo(function AboutPage() {
    const { t } = useTranslation("about");

    return (
        <Page>
            <h1>{t("about page")}</h1>
            <Link to={"/"}>{t("backBtn")}</Link>
        </Page>
    );
});

export default AboutPage;
