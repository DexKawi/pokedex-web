import { specifiedData } from "@/app/lib/utils";

const POKE_API = "https://pokeapi.co/api/v2";

async function fetchWithTimeout(url, options = {}, timeout = 10000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } finally {
        clearTimeout(timeoutId);
    }
}

async function fetchWithRetry(url, options = {}, retries = 3, timeout = 10000) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const res = await fetchWithTimeout(url, options, timeout);
            return res;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);
            if (attempt === retries) throw error;
            await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        }
    }
}

export default async function PokemonPage({ params }) {
    const { slug } = await params;
    const res = await fetchWithRetry(`${POKE_API}/pokemon/${slug}`);

    if (!res.ok) {
        return <div className="pt-12">Pokemon not found</div>;
    }

    const result = await res.json();
    const pokemonData = specifiedData(result);
    console.log(pokemonData);

    return (
        <div className="pt-12">
            <h1>{pokemonData.name}</h1>
        </div>
    );
}