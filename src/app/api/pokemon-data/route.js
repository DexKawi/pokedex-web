import { NextResponse } from "next/server";

const POKE_API = process.env.POKE_API;

function capitalizedPokemonName(str){
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function getPokemonType(id){
  try {
    const parts = POKE_API.split('/');
    parts[parts.length - 1] = 'move'; // Replace last element
    const movesUrl = parts.join('/') + `/${id}`;

    const response = await fetch(movesUrl, {
      signal: AbortSignal.timeout(5000)
    });
    const result = await response.json()
    return result?.type?.name || "Unknown";
  } catch(error){
    if(error.name === "SyntaxError"){
      return "Unknown type!";
    };
  }
};

export async function GET(){
  try {
    if (!POKE_API){
      return NextResponse.json({message: "Environment variables unavailable or set incorrectly"}, {status: 500});  
    }
    
    const randomID = Math.floor(Math.random() * 1010) + 1;
    
    const randomPokemonURL = `${POKE_API}/${randomID}`;
 
    const response = await fetch(randomPokemonURL, {
      signal: AbortSignal.timeout(5000)
    });

    if(!response.ok){
      return NextResponse.json({message: "No response from the server."}, {status: 502});
    }
    
  
    const result = await response.json();
    const displayedData = {
      id: result?.id || null,
      name: capitalizedPokemonName(result?.name) || "Unknown",
      height: result?.height || 0,
      species: result?.species?.name || result?.species || "Unknown",
      sprites: {
        front_default: result?.sprites.front_default || null,
        back_default: result?.sprites.back_default || null
      },
      type: await getPokemonType(randomID) || "Unknown"
    };

    return NextResponse.json(displayedData);
    } catch(error) {
      console.log(error.name);
      if(error.name === "TimeoutError"){
        return NextResponse.json({
          message: "PokeAPI is taking too long to respond!"
        }, {status: 408})
      }
    return NextResponse.json({message: "Fetching Pokemons failed!"}, {status: 502})
  };
};