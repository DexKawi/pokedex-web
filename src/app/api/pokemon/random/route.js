import { NextResponse } from "next/server";
import { capitalizeWords } from "@/app/lib/utils";

const POKE_API = process.env.POKE_API;

export async function GET() {
  const CARD_PER_PAGE = 6

  try {
    if (!POKE_API) {
      return NextResponse.json({ message: "Environment variables unavailable or set incorrectly" }, { status: 500 });
    }

    let pageNumber = 1;
    let offset = ((pageNumber - 1) * (CARD_PER_PAGE + 1) - 1);
    const pageOffsets = await fetch(`${POKE_API}/pokemon?offset=${offset}&limit=${CARD_PER_PAGE}`);
    const pageOffsetsResult = await pageOffsets.json()

    const pageOffsetStructure = {
      count: pageOffsetsResult.count,
      next: pageOffsetsResult.next,
      previous: pageOffsetsResult.previous,
      results: pageOffsetsResult.results.map((res) => ({
        name: res.name,
        url: res.url
      }))
    }

    console.log(pageOffsetStructure)

    if (!response.ok) {
      return NextResponse.json({ message: "No response from the server." }, { status: 502 });
    }

    const result = await response.json();
    const displayedData = {
      id: result?.id || null,
      name: capitalizeWords(result?.name) || "Unknown",
      generation: result?.past_abilities.map(g => g.generation.name) || [],
      height: result?.height || 0,
      species: result?.species?.name || result?.species || "Unknown",
      sprites: {
        front_default: result?.sprites.front_default || null,
        back_default: result?.sprites.back_default || null
      },
      types: result?.types?.map(type => type.type.name) || [],
      stats: result?.stats || [],
    };

    console.log(displayedData)
    return NextResponse.json(displayedData);

  } catch (error) {
    if (error.name === "TimeoutError") {
      return NextResponse.json(
        { message: "PokeAPI is taking too long to respond!" },
        { status: 408 }
      )
    }
    return NextResponse.json(
      { message: "Fetching Pokemons failed!" },
      { status: 502 }
    )
  };
};