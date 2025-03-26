import StarIcon from "@/shared/assets/icons/star.svg";
import { Icon } from "@/shared/ui/Icon/Icon";
import clsx from "clsx";
import { memo, useState } from "react";
import classes from "./StarRating.module.scss";

interface StarRatingProps {
    className?: string;
    onSelect?: (starsCount: number) => void;
    size?: number;
    selectedStars?: number;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(function StarRating({
    className,
    size = 30,
    selectedStars = 0,
    onSelect,
}: StarRatingProps) {
    const [currentStarsCount, setCurrentStarsCount] = useState(0);
    const [isSelected, setIsSelected] = useState(Boolean(selectedStars));

    const handleHover = (starsCount: number) => () => {
        if (!isSelected) {
            setCurrentStarsCount(starsCount);
        }
    };

    const handleLeave = () => {
        if (!isSelected) {
            setCurrentStarsCount(0);
        }
    };

    const onClick = (starsCount: number) => () => {
        if (!isSelected) {
            onSelect?.(starsCount);
            setCurrentStarsCount(starsCount);
            setIsSelected(true);
        }
    };

    return (
        <div className={clsx(classes.StarRating, {}, [className])}>
            {stars.map((starNumber) => (
                <Icon
                    className={clsx(
                        classes.starIcon,
                        isSelected && classes.selected,
                        currentStarsCount >= starNumber
                            ? classes.hovered
                            : classes.normal,
                    )}
                    Svg={StarIcon}
                    key={starNumber}
                    width={size}
                    height={size}
                    onMouseLeave={handleLeave}
                    onMouseEnter={handleHover(starNumber)}
                    onClick={onClick(starNumber)}
                />
            ))}
        </div>
    );
});
