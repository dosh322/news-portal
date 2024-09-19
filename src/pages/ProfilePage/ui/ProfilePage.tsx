import { profileReducer } from "entities/Profile";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import {
    DynamicModuleLoader,
    ReducersList,
} from "shared/lib/components/DynamicModuleLoader";

const reducers: ReducersList = {
    profile: profileReducer,
};

interface Props {
    className?: string;
}

const ProfilePage = memo(function ProfilePage({ className }: Props) {
    const { t } = useTranslation("profile");

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <h1>{t("profilePage")}</h1>
        </DynamicModuleLoader>
    );
});

export default ProfilePage;
