import { useState, useEffect } from "react";

// This hook gets ONE detailed Pokémon by name, or a random one if no name provided
export function usePokemonDetails(pokemonName = null) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // If a specific pokemon name is provided, fetch that one, otherwise fetch random
        const endpoint = pokemonName 
          ? `/api/pokemon/details/${pokemonName.toLowerCase()}` 
          : "/api/pokemon/random";
        
        const response = await fetch(endpoint);
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
  }, [pokemonName]); // Re-fetch when pokemonName changes

  return { pokemon, loading, error };
}