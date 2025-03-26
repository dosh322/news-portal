import {
    Popover as HPopover,
    PopoverButton as HPopoverButton,
    PopoverPanel as HPopoverPanel,
} from "@headlessui/react";
import { AnchorProps } from "@headlessui/react/dist/internal/floating";
import clsx from "clsx";
import { PropsWithChildren, ReactNode } from "react";
import popupClasses from "../../styles/popup.module.scss";
import classes from "./Popover.module.scss";

interface Props {
    className?: string;
    anchor?: AnchorProps;
    trigger: ReactNode;
}

function Popover({
    className,
    anchor = "bottom",
    trigger,
    children,
}: PropsWithChildren<Props>) {
    return (
        <HPopover className={clsx(className, popupClasses.popup)}>
            <HPopoverButton as="div" className={popupClasses.trigger}>
                {trigger}
            </HPopoverButton>
            <HPopoverPanel anchor={anchor} className={classes.panel}>
                {children}
            </HPopoverPanel>
        </HPopover>
    );
}

export { Popover };
