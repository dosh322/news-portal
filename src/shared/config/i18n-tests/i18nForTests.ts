import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const defaultLanguage = "ru";

const i18nForTests = i18n.createInstance();

void i18nForTests.use(initReactI18next).init({
    lng: defaultLanguage,
    fallbackLng: defaultLanguage,
    debug: false,
    resources: { ru: { translations: {} } },
});

export { i18nForTests };
