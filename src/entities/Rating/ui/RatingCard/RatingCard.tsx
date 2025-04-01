import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button";
import { Card } from "@/shared/ui/Card";
import { Drawer } from "@/shared/ui/Drawer";
import { Input } from "@/shared/ui/Input";
import { Modal } from "@/shared/ui/Modal";
import { HStack, VStack } from "@/shared/ui/Stack";
import { StarRating } from "@/shared/ui/StarRating";
import { Text } from "@/shared/ui/Text";
import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { useTranslation } from "react-i18next";

interface RatingCardProps {
    className?: string;
    title?: string;
    feedbackTitle?: string;
    hasFeedback?: boolean;
    onCancel?: (starsCount: number) => void;
    onAccept?: (starsCount: number, feedback?: string) => void;
    rating?: number;
}

export const RatingCard = memo(function RatingCard({
    className,
    onAccept,
    feedbackTitle,
    hasFeedback,
    onCancel,
    title,
    rating = 0,
}: RatingCardProps) {
    const { t } = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [starsCount, setStarsCount] = useState(rating);
    const [feedback, setFeedback] = useState("");

    const handleSelectStart = useCallback(
        (selectedStarsCount: number) => {
            setStarsCount(selectedStarsCount);
            if (hasFeedback) {
                setIsModalOpen(true);
            } else {
                onAccept?.(selectedStarsCount);
            }
        },
        [hasFeedback, onAccept],
    );

    const handleAccept = useCallback(() => {
        setIsModalOpen(false);
        onAccept?.(starsCount, feedback);
    }, [feedback, onAccept, starsCount]);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
        onCancel?.(starsCount);
    }, [onCancel, starsCount]);

    const modalContent = (
        <>
            <Text title={feedbackTitle} />
            <Input
                value={feedback}
                onChange={setFeedback}
                placeholder={t("your review")}
            />
        </>
    );

    return (
        <Card max className={className}>
            <VStack align="center" gap="8">
                <Text title={starsCount ? t("ty") : title} />
                <StarRating
                    size={40}
                    onSelect={handleSelectStart}
                    selectedStars={starsCount}
                />
            </VStack>
            <BrowserView>
                <Modal isOpen={isModalOpen} lazy>
                    <VStack max gap="32">
                        {modalContent}
                        <HStack max gap="16" justify="end">
                            <Button
                                onClick={handleCancel}
                                theme={ButtonTheme.OUTLINE_RED}
                            >
                                {t("close")}
                            </Button>
                            <Button onClick={handleAccept}>{t("send")}</Button>
                        </HStack>
                    </VStack>
                </Modal>
            </BrowserView>
            <MobileView>
                <Drawer isOpen={isModalOpen} lazy onClose={handleCancel}>
                    <VStack gap="32">
                        {modalContent}
                        <Button fullWidth onClick={handleAccept} size={ButtonSize.L}>
                            {t("send")}
                        </Button>
                    </VStack>
                </Drawer>
            </MobileView>
        </Card>
    );
});
