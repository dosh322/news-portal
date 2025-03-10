import clsx from "clsx";
import { getUser } from "entities/User";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { Button, ButtonTheme } from "shared/ui/Button";
import { HStack } from "shared/ui/Stack";
import { Text } from "shared/ui/Text";
import { updateProfileData } from "../../model/services/updateProfileData/updateProfileData";
import { profileActions, profileSelectors } from "../../model/slice/profileSlice";

interface Props {
    className?: string;
}

function EditableProfileCardHeader({ className }: Props) {
    const { t } = useTranslation("profile");
    const currentUser = useSelector(getUser);
    const currentProfile = useSelector(profileSelectors.selectProfileData);
    const canEdit = currentUser?.id === currentProfile?.id;
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
        <HStack max justify="between" className={clsx(className)}>
            <Text title={t("profile")} />
            {canEdit && (
                <>
                    {" "}
                    {readOnly ? (
                        <Button theme={ButtonTheme.OUTLINE} onClick={handleEditBtnClick}>
                            {t("edit")}
                        </Button>
                    ) : (
                        <HStack gap="8">
                            <Button
                                theme={ButtonTheme.OUTLINE_RED}
                                onClick={handleCancelEdit}
                            >
                                {t("cancel")}
                            </Button>
                            <Button theme={ButtonTheme.OUTLINE} onClick={handleSaveForm}>
                                {t("save")}
                            </Button>
                        </HStack>
                    )}
                </>
            )}
        </HStack>
    );
}

export { EditableProfileCardHeader };
