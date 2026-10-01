const API_URL = "https://countriesnow.space/api/v0.1";

interface Country {
    country: string;
}

interface State {
    name: string;
    state_code?: string;
}

interface CountriesResponse {
    error: boolean;
    msg: string;
    data: Country[];
}

interface StatesResponse {
    error: boolean;
    msg: string;
    data: {
        name: string;
        states: State[];
    };
}

interface CitiesResponse {
    error: boolean;
    msg: string;
    data: string[];
}

export async function fetchCountries(): Promise<string[]> {
    const response = await fetch(`${API_URL}/countries`);

    if (!response.ok) {
        throw new Error("Failed to fetch countries.");
    }

    const result: CountriesResponse = await response.json();

    return result.data.map((country) => country.country);
}

export async function fetchStates(country: string): Promise<string[]> {
    const response = await fetch(`${API_URL}/countries/states`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            country,
        }),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch states.");
    }

    const result: StatesResponse = await response.json();

    return result.data.states.map((state) => state.name);
}

export async function fetchCities(
    country: string,
    state: string
): Promise<string[]> {
    const response = await fetch(
        `${API_URL}/countries/state/cities`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                country,
                state,
            }),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch cities.");
    }

    const result: CitiesResponse = await response.json();

    return result.data;
}