import { 
    Search, 
    ChevronDown,
    ChevronUp
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePokemonList } from "@/app/hooks/usePokemonList";
import Form from "next/form";

export function SearchBar({ onPokemonSelect }) {
    const sortByDropdowns = ["A-Z", "Z-A"];
    
    const [searchValue, setSearchValue] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const [dropdownValue, setDropdownValue] = useState(sortByDropdowns[0])
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    
    const { pokemonList: allPokemon, error, loading } = usePokemonList();

    useEffect(() => {
    if (searchValue && allPokemon) {
        // 1. Filter the results
        const results = allPokemon.filter(p =>
             p.name.toLowerCase().includes(searchValue.toLowerCase())
        );

        // 2. Sort the filtered results
        const sortedResults = [...results].sort((a, b) => {
            if (dropdownValue === "A-Z") {
                return a.name.localeCompare(b.name); // A-Z
            } else {
                return b.name.localeCompare(a.name); // Z-A
            }
        });

        setFilteredPokemon(sortedResults);
    } else {
        setFilteredPokemon([]);
        if (onPokemonSelect && !searchValue) {
            onPokemonSelect(null);
        }
    }
    
    // 3. Add dropdownValue to the dependency array
    }, [searchValue, allPokemon, dropdownValue]);

    const handleSearchSubmit = (e) => {
        e.preventDefault(); 
        if (filteredPokemon.length > 0) {
            handleSelectPokemon(filteredPokemon[0].name);
        }
    }

    const handleSelectPokemon = (pokemonName) => {
        setSearchValue(pokemonName);
        setFilteredPokemon([]);
        if (onPokemonSelect) {
            onPokemonSelect(pokemonName);
        }
    }

    const handleOpenDropdown = () => {
        setDropdownOpen(true);
    }

    return (
        <div className="relative flex flex-1 flex-col">
            <Form
                onSubmit={handleSearchSubmit}
                className="border border-[#a1a1a1] rounded-xl p-2 flex flex-row gap-4 flex-1 bg-white dark:bg-gray-800"
            >
                    <Search width={20} height={20}/>
                    <input
                        type="text"
                        placeholder={loading ? "Loading Pokemon..." : "Search Pokemon..."}
                        className="focus:outline-none flex-1 bg-transparent"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        disabled={loading}
                    />
                    <div className="flex items-center gap-3 relative">
                        <div className="border-l pl-2">
                            <span className="text-[12px] text-[#808080]"><p>Sort by</p></span>
                            <p>{dropdownValue}</p>
                        </div>
                        {!dropdownOpen ? <ChevronDown onClick={handleOpenDropdown}/> : <ChevronUp onClick={() => setDropdownOpen(false)}/>}
                        <div>
                        {dropdownOpen && ( 
                            <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg z-20">
                                <ul>
                                    {sortByDropdowns.map((options) =>(
                                        <li 
                                            key={options}
                                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                                            onClick={() => {
                                                setDropdownOpen(false);
                                                setDropdownValue(options)
                                            }}>
                                            
                                            {options}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>                        
                </div>
            </Form>

            {error && <p className="text-red-500 mt-2">Error: {error}</p>}

            {filteredPokemon.length > 0 && (
                <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
                    {filteredPokemon.map((p) => (
                        <li
                            key={p.name}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                            onClick={() => handleSelectPokemon(p.name)}

                        >
                            {p.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}