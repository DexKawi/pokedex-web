"use client";
import Image from "next/image";
import { capitalizeWords } from "@/app/lib/utils";
 
// const badgeIcons = {
//     dark: <Image src="/512px-Dark.png" alt="dark-type" width={20} height={20}></Image>,
//     electric: <Image src="/512px-Electric.png" alt="electric-type" width={20} height={20}></Image>,
//     fairy: <Image src="/512px-Fairy.png" alt="fairy-type" width={20} height={20}></Image>,
//     fighting: <Image src="/512px-Fighting.png" alt="fighting-type" width={20} height={20}></Image>,
//     ice: <Image src="/512px-Ice.png" alt="ice-type" width={20} height={20}></Image>,
//     normal: <Image src="/512px-Normal.png" alt="normal-type" width={20} height={20}></Image>,
//     poison: <Image src="/512px-Poison.png" alt="poison-type" width={20} height={20}></Image>,
//     psychic: <Image src="/512px-Psychic.png" alt="psychic-type" width={20} height={20}></Image>,
//     rock: <Image src="/512px-Rock.png" alt="rock-type" width={20} height={20}></Image>,
//     steel: <Image src="/512px-Steel.png" alt="steel-type" width={20} height={20}></Image>,
//     water: <Image src="/512px-Water.png" alt="water-type" width={20} height={20}></Image>,
// }

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