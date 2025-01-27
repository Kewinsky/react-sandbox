import { useEffect, useState } from "react";

const API = "https://pokeapi.co/api/v2/pokemon/ditto";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const fetchPokemnos = async () => {
    const response = await fetch(API);
    const result = await response.json();
    console.log(result);
  };

  useEffect(() => {
    fetchPokemnos();
  }, []);
  return <div>Pokedex</div>;
};

export default Pokedex;
