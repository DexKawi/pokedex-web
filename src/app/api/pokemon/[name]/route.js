import { NextResponse } from "next/server";
import { capitalizeWords } from "@/app/lib/utils";

const POKE_API = process.env.POKE_API;

export async function GET(request, { params }) {
  try {
    const { name } = await params;
    
    if (!POKE_API) {
      return NextResponse.json({
        message: "Environment variables unavailable or set incorrectly"
      }, { status: 500 });  
    }
    
    const pokemonURL = `${POKE_API}/pokemon/${name.toLowerCase()}`;
 
    const response = await fetch(pokemonURL, {
      signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: "Pokemon not found" }, 
        { status: 404 }
      );
    }
    
    const result = await response.json();
    const displayedData = {
      id: result?.id || null,
      name: capitalizeWords(result?.name) || "Unknown",
      height: result?.height || 0,
      species: result?.species?.name || result?.species || "Unknown",
      sprites: {
        front_default: result?.sprites.front_default || null,
        back_default: result?.sprites.back_default || null
      },
      types: result?.types?.map(t => t.type.name) || [],
      stats: result?.stats || []
    };

    return NextResponse.json(displayedData);
  } catch (error) {
    if (error.name === "TimeoutError") {
      return NextResponse.json({
        message: "PokeAPI is taking too long to respond!"
      }, { status: 408 });
    }
    return NextResponse.json({
      message: "Fetching Pokemon failed!"
    }, { status: 502 });
  }
}