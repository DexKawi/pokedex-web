import { NextResponse } from "next/server";

const POKE_API = process.env.POKE_API;

export async function GET(){
  try {
    if (!POKE_API){
      return NextResponse.json({message: "Environment variables unavailable or set incorrectly"}, {status: 500});  
    }
    
    const response = await fetch(POKE_API);

    if(!response.ok){
      return NextResponse.json({message: "No response from the server."}, {status: 502});
    }
    
    const result = await response.json();
    const displayedData = {
      id: result?.id || null,
      name: result?.name || "Unknown",
      height: result?.height || 0,
      species: result?.species?.name || result?.species || "Unknown"
    };
    
    return NextResponse.json(displayedData);
    } catch(error) {
    return NextResponse.json({message: "Fetching Pokemons failed!"}, {status: 502})
  };
};