"use client"; 

import Image from "next/image";
import { SearchBar } from "./ui/SearchBar";
import Link from "next/link";

const links = [
  { title: "Deck Builder", url: "/deck-builder" },
  { title: "Battle Simulator", url: "/battle-sim" },
];

export function Header({
  searchValue, 
  setSearchValue, 
  filteredPokemon, 
  handleSearchSubmit, 
  loading, 
  error, 
  collapsible, 
  setCollapsible,
  setSelectedPokemon}) {

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
            setSelectedPokemon={setSelectedPokemon}         
        />
      </div>
    </header>
  );
}
