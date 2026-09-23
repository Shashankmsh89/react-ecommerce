interface CardProps {
    variant?: "elevated" | "bordered" | "flat";
    children: React.ReactNode;
}

function Card({
    variant = "elevated",
    children,
}: CardProps) {
    const baseClasses =
        "rounded-sm bg-white p-6";

    const variantClasses = {
        elevated:
            "shadow-md",
        bordered:
            "border border-gray-200",
        flat:
            "border border-transparent",
    };

    return (
        <article
            className={`${baseClasses} ${variantClasses[variant]}`}
        >
            {children}
        </article>
    );
}

export default Card;