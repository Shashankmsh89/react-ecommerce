interface ButtonProps {
    variant?: "primary" | "secondary" | "outline" | "danger";
    children: React.ReactNode;
    disabled?: boolean;
    onClick?: () => void;
    type?: "button" | "submit" | "reset";
    form?: string;
    className?: string;
}

function Button({
    variant = "primary",
    children,
    disabled = false,
    onClick,
    type = "button",
    form,
    className,


}: ButtonProps) {
    const baseClasses =
        "rounded-sm px-5 py-2.5 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-50";

    const variantClasses = {
        primary:
            "bg-orange-500 text-white hover:bg-orange-600",
        secondary:
            "bg-gray-800 text-white hover:bg-gray-900",
        outline:
            "border border-orange-500 bg-white text-orange-500 hover:bg-orange-50",
        danger:
            "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <button
            type={type}
            form={form}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            disabled={disabled}
            onClick={onClick}
        >
            {children}
        </button>
    );
}


export default Button;