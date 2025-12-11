import { NextResponse } from "next/server";

export async function GET() {
    const POKE_API = process.env.POKE_API;

    try {
        if (!POKE_API) {
            throw new Error("File .env tidak diinsialisasi dengan benar!");
        }

        const response = await fetch(`${POKE_API}`);

        if (!response.ok) {
            throw new Error("Tidak ada respons dari server!");
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }
}
