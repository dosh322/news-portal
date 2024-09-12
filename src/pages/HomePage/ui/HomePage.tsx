import { Counter } from "entities/Counter";
import { useTranslation } from "react-i18next";

function HomePage() {
    const { t, i18n } = useTranslation();

    return (
        <div>
            <h1>{t("home page")}</h1>
            <Counter />
        </div>
    );
}

export default HomePage;
