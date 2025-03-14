import { memo } from "react";
import { useTranslation } from "react-i18next";
import Page from "@/widgets/Page/Page";

const HomePage = memo(function HomePage() {
    const { t } = useTranslation();

    return (
        <Page>
            <h1>{t("home page")}</h1>
        </Page>
    );
});

export default HomePage;
