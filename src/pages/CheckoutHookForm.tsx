import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Button from "../components/Button";

import type { CheckoutForm } from "../types/checkout";

import {
    fetchCities,
    fetchCountries,
    fetchStates,
} from "../services/locationService";

function CheckoutHookForm() {
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        control,
        formState: { errors, isValid },
    } = useForm<CheckoutForm>({
        mode: "onChange",
        defaultValues: {
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
        },
    });

    const [countries, setCountries] =
        useState<string[]>([]);

    const [states, setStates] =
        useState<string[]>([]);

    const [cities, setCities] =
        useState<string[]>([]);

    const [locationLoading, setLocationLoading] =
        useState(false);

    const selectedCountry = useWatch({
        control,
        name: "country",
    });

    const selectedState = useWatch({
        control,
        name: "state",
    });

    const [successMessage, setSuccessMessage] =
        useState("");

    /*
     * Load countries when page mounts.
     */
    useEffect(() => {
        fetchCountries()
            .then((loadedCountries) => {
                setCountries(loadedCountries);
            })
            .catch((error: unknown) => {
                console.error(
                    "Failed to load countries:",
                    error
                );
            });
    }, []);

    /*
     * Country → State
     */
    async function handleCountryChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const country = event.target.value;

        setValue("country", country, {
            shouldValidate: true,
        });

        setValue("state", "");
        setValue("city", "");

        setStates([]);
        setCities([]);

        if (!country) {
            return;
        }

        try {
            setLocationLoading(true);

            const loadedStates =
                await fetchStates(country);

            setStates(loadedStates);
        } catch (error: unknown) {
            console.error(
                "Failed to load states:",
                error
            );
        } finally {
            setLocationLoading(false);
        }
    }

    /*
     * State → City
     */
    async function handleStateChange(
        event: React.ChangeEvent<HTMLSelectElement>
    ) {
        const state = event.target.value;

        setValue("state", state, {
            shouldValidate: true,
        });

        setValue("city", "");

        setCities([]);

        if (!state || !selectedCountry) {
            return;
        }

        try {
            setLocationLoading(true);

            const loadedCities =
                await fetchCities(
                    selectedCountry,
                    state
                );

            setCities(loadedCities);
        } catch (error: unknown) {
            console.error(
                "Failed to load cities:",
                error
            );
        } finally {
            setLocationLoading(false);
        }
    }

    /*
     * Successful form submission.
     */
    function onSubmit(data: CheckoutForm) {
        console.log("Order placed:", data);

        setSuccessMessage(
            "Order placed successfully!"
        );

        reset();

        setStates([]);
        setCities([]);
    }

    return (
        <>
            <Header />

            <main className="mx-auto max-w-6xl px-4 py-8">

                {/* Breadcrumb */}
                <div className="mb-6 text-sm text-gray-500">
                    Home
                    <span className="mx-2">›</span>
                    Cart
                    <span className="mx-2">›</span>
                    <span className="font-medium text-gray-800">
                        Checkout
                    </span>
                </div>

                {/* Heading */}
                <h1 className="mb-8 text-3xl font-bold text-gray-900">
                    Checkout
                </h1>

                {/* Steps */}
                <div className="mb-8 flex items-center">

                    <div className="flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-sm font-bold text-white">
                            1
                        </span>

                        <span className="font-semibold text-orange-500">
                            Shipping
                        </span>
                    </div>

                    <div className="mx-4 h-px flex-1 bg-gray-300" />

                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                            2
                        </span>

                        <span>
                            Payment
                        </span>
                    </div>

                    <div className="mx-4 h-px flex-1 bg-gray-300" />

                    <div className="flex items-center gap-2 text-gray-400">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-bold">
                            3
                        </span>

                        <span>
                            Review
                        </span>
                    </div>

                </div>

                <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">

                    {/* Shipping Form */}
                    <section className="rounded-sm border border-gray-200 bg-white p-6">

                        <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-bold uppercase tracking-wide text-gray-900">
                            Shipping Information
                        </h2>

                        {successMessage && (
                            <div className="mb-4 rounded-sm bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                                {successMessage}
                            </div>
                        )}

                        <form
                            id="checkout-form"
                            onSubmit={handleSubmit(onSubmit)}
                        >

                            <div className="grid gap-5 md:grid-cols-2">

                                {/* Full Name */}
                                <div>
                                    <label
                                        htmlFor="fullName"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Full Name
                                    </label>

                                    <input
                                        id="fullName"
                                        type="text"
                                        {...register(
                                            "fullName",
                                            {
                                                required:
                                                    "Full name is required",

                                                minLength: {
                                                    value: 3,
                                                    message:
                                                        "Full name must be at least 3 characters",
                                                },

                                                maxLength: {
                                                    value: 50,
                                                    message:
                                                        "Full name must not exceed 50 characters",
                                                },

                                                validate: (
                                                    value
                                                ) =>
                                                    value.trim()
                                                        .length >
                                                    0 ||
                                                    "Full name is required",
                                            }
                                        )}
                                        className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                                    />

                                    {errors.fullName && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .fullName
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        {...register(
                                            "email",
                                            {
                                                required:
                                                    "Email is required",

                                                pattern: {
                                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                                    message:
                                                        "Enter a valid email address",
                                                },
                                            }
                                        )}
                                        className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                                    />

                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .email
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Phone
                                    </label>

                                    <input
                                        id="phone"
                                        type="text"
                                        {...register(
                                            "phone",
                                            {
                                                required:
                                                    "Phone is required",

                                                pattern: {
                                                    value: /^\d{10}$/,
                                                    message:
                                                        "Phone must contain exactly 10 digits",
                                                },
                                            }
                                        )}
                                        className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                                    />

                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .phone
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Street Address */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="streetAddress"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Street Address
                                    </label>

                                    <input
                                        id="streetAddress"
                                        type="text"
                                        {...register(
                                            "streetAddress",
                                            {
                                                required:
                                                    "Street address is required",

                                                minLength: {
                                                    value: 10,
                                                    message:
                                                        "Street address must be at least 10 characters",
                                                },

                                                validate: (
                                                    value
                                                ) =>
                                                    value.trim()
                                                        .length >
                                                    0 ||
                                                    "Street address is required",
                                            }
                                        )}
                                        className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                                    />

                                    {errors.streetAddress && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .streetAddress
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Apt/Suite */}
                                <div className="md:col-span-2">
                                    <label
                                        htmlFor="aptSuite"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Apt/Suite{" "}
                                        <span className="text-gray-400">
                                            (Optional)
                                        </span>
                                    </label>

                                    <input
                                        id="aptSuite"
                                        type="text"
                                        {...register(
                                            "aptSuite"
                                        )}
                                        className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        City
                                    </label>

                                    <select
                                        id="city"
                                        {...register(
                                            "city",
                                            {
                                                required:
                                                    "City is required",
                                            }
                                        )}
                                        disabled={
                                            !selectedState ||
                                            locationLoading
                                        }
                                        className="w-full rounded-sm border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 disabled:bg-gray-100"
                                    >
                                        <option value="">
                                            {locationLoading
                                                ? "Loading..."
                                                : "Select City"}
                                        </option>

                                        {cities.map(
                                            (city) => (
                                                <option
                                                    key={city}
                                                    value={city}
                                                >
                                                    {city}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    {errors.city && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .city
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* State */}
                                <div>
                                    <label
                                        htmlFor="state"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        State
                                    </label>

                                    <select
                                        id="state"
                                        {...register(
                                            "state",
                                            {
                                                required:
                                                    "State is required",
                                            }
                                        )}
                                        onChange={
                                            handleStateChange
                                        }
                                        disabled={
                                            !selectedCountry ||
                                            locationLoading
                                        }
                                        className="w-full rounded-sm border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500 disabled:bg-gray-100"
                                    >
                                        <option value="">
                                            {locationLoading
                                                ? "Loading..."
                                                : "Select State"}
                                        </option>

                                        {states.map(
                                            (state) => (
                                                <option
                                                    key={state}
                                                    value={state}
                                                >
                                                    {state}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    {errors.state && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .state
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* ZIP */}
                                <div>
                                    <label
                                        htmlFor="zip"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        ZIP
                                    </label>

                                    <input
                                        id="zip"
                                        type="text"
                                        {...register(
                                            "zip",
                                            {
                                                required:
                                                    "ZIP is required",

                                                pattern: {
                                                    value: /^\d{5,6}$/,
                                                    message:
                                                        "ZIP must contain 5–6 digits",
                                                },
                                            }
                                        )}
                                        className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                                    />

                                    {errors.zip && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .zip
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                                {/* Country */}
                                <div>
                                    <label
                                        htmlFor="country"
                                        className="mb-1 block text-sm font-medium text-gray-700"
                                    >
                                        Country
                                    </label>

                                    <select
                                        id="country"
                                        {...register(
                                            "country",
                                            {
                                                required:
                                                    "Country is required",
                                            }
                                        )}
                                        onChange={
                                            handleCountryChange
                                        }
                                        className="w-full rounded-sm border border-gray-300 bg-white px-3 py-2.5 outline-none focus:border-orange-500"
                                    >
                                        <option value="">
                                            Select Country
                                        </option>

                                        {countries.map(
                                            (country) => (
                                                <option
                                                    key={country}
                                                    value={country}
                                                >
                                                    {country}
                                                </option>
                                            )
                                        )}
                                    </select>

                                    {errors.country && (
                                        <p className="mt-1 text-sm text-red-500">
                                            {
                                                errors
                                                    .country
                                                    .message
                                            }
                                        </p>
                                    )}
                                </div>

                            </div>

                            {/* Shipping Method */}
                            <fieldset className="mt-6">

                                <legend className="mb-3 text-sm font-medium text-gray-700">
                                    Shipping Method
                                </legend>

                                <div className="space-y-3">

                                    {[
                                        [
                                            "standard",
                                            "Standard",
                                        ],
                                        [
                                            "express",
                                            "Express",
                                        ],
                                        [
                                            "overnight",
                                            "Overnight",
                                        ],
                                    ].map(
                                        ([
                                            value,
                                            label,
                                        ]) => (
                                            <label
                                                key={value}
                                                className="flex cursor-pointer items-center gap-3 rounded-sm border border-gray-200 p-3"
                                            >
                                                <input
                                                    type="radio"
                                                    value={value}
                                                    {...register(
                                                        "shippingMethod",
                                                        {
                                                            required:
                                                                "Shipping method is required",
                                                        }
                                                    )}
                                                />

                                                <span className="text-sm text-gray-700">
                                                    {label}
                                                </span>
                                            </label>
                                        )
                                    )}

                                </div>

                                {errors.shippingMethod && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {
                                            errors
                                                .shippingMethod
                                                .message
                                        }
                                    </p>
                                )}

                            </fieldset>

                        </form>

                    </section>

                    {/* Order Summary */}
                    <aside className="h-fit rounded-sm border border-gray-200 bg-white p-6">

                        <h2 className="mb-6 border-b border-gray-200 pb-4 text-xl font-bold uppercase tracking-wide text-gray-900">
                            Order Summary
                        </h2>

                        <div className="space-y-3 border-b border-gray-200 pb-4 text-sm">

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Subtotal
                                </span>

                                <span className="font-medium">
                                    $299.99
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Shipping
                                </span>

                                <span className="font-medium">
                                    $9.99
                                </span>
                            </div>

                            <div className="flex justify-between">
                                <span className="text-gray-500">
                                    Tax
                                </span>

                                <span className="font-medium">
                                    $24.00
                                </span>
                            </div>

                        </div>

                        <div className="mt-4 flex items-center justify-between border-t-2 border-orange-500 pt-4 text-lg font-bold">

                            <span className="text-gray-900">
                                Total
                            </span>

                            <span className="text-xl text-orange-500">
                                $333.98
                            </span>

                        </div>

                        <div className="mt-6">
                            <Button
                                type="submit"
                                form="checkout-form"
                                disabled={!isValid}
                                className="w-full"
                            >
                                Place Order
                            </Button>
                        </div>

                    </aside>

                </div>

            </main>

            <Footer />
        </>
    );
}

export default CheckoutHookForm;