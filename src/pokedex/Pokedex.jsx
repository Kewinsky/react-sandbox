import React, { useEffect, useState } from "react";
import "./Pokedex.css";

const API_URL = "https://pokeapi.co/api/v2/pokemon";

const Pokedex = () => {
  const [pokemons, setPokemons] = useState([]);

  const getPokemons = async () => {
    const response = await fetch(API_URL);

    const listOfPokemons = await response.json();

    getPokemonDetails(listOfPokemons.results);
  };

  const getPokemonDetails = async (pokemons) => {
    const pokemonsWithDetails = [];
    for (const pokemon of pokemons) {
      const response = await fetch(API_URL + `/${pokemon.name}`);
      const result = await response.json();
      pokemonsWithDetails.push(result);
    }
    setPokemons(pokemonsWithDetails);
  };

  useEffect(() => {
    getPokemons();
    console.log(pokemons);
  }, []);

  return (
    <div>
      {pokemons.map((pokemon, i) => (
        <p key={i}>{pokemon.name}</p>
      ))}
    </div>
  );
};

export default Pokedex;
