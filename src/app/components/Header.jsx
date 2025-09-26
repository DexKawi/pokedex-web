"use client";

import Image from "next/image"
import { MultiSelectDropdown } from "./ui/Dropdown";

function Header(){
    return (
    <header className="flex gap-10 items-center">
        <Image 
            src="/pokemon-logo.png"
            width={100}
            height={100}
            alt="pokemon-logo"/>
    </header>
    )
}

export { Header };