"use client";

import React, { useState, useEffect} from 'react'
import { Header } from '../components/Header'
import PokemonGrids from '../components/PokemonCard'
import { usePokemonList } from '../hooks/usePokemonList';

export default function Page(){
    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [collapsible, setCollapsible] = useState(false);
    const [selectedPokemon, setSelectedPokemon] = useState("");

    const { pokemonList: allPokemon, error, loading } = usePokemonList();

    useEffect(() => {
        if (searchValue && allPokemon) {
        const results = allPokemon.filter((p) =>
            p.name.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredPokemon(results);
        setCollapsible(true);
        } else {
        setFilteredPokemon([]);
        setCollapsible(false);
        }
    }, [searchValue, allPokemon]);

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (filteredPokemon.length > 0) {
        console.log("Searching for:", filteredPokemon[0].name);
        alert(`You searched for ${filteredPokemon[0].name}`);
        }
    };

    return (
        <div className="pt-12">
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                filteredPokemon={filteredPokemon}
                handleSearchSubmit={handleSearchSubmit}
                collapsible={collapsible}
                setCollapsible={setCollapsible}
                setSelectedPokemon={setSelectedPokemon}
                loading={loading}
                error={error}/>
            <PokemonGrids filteredCard={selectedPokemon}/>
        </div>
    )
}