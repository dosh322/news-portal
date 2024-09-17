import { Suspense } from "react";
import { Modal } from "shared/ui/Modal";
import { Spinner } from "shared/ui/Spinner";
import { LoginFormLazy } from "../LoginForm/LoginForm.lazy";

interface Props {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

function LoginModal({ className, isOpen, onClose }: Props) {
    return (
        <Modal className={className} isOpen={isOpen} onClose={onClose} lazy>
            <Suspense fallback={<Spinner />}>
                <LoginFormLazy />
            </Suspense>
        </Modal>
    );
}

export { LoginModal };
