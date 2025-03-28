import { Country, CountrySelect } from "@/entities/Country";
import { Currency, CurrencySelect } from "@/entities/Currency";
import { Avatar } from "@/shared/ui/Avatar";
import { Input } from "@/shared/ui/Input";
import { Spinner } from "@/shared/ui/Spinner";
import { HStack, VStack } from "@/shared/ui/Stack";
import { Text, TextAlign, TextTheme } from "@/shared/ui/Text";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { Profile } from "../../model/types/profile";
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
            <HStack
                justify="center"
                max
                className={clsx(classes.profileCard, classes.loaderContainer)}
            >
                <Spinner />
            </HStack>
        );
    }

    if (error) {
        return (
            <HStack
                justify="center"
                max
                className={clsx(classes.profileCard, classes.error)}
            >
                <Text
                    theme={TextTheme.ERROR}
                    title={t("loadingErrorTitle")}
                    text={t("loadingErrorBody")}
                    align={TextAlign.CENTER}
                />
            </HStack>
        );
    }

    return (
        <VStack
            gap="8"
            max
            className={clsx(classes.profileCard, !readOnly && classes.editing)}
        >
            {data?.avatar && (
                <HStack justify="center" max className={classes.avatarWrapper}>
                    <Avatar src={data?.avatar} />
                </HStack>
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
        </VStack>
    );
}

export { ProfileCard };
