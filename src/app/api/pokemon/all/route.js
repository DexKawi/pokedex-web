import { NextResponse } from "next/server";

const POKE_API = process.env.POKE_API;
const MAX_POKEMON_COUNT = 1010;

export async function GET() {
  try {
    const allPokemonURL = `${POKE_API}/pokemon?limit=${MAX_POKEMON_COUNT}`;

    const response = await fetch(allPokemonURL);

    if (!response.ok) {
      throw new Error("Failed to fetch the list of Pokémon from the server.");
    }

    const data = await response.json();

    const pokemonList = data.results;

    return NextResponse.json(pokemonList);

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch Pokémon list.", error: error.message },
      { status: 500 }
    );
  }
}