"use client";

import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'

export default function Page() {

    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [collapsible, setCollapsible] = useState(false);
    const [dropdownValue, setDropdownValue] = useState("Generation")


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


    return (
        <div className="pt-12">
            <Header
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                filteredPokemon={filteredPokemon}
                handleSearchSubmit={handleSearchSubmit}
                collapsible={collapsible}
                dropdownValue={dropdownValue}
                setCollapsible={setCollapsible}
                setDropdownValue={setDropdownValue}
                loading={loading}
                error={error} />
        </div>
    )
}
