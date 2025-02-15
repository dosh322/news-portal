import { Country } from "entities/Country";
import { Currency } from "entities/Currency";
import { fetchProfile, ProfileCard, ValidateProfileError } from "entities/Profile";
import {
    profileActions,
    profileSelectors,
} from "entities/Profile/model/slice/profileSlice";
import { memo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";
import { useInitialEffect } from "shared/lib/hooks/useInitialEffect";
import { Text, TextTheme } from "shared/ui/Text";
import Page from "widgets/Page/Page";
import { ProfilePageHeader } from "./ProfilePageHeader/ProfilePageHeader";

interface Props {
    className?: string;
}

const ProfilePage = memo(function ProfilePage({ className }: Props) {
    const { t } = useTranslation("profile");
    const { id } = useParams<{ id: string }>();
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
        <Page>
            <ProfilePageHeader />
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
        </Page>
    );
});

export default ProfilePage;
