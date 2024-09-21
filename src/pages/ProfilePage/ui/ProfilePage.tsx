import { fetchProfile, ProfileCard } from "entities/Profile";
import { memo, useEffect } from "react";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch";

interface Props {
    className?: string;
}

const ProfilePage = memo(function ProfilePage({ className }: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);

    return <ProfileCard />;
});

export default ProfilePage;
