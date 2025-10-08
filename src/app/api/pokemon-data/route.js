import { NextResponse } from "next/server";
import { capitalizeWords } from "@/app/lib/utils";

const POKE_API = process.env.POKE_API;
const MAX_GENERATED_NUMBER = 1010;

export async function GET(){
  try {
    if (!POKE_API){
      return NextResponse.json({message: "Environment variables unavailable or set incorrectly"}, {status: 500});  
    }
    
    const randomID = Math.floor(Math.random() * MAX_GENERATED_NUMBER) + 1;
    
    const randomPokemonURL = `${POKE_API}/pokemon/${randomID}`;
 
    const response = await fetch(randomPokemonURL, {
      signal: AbortSignal.timeout(5000)
    });

    if(!response.ok){
      return NextResponse.json({message: "No response from the server."}, {status: 502});
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
      types: result?.types?.map(t => t.type.name) || ["Unknown"],
      stats: result?.stats || []
    };

    console.log(displayedData.types)
    return NextResponse.json(displayedData);
    } catch(error) {
      if(error.name === "TimeoutError"){
        return NextResponse.json({
          message: "PokeAPI is taking too long to respond!"
        }, {status: 408})
      }
    return NextResponse.json({message: "Fetching Pokemons failed!"}, {status: 502})
  };
};