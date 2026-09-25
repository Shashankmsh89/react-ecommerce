import Input from "./Input";

interface ProductSearchProps {
    value: string;
    onChange: (value: string) => void;
}

function ProductSearch({
    value,
    onChange,
}: ProductSearchProps) {
    return (
        <Input
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Search products..."
        />
    );
}

export default ProductSearch;