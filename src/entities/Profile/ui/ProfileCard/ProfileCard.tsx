import clsx from "clsx";
import { Country } from "entities/Country";
import { CountrySelect } from "entities/Country/ui/CountrySelect";
import { Currency, CurrencySelect } from "entities/Currency";
import { Profile } from "entities/Profile/model/types/profile";
import { useTranslation } from "react-i18next";
import { Avatar } from "shared/ui/Avatar";
import { Input } from "shared/ui/Input";
import { Spinner } from "shared/ui/Spinner";
import { Text, TextAlign, TextTheme } from "shared/ui/Text";
import classes from "./ProfileCard.module.scss";

interface Props {
    className?: string;
    data?: Profile | null;
    isLoading?: boolean;
    error?: string | null;
    onChangeFirstName?: (value?: string) => void;
    onChangeLastName?: (value?: string) => void;
    onChangeAge?: (value?: string) => void;
    onChangeCity?: (value?: string) => void;
    onChangeAvatar?: (value?: string) => void;
    onChangeUsername?: (value?: string) => void;
    onChangeCurrency?: (value: Currency) => void;
    onChangeCountry?: (value: Country) => void;
    readOnly?: boolean;
}

function ProfileCard({
    className,
    data,
    isLoading,
    error,
    onChangeFirstName,
    onChangeLastName,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCurrency,
    onChangeCountry,
    readOnly,
}: Props) {
    const { t } = useTranslation("profile");

    if (isLoading) {
        return (
            <div className={clsx(classes.profileCard, classes.loaderContainer)}>
                <Spinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className={clsx(classes.profileCard, classes.loaderContainer)}>
                <Text
                    theme={TextTheme.ERROR}
                    title={t("loadingErrorTitle")}
                    text={t("loadingErrorBody")}
                    align={TextAlign.CENTER}
                />
            </div>
        );
    }

    return (
        <div className={clsx(classes.profileCard, !readOnly && classes.editing)}>
            <div className={classes.profileInfo}>
                {data?.avatar && (
                    <div className={classes.avatarWrapper}>
                        <Avatar src={data?.avatar} />
                    </div>
                )}
                <Input
                    value={data?.firstName}
                    placeholder={t("yourFName")}
                    className={classes.input}
                    onChange={onChangeFirstName}
                    readOnly={readOnly}
                />
                <Input
                    value={data?.lastName}
                    placeholder={t("yourLName")}
                    className={classes.input}
                    onChange={onChangeLastName}
                    readOnly={readOnly}
                />
                <Input
                    value={data?.age?.toString()}
                    placeholder={t("yourAge")}
                    className={classes.input}
                    onChange={onChangeAge}
                    readOnly={readOnly}
                    type="number"
                />
                <Input
                    value={data?.city}
                    placeholder={t("yourCity")}
                    className={classes.input}
                    onChange={onChangeCity}
                    readOnly={readOnly}
                />
                <Input
                    value={data?.username}
                    placeholder={t("yourUsername")}
                    className={classes.input}
                    onChange={onChangeUsername}
                    readOnly={readOnly}
                />
                <Input
                    value={data?.avatar}
                    placeholder={t("yourAvatar")}
                    className={classes.input}
                    onChange={onChangeAvatar}
                    readOnly={readOnly}
                />
                <CurrencySelect
                    label={t("yourCurrency")}
                    onChange={onChangeCurrency}
                    className={classes.input}
                    value={data?.currency}
                    readOnly={readOnly}
                />
                <CountrySelect
                    label={t("yourCountry")}
                    onChange={onChangeCountry}
                    className={classes.input}
                    value={data?.country}
                    readOnly={readOnly}
                />
            </div>
        </div>
    );
}

export { ProfileCard };
