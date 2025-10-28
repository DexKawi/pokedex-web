"use client";

import Image from "next/image"
import { SearchBar } from "./ui/SearchBar";
import Link from "next/link";
import { useState } from "react";

const links = [{
    title: "Pokemons",
    url: "/characters"
},{
    title: "Battle Simulator",
    url: "/battle-sim"
}];


export function Header(){
    
    return (
    <header className="flex flex-row gap-4 justify-between bg-white p-4 fixed w-full top-0 left-0 z-0">
        <div className="flex flex-row gap-10 items-center">
            <div>
                <Image 
                    src="/pokemon-logo.png"
                    width={100}
                    height={100}
                    alt="pokemon-logo"/>
            </div>
            <div className="flex flex-row gap-10">
                {links.map((link, index) => {
                return (
                <div key={index}>
                    <Link href={link.url}>{link.title}</Link>
                </div>
                );
                })}
            </div>
        </div>
        <div>
            <SearchBar/>
        </div>
    </header>
    )
};
