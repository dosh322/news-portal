import { profileSelectors } from "entities/Profile/model/slice/profileSlice";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Button, ButtonTheme } from "shared/ui/Button";
import { Input } from "shared/ui/Input";
import { Text } from "shared/ui/Text";
import classes from "./ProfileCard.module.scss";

interface Props {
    className?: string;
}

function ProfileCard({ className }: Props) {
    const { t } = useTranslation("profile");
    const data = useSelector(profileSelectors.selectProfileData);
    const isLoading = useSelector(profileSelectors.selectProfileIsLoading);
    const error = useSelector(profileSelectors.selectProfileError);

    return (
        <div className={classes.profileCard}>
            <header className={classes.profileHeader}>
                <Text title={t("profile")} />
                <Button theme={ButtonTheme.OUTLINE} className={classes.editBtn}>
                    {t("edit")}
                </Button>
            </header>
            <div className={classes.profileInfo}>
                <Input
                    value={data?.firstName}
                    placeholder={t("yourFName")}
                    className={classes.input}
                />
                <Input
                    value={data?.lastName}
                    placeholder={t("yourLName")}
                    className={classes.input}
                />
            </div>
        </div>
    );
}

export { ProfileCard };
