"use client";

import { useState, useEffect } from "react";
// ALTERNATIVE: Using a custom hook (more advanced)
function usePokemon() {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/pokemon-data");
        if (!response.ok) throw new Error('Failed to fetch');
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


function PokemonCard() {
  const { pokemon, loading, error } = usePokemon();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pokemon) return <p>No data</p>;

  return (
    <>
      <div className="border border-indigo-600">
        <div className="flex flex-row justify-between">
          <h1>{pokemon.name}</h1>
          <p>{pokemon.type}</p>
          <h1>{pokemon.id}</h1>
        </div>
        <img src={pokemon.sprites.front_default}/>
        <img src={pokemon.sprites.back_default}/>
      </div>
    </>
  );
}

export default function PokemonGrids() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <PokemonCard key={index} />
      ))}
    </div>
  );
}