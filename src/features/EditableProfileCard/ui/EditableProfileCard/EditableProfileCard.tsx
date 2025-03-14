import { Country } from "@/entities/Country";
import { Currency } from "@/entities/Currency";
import { ProfileCard } from "@/entities/Profile";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useInitialEffect } from "@/shared/lib/hooks/useInitialEffect";
import { VStack } from "@/shared/ui/Stack";
import { Text, TextTheme } from "@/shared/ui/Text";
import { fetchProfile } from "../../model/services/fetchProfile/fetchProfile";
import { profileActions, profileSelectors } from "../../model/slice/profileSlice";
import { ValidateProfileError } from "../../model/types";
import { EditableProfileCardHeader } from "../EditableProfileCardHeader/EditableProfileCardHeader";

interface Props {
    className?: string;
    id: string;
}

function EditableProfileCard({ className, id }: Props) {
    const { t } = useTranslation("profile");
    const dispatch = useAppDispatch();
    const formData = useSelector(profileSelectors.selectProfileForm);
    const isLoading = useSelector(profileSelectors.selectProfileIsLoading);
    const error = useSelector(profileSelectors.selectProfileError);
    const readOnly = useSelector(profileSelectors.selectProfileReadonly);
    const validateErrors = useSelector(profileSelectors.selectValidateErrors);

    const validateErrorTranslates = {
        [ValidateProfileError.INCORRECT_AGE]: t(ValidateProfileError.INCORRECT_AGE),
        [ValidateProfileError.INCORRECT_COUNTRY]: t(
            ValidateProfileError.INCORRECT_COUNTRY,
        ),
        [ValidateProfileError.INCORRECT_USER_DATA]: t(
            ValidateProfileError.INCORRECT_USER_DATA,
        ),
        [ValidateProfileError.NO_DATA]: t(ValidateProfileError.NO_DATA),
        [ValidateProfileError.SERVER_ERROR]: t(ValidateProfileError.SERVER_ERROR),
    };

    const handleChangeFirstName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ firstName: value || "" }));
        },
        [dispatch],
    );

    const handleChangeLastName = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ lastName: value || "" }));
        },
        [dispatch],
    );

    const handleChangeCity = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ city: value || "" }));
        },
        [dispatch],
    );

    const handleChangeAge = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ age: Number(value) || 0 }));
        },
        [dispatch],
    );

    const handleChangeUsername = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ username: value || "" }));
        },
        [dispatch],
    );

    const handleChangeAvatar = useCallback(
        (value?: string) => {
            dispatch(profileActions.updateProfile({ avatar: value || "" }));
        },
        [dispatch],
    );

    const handleChangeCurrency = useCallback(
        (currency: Currency) => {
            dispatch(profileActions.updateProfile({ currency }));
        },
        [dispatch],
    );

    const handleChangeCountry = useCallback(
        (country: Country) => {
            dispatch(profileActions.updateProfile({ country }));
        },
        [dispatch],
    );

    useInitialEffect(() => {
        if (id) {
            dispatch(fetchProfile(id));
        }
    });

    return (
        <VStack gap="16" max>
            <EditableProfileCardHeader />
            {(validateErrors || [])?.length > 0 &&
                validateErrors?.map((err) => (
                    <Text
                        key={err}
                        theme={TextTheme.ERROR}
                        text={validateErrorTranslates[err]}
                    />
                ))}
            <ProfileCard
                data={formData}
                isLoading={isLoading}
                error={error}
                onChangeFirstName={handleChangeFirstName}
                onChangeLastName={handleChangeLastName}
                onChangeAge={handleChangeAge}
                onChangeCity={handleChangeCity}
                onChangeAvatar={handleChangeUsername}
                onChangeUsername={handleChangeAvatar}
                onChangeCurrency={handleChangeCurrency}
                onChangeCountry={handleChangeCountry}
                readOnly={readOnly}
            />
        </VStack>
    );
}

export { EditableProfileCard };
