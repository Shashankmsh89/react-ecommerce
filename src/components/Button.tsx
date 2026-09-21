import "./Button.css";

interface ButtonProps {
    variant?: "primary" | "secondary" | "outline" | "danger";
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
}

function Button({
    variant = "primary",
    children,
    disabled = false,
    onClick,
}: ButtonProps) {
    return (
        <button
            className={`button button-${variant}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );

}

export default Button;