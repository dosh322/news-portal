import { EditableProfileCard } from "features/EditableProfileCard";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Text } from "shared/ui/Text";
import Page from "widgets/Page/Page";

interface Props {
    className?: string;
}

const ProfilePage = memo(function ProfilePage({ className }: Props) {
    const { t } = useTranslation();
    const { id } = useParams<{ id: string }>();

    if (!id) {
        return <Text title={t("error")} />;
    }

    return (
        <Page>
            <EditableProfileCard id={id} />
        </Page>
    );
});

export default ProfilePage;
