import { useState, useEffect } from "react";

export function usePokemonList() {
  const [pokemonList, setPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/pokemon/all");
        if (!response.ok) throw new Error("Failed to fetch Pokémon list");
        const data = await response.json();
        setPokemonList(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);
  console.log(pokemonList)
  return { pokemonList, loading, error };
}
