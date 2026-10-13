import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import type { To } from "react-router-dom";
import useAuth from "../hooks/useAuth";

interface LoginLocationState {
    from?: To;
}

function Login() {
    const { login } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!login(email, password)) {
            setError("Enter a valid email and a non-empty password.");
            return;
        }

        const state = location.state as LoginLocationState | null;
        navigate(state?.from ?? "/", { replace: true });
    }

    return (
        <main className="flex min-h-[60vh] items-center justify-center bg-gray-100 px-4 py-12">
            <section className="w-full max-w-md border border-gray-200 bg-white p-6">
                <h1 className="mb-6 text-2xl font-bold text-gray-900">
                    Log In
                </h1>

                {error && (
                    <p
                        id="login-error"
                        className="mb-4 rounded-sm bg-red-50 px-4 py-3 text-sm text-red-700"
                        role="alert"
                    >
                        {error}
                    </p>
                )}

                <form className="space-y-5" onSubmit={handleSubmit}>
                    <div>
                        <label
                            htmlFor="login-email"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Email
                        </label>
                        <input
                            id="login-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            aria-describedby={error ? "login-error" : undefined}
                            className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="login-password"
                            className="mb-1 block text-sm font-medium text-gray-700"
                        >
                            Password
                        </label>
                        <input
                            id="login-password"
                            name="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            aria-describedby={error ? "login-error" : undefined}
                            className="w-full rounded-sm border border-gray-300 px-3 py-2.5 outline-none focus:border-orange-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 px-5 py-3 text-sm font-bold text-white transition hover:bg-orange-600"
                    >
                        Log In
                    </button>
                </form>
            </section>
        </main>
    );
}

export default Login;
