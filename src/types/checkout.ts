export interface CheckoutForm {
    fullName: string;
    email: string;
    phone: string;
    streetAddress: string;
    aptSuite: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    shippingMethod: string;
}

export const initialCheckoutForm: CheckoutForm = {
    fullName: "",
    email: "",
    phone: "",
    streetAddress: "",
    aptSuite: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    shippingMethod: "",
};