"use client";

import Image from "next/image";
import { SearchBar } from "./ui/SearchBar";
import Link from "next/link";
import { Dropdown } from "./ui/Dropdown";

const links = [
  { title: "Deck Builder", url: "/deck-builder" },
  { title: "Battle Simulator", url: "/battle-sim" },
];

export function Header({
  searchValue,
  setSearchValue,
  filteredPokemon,
  handleSearchSubmit,
  dropdownValue,
  loading,
  error,
  collapsible,
  setCollapsible,
  setSelectedPokemon,
  setDropdownValue }) {

  return (
    <header className="bg-white w-full fixed top-0 left-0 z-[999]">
      <div className="max-w-7xl mx-auto px-4 p-4">
        <div className="flex flex-row gap-4 justify-between w-full">
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
        </div>
        <br></br>
        <Dropdown
          dropdownValue={dropdownValue}
          setDropdownValue={setDropdownValue}
        />
      </div>
    </header>
  );
}
