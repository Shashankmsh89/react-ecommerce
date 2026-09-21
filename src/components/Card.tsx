import "./Card.css";

interface CardProps {
    variant?: "elevated" | "bordered" | "flat";
    children: React.ReactNode;
}

function Card({
    variant = "elevated",
    children,
}: CardProps) {
    return (
        <article className={`card card-${variant}`}>
            {children}
        </article>
    );
}

export default Card;