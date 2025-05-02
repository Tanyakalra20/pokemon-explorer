function PokemonCard({ pokemon }) {
  return (
    <div className="border p-4 rounded shadow-md bg-white text-center">
      <h2 className="text-lg font-bold capitalize">{pokemon.name}</h2>
      <p className="text-sm text-gray-500">ID: #{pokemon.id}</p>
      <img
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto my-2"
      />
      <div className="flex justify-center gap-2">
        {pokemon.types.map((typeObj) => (
          <span
            key={typeObj.type.name}
            className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs capitalize"
          >
            {typeObj.type.name}
          </span>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
