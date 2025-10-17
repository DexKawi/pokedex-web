import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import { usePokemonList } from "@/app/hooks/usePokemonList";
import Image from "next/image";
import Form from "next/form";

export function SearchBar() {
    const [searchValue, setSearchValue] = useState("");
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    
    const { pokemonList: allPokemon, error, loading } = usePokemonList();

    useEffect(() => {
        if (searchValue && allPokemon) {
            const results = allPokemon.filter(p =>
                p.name.toLowerCase().includes(searchValue.toLowerCase())
            );
            setFilteredPokemon(results);
        } else {
            setFilteredPokemon([]);
        }
    }, [searchValue, allPokemon]);

    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
        if (filteredPokemon.length > 0) {
            console.log("Searching for:", filteredPokemon[0].name);
            alert(`You searched for ${filteredPokemon[0].name}`);
        }
    }

    return (
        <div className="relative flex flex-1 flex-col">
            <Form
                onSubmit={handleSearchSubmit}
                className="border border-[#a1a1a1] rounded-sm p-2 flex flex-row gap-4 flex-1 bg-white dark:bg-gray-800"
            >
                <input
                    type="text"
                    placeholder={loading ? "Loading Pokemon..." : "Search Pokemon..."}
                    className="focus:outline-none flex-1 bg-transparent"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    disabled={loading}
                />
                <button
                    type="submit"
                    className="flex flex-row bg-[#222222] text-white p-2 gap-2 rounded-sm items-center"
                >
                    <Search size={20} /> Search
                </button>
            </Form>

            {error && <p className="text-red-500 mt-2">Error: {error}</p>}

            {filteredPokemon.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {filteredPokemon.map((p, index) => (
                        <li
                            key={index}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                            onClick={() => {
                                // When a user clicks an item, set it as the search value and clear the dropdown
                                setSearchValue(p.name);
                                setFilteredPokemon([]);
                            }}
                        >
                            {/* <div><Image src={p.sprites.front_default}/></div> */}
                            {console.log(p.sprites)}
                            {p.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
