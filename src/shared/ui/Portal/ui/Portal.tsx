import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

interface Props {
    element?: HTMLElement;
}

function Portal({ children, element = document.body }: PropsWithChildren<Props>) {
    return createPortal(children, element);
}

export { Portal };
