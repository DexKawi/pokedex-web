"use client";

import Image from "next/image"
import Link from "next/link";
import { MultiSelectDropdown } from "./ui/Dropdown";
import { SearchBar } from "./ui/SearchBar";


function Header(){
    return (
    <header className="flex gap-10 items-center">
        <Image 
            src="/pokemon-logo.png"
            width={100}
            height={100}
            alt="pokemon-logo"/>
        <MultiSelectDropdown></MultiSelectDropdown>
        <SearchBar/>
    </header>
    )
}

export { Header };