"use client";

import React, { useState } from 'react'
import { Header } from '../components/Header'
import PokemonGrids from '../components/PokemonCard'

export default function Page(){
    const [selectedPokemon, setSelectedPokemon] = useState(null);

    const handlePokemonSelect = (pokemonName) => {
        setSelectedPokemon(pokemonName);
    };

    return (
        <div className="pt-12">
            <Header onPokemonSelect={handlePokemonSelect}/>
            <PokemonGrids selectedPokemon={selectedPokemon}/>
        </div>
    )
}