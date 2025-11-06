"use client"; 

import Image from "next/image";
import { SearchBar } from "./ui/SearchBar";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePokemonList } from "@/app/hooks/usePokemonList";

const links = [
  { title: "Pokemons", url: "/characters" },
  { title: "Battle Simulator", url: "/battle-sim" },
];

export function Header(
  searchValue, 
  setSearchValue, 
  filteredPokemon, 
  handleSearchSubmit, 
  loading, 
  error, 
  collapsible, 
  setCollapsible) {
  // const [searchValue, setSearchValue] = useState("");
  // const [filteredPokemon, setFilteredPokemon] = useState([]);
  // const [collapsible, setCollapsible] = useState(false)

  // const { pokemonList: allPokemon, error, loading } = usePokemonList();

  // useEffect(() => {
  //   if (searchValue && allPokemon) {
  //     const results = allPokemon.filter((p) =>
  //       p.name.toLowerCase().includes(searchValue.toLowerCase())
  //     );
  //     setFilteredPokemon(results);
  //     setCollapsible(true);
  //   } else {
  //     setFilteredPokemon([]);
  //     setCollapsible(false);
  //   }
  // }, [searchValue, allPokemon]);

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (filteredPokemon.length > 0) {
  //     console.log("Searching for:", filteredPokemon[0].name);
  //     alert(`You searched for ${filteredPokemon[0].name}`);
  //   }
  // };

  return (
    <header className="flex flex-row gap-4 justify-between bg-white p-4 fixed w-full top-0 left-0 z-0">
      <div className="flex flex-row gap-10 items-center">
        <Image 
          src="/pokemon-logo.png"
          width={100}
          height={100}
          alt="pokemon-logo"
        />
        <div className="flex flex-row gap-10">
          {links.map((link, index) => (
            <div key={index}>
              <Link href={link.url}>{link.title}</Link>
            </div>
          ))}
        </div>
      </div>
      <div>
        <SearchBar
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            filteredPokemon={filteredPokemon}
            handleSearchSubmit={handleSearchSubmit}
            loading={loading}
            error={error}
            collapsible={collapsible}               
            setCollapsible={setCollapsible}         
        />
      </div>
    </header>
  );
}
