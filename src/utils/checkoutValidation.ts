import type { CheckoutForm } from "../types/checkout";

export type CheckoutErrors = Partial<
    Record<keyof CheckoutForm, string>
>;

export function validateField(
    name: keyof CheckoutForm,
    value: string
): string {
    const trimmedValue = value.trim();

    switch (name) {
        case "fullName":
            if (!trimmedValue) {
                return "Full name is required";
            }

            if (trimmedValue.length < 3) {
                return "Full name must be at least 3 characters";
            }

            if (trimmedValue.length > 50) {
                return "Full name must not exceed 50 characters";
            }

            return "";

        case "email":
            if (!trimmedValue) {
                return "Email is required";
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
                return "Enter a valid email address";
            }

            return "";

        case "phone":
            if (!trimmedValue) {
                return "Phone is required";
            }

            if (!/^\d{10}$/.test(trimmedValue)) {
                return "Phone must contain exactly 10 digits";
            }

            return "";

        case "streetAddress":
            if (!trimmedValue) {
                return "Street address is required";
            }

            if (trimmedValue.length < 10) {
                return "Street address must be at least 10 characters";
            }

            return "";

        case "city":
            if (!trimmedValue) {
                return "City is required";
            }

            return "";

        case "state":
            if (!trimmedValue) {
                return "State is required";
            }

            return "";

        case "zip":
            if (!trimmedValue) {
                return "ZIP is required";
            }

            if (!/^\d{5,6}$/.test(trimmedValue)) {
                return "ZIP must contain 5–6 digits";
            }

            return "";

        case "country":
            if (!trimmedValue) {
                return "Country is required";
            }

            return "";

        case "shippingMethod":
            if (!trimmedValue) {
                return "Shipping method is required";
            }

            return "";

        case "aptSuite":
            return "";

        default:
            return "";
    }
}

export function validateForm(form: CheckoutForm): CheckoutErrors {
    const errors: CheckoutErrors = {};

    (
        Object.keys(form) as Array<keyof CheckoutForm>
    ).forEach((field) => {
        const error = validateField(field, form[field]);

        if (error) {
            errors[field] = error;
        }
    });

    return errors;
}