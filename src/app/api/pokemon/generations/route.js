// app/api/pokemon/generations/route.js
import { NextResponse } from "next/server";

const POKE_API = process.env.POKE_API;

export async function GET() {
  try {
    const response = await fetch(`${POKE_API}/generation`);

    if (!response.ok) {
      throw new Error("Failed to fetch generations from the server.");
    }

    const data = await response.json();

    const generations = data.results;

    return NextResponse.json(generations);

  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch generations.", error: error.message },
      { status: 500 }
    );
  }
}