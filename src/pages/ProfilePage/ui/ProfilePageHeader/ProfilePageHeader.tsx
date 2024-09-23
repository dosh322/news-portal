import { updateProfileData } from "entities/Profile";
import {
    profileActions,
    profileSelectors,
} from "entities/Profile/model/slice/profileSlice";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Text } from "shared/ui/Text";
import classes from "./ProfilePageHeader.module.scss";

interface Props {
    className?: string;
}

function ProfilePageHeader({ className }: Props) {
    const { t } = useTranslation("profile");
    const dispatch = useAppDispatch();

    const readOnly = useSelector(profileSelectors.selectProfileReadonly);

    const handleEditBtnClick = useCallback(() => {
        dispatch(profileActions.setProfileReadOnly(false));
    }, [dispatch]);

    const handleCancelEdit = useCallback(() => {
        dispatch(profileActions.cancelEdit());
    }, [dispatch]);

    const handleSaveForm = useCallback(() => {
        dispatch(updateProfileData());
    }, [dispatch]);

    return (
        <header className={classes.profileHeader}>
            <Text title={t("profile")} />
            {readOnly ? (
                <Button
                    theme={ButtonTheme.OUTLINE}
                    className={classes.editBtn}
                    onClick={handleEditBtnClick}
                >
                    {t("edit")}
                </Button>
            ) : (
                <>
                    <Button
                        theme={ButtonTheme.OUTLINE_RED}
                        className={classes.editBtn}
                        onClick={handleCancelEdit}
                    >
                        {t("cancel")}
                    </Button>
                    <Button theme={ButtonTheme.OUTLINE} onClick={handleSaveForm}>
                        {t("save")}
                    </Button>
                </>
            )}
        </header>
    );
}

export { ProfilePageHeader };
