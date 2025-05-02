import { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Loader from './components/Loader'; 

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [selectedType, setSelectedType] = useState(""); 
  const [types, setTypes] = useState([]); 
  const [error, setError] = useState(null); // ✅ Error state

  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon?limit=150")
      .then((response) => {
        const pokemonDetailsPromises = response.data.results.map((pokemon) =>
          axios.get(pokemon.url)
        );

        Promise.all(pokemonDetailsPromises)
          .then((results) => {
            const detailedPokemons = results.map((res) => res.data);
            setPokemons(detailedPokemons);
            setFilteredPokemons(detailedPokemons); 

            const allTypes = detailedPokemons.flatMap((pokemon) => 
              pokemon.types.map((typeObj) => typeObj.type.name)
            );
            setTypes([...new Set(allTypes)]); 
            setLoading(false); 
          })
          .catch((error) => {
            console.error("Error fetching detailed Pokémon data:", error);
            setError("Oops! Failed to load detailed Pokémon data.");
            setLoading(false); 
          });
      })
      .catch((error) => {
        console.error("Error fetching Pokémon list:", error);
        setError("Oops! Something went wrong. Please try again later.");
        setLoading(false); 
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  useEffect(() => {
    let filtered = pokemons;

    if (searchQuery) {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedType) {
      filtered = filtered.filter((pokemon) =>
        pokemon.types.some((typeObj) => typeObj.type.name === selectedType)
      );
    }

    setFilteredPokemons(filtered);
  }, [searchQuery, selectedType, pokemons]);

  return (
    <div className="App font-sans bg-gray-100 min-h-screen">
      
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-3xl font-bold">Pokémon Explorer</h1>
      </header>

      <div className="container mx-auto p-4">
      
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search Pokémon..."
            className="border p-2 rounded w-full md:w-3/4"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <select
            className="border p-2 rounded w-full md:w-1/4"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <option value="">Filter by Type</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* ✅ Error Display */}
        {error && (
          <div className="text-red-500 text-center my-4">
            {error}
          </div>
        )}

        {/* ✅ Loader */}
        {loading ? (
          <Loader /> 
        ) : (
          <>
            {filteredPokemons.length === 0 ? (
              <p className="text-center">No Pokémon found</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredPokemons.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
