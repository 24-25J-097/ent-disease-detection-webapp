export type ConfirmationModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onConfirmed: () => void;
    title: string;
    message: string;
    btnText: string;
}

export type CriticalConfirmationModalProps = {
    isVisible: boolean;
    onClose: () => void;
    onConfirmed: () => void;
    title: string;
    message: string;
    subMessage?: string;
    btnText: string;
}
