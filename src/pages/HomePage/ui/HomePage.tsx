import { Page } from "@/widgets/Page";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const HomePage = memo(function HomePage() {
    const { t } = useTranslation();

    return (
        <Page>
            <h1>{t("home page")}</h1>
        </Page>
    );
});

export default HomePage;
