import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

function Input({ label, ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="text-xs font-semibold text-gray-700">
                    {label}
                </label>
            )}

            <input
                {...props}
                className="rounded-sm border border-gray-300 px-3 py-2 text-sm outline-none focus:border-orange-500"
            />
        </div>
    );
}

export default Input;