"use client";
import Image from "next/image";
import { capitalizeWords } from "@/app/lib/utils";
 

const badgeIcons = {
    dark: "/512px-Dark.png",
    electric: "/512px-Electric.png" ,
    fairy: "/512px-Fairy.png" ,
    fighting: "/512px-Fighting.png",
    ice: "/512px-Ice.png",
    normal: "/512px-Normal.png",
    poison: "/512px-Poison.png",
    psychic: "/512px-Psychic.png",
    rock: "/512px-Rock.png" ,
    steel: "/512px-Steel.png",
    water: "/512px-Water.png",
    grass: "/512px-Grass.png",
    ghost: "/512px-Ghost.png",
    flying: "/512px-Flying.png",
    bug: "/512px-Bug.png",
    ground: "/512px-Ground.png",
    fire: "/512px-Fire.png",
    dragon: "/512px-Dragon.png",
}

export function Badge(props){ 
    const badgeIcon = badgeIcons[props.badge];
    
    if (!badgeIcon){
        return (
            <div className="px-2 py-1 bg-gray-400 rounded text-white text-xs">
                {capitalizeWords(props.badge)}
            </div>
        );
    }

    return(
        <div className="flex items-center gap-1">
            <Image 
                src={badgeIcon}
                alt={capitalizeWords(props.badge + `-type`)}
                width={20}
                height={20}
            />
            <span className="text-xs">{capitalizeWords(props.badge)}</span>
        </div>
    )
}