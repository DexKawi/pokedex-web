"use client";

import { useState, useEffect } from "react";

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
      <div className="border border-black p-2">
        <div>
          <div className="flex flex-row justify-between">
            <h1 className="text-[36px]">{pokemon.name}</h1>
            <h1 className="text-[36px]">{pokemon.id}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <img className="w-[30%]" src={pokemon.sprites.front_default}/>
          </div>
          <p>{pokemon.type}</p>
          <div className="grid grid-cols-3">
          </div>
        </div>
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