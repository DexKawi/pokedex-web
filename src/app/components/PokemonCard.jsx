"use client";

import { uppercaseWords } from "../lib/utils";
import { Badge } from "./ui/Badge";
import { useState, useEffect } from "react";

function PokemonCard({ pokemonName }) {
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPokemon() {
      setLoading(true);
      setError(null);
      
      try {
        const endpoint = pokemonName 
          ? `/api/pokemon/${pokemonName.toLowerCase()}`
          : `/api/pokemon/random`;
        
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error("Failed to fetch Pokémon");
        const data = await response.json();
        setPokemon(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPokemon();
  }, [pokemonName]);

  if (loading) return <div className="p-4 bg-gray-200 rounded-lg">Loading card...</div>;
  if (error) return <div className="p-4 bg-red-100 text-red-700 rounded-lg">Error: {error}</div>;
  if (!pokemon) return <div className="p-4 bg-gray-200 rounded-lg">No Pokémon data found.</div>;
  
  return (
    <div className="outline-1 outline-[#ffffff] p-1 rounded-[15px]">
      <div className="bg-[#ffffff] p-4 rounded-[10px]">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-[36px]">{pokemon.name}</h1>
          <h1 className="text-[16px]">#{pokemon.id}</h1>
        </div>
        <div className="flex flex-row justify-center">
          <img className="w-[30%]" src={pokemon.sprites?.front_default} alt={pokemon.name} />
        </div>
        <div className="flex gap-4 mb-3 justify-center">
          {pokemon.types.map((type, index) => (
            <Badge key={index} badge={type} />
          ))}
        </div>
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
  );
}

export default function PokemonGrids({ filteredCard }) {
  return filteredCard ? (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"> 
      <PokemonCard pokemonName={filteredCard} />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* This will now correctly render multiple cards, each fetching its own random pokemon */}
      {Array.from({ length: 3 }).map((_, index) => (
        <PokemonCard key={index} />
      ))}
    </div>
  );
}