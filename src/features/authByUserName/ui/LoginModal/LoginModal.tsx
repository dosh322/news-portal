import { Modal } from "shared/ui/Modal";
import { LoginForm } from "../LoginForm/LoginForm";

interface Props {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

function LoginModal({ className, isOpen, onClose }: Props) {
    return (
        <Modal className={className} isOpen={isOpen} onClose={onClose} lazy>
            <LoginForm />
        </Modal>
    );
}

export { LoginModal };
