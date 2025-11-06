import { useState, useEffect } from "react";

export function usePokemonDetails() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/pokemon/random");
        if (!response.ok) throw new Error("Failed to fetch Pokémon details");
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return { pokemon, loading, error };
}