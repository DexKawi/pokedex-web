"use client";

import { useState, useEffect } from "react";
import { uppercaseWords } from "../lib/utils";
import { Badge } from "./ui/Badge";

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
      <div className="outline-1 outline-amber-300 p-1 rounded-[15px]">
        <div className="bg-[#bfbfbf] p-4 rounded-[10px]">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-[36px]">{pokemon.name}</h1>
            <h1 className="text-[16px]">#{pokemon.id}</h1>
          </div>
          <div className="flex flex-row justify-center">
            <img className="w-[30%]" src={pokemon.sprites.front_default}/>
          </div>
          <Badge badge={pokemon.type}></Badge>
          <p>{pokemon.type}</p>
          <div className="grid grid-cols-3 gap-2 place-content-center">
            {pokemon.stats.map((stat, index) => (
            <div key={index}>
              <p className="text-[8px]">{uppercaseWords(stat.stat.name)}</p>
              <p>{stat.base_stat}</p>
            </div>
            ))}
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
