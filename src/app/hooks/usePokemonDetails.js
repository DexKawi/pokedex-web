// hooks/usePokemonDetails.js
import { useState, useEffect } from "react";

// This hook gets ONE detailed Pokémon, perfect for a card.
export function usePokemonDetails() {
  const [pokemon, setPokemon] = useState(null); // Start with null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch from your endpoint that returns one detailed, random Pokémon
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
  }, []); // The empty array means this runs once when the component mounts

  return { pokemon, loading, error };
}