import Form from "next/form";

export function SearchBar({
  searchValue,
  setSearchValue,
  filteredPokemon,
  handleSearchSubmit,
  collapsible,
  setCollapsible,
  setSelectedPokemon,
  loading,
  error
}) {
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
      </Form>

      {error && <p className="text-red-500 mt-2">Error: {error}</p>}

      {filteredPokemon.length > 0 && collapsible && (
        <ul className="absolute top-full mt-1 w-full bg-white dark:bg-gray-700 border border-gray-300 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {filteredPokemon.map((p) => (
            <li
              key={p.name}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
              onClick={() => {
                setSearchValue(p.name);
                setSelectedPokemon(p.name); 
                setCollapsible(false);
              }}
            >
              {p.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
