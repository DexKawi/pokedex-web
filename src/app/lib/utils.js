import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function uppercaseWords(str) {
  return str.toUpperCase()
}

export function capitalizeWords(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


export function specifiedData(result) {
  return {
    id: result?.id || null,
    name: capitalizeWords(result?.name) || "Unknown",
    generation: result?.past_abilities?.map(g => g.generation.name) || [],
    height: result?.height || 0,
    species: result?.species?.name || result?.species || "Unknown",
    sprites: {
      front_default: result?.sprites?.front_default || null,
      back_default: result?.sprites?.back_default || null
    },
    types: result?.types?.map(type => type.type.name) || [],
    stats: result?.stats || [],
  };
}
