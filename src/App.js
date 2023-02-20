import React, { useEffect, useState } from "react";
import { Navigation } from "./components/Navigation";
import { PokemonCard } from "./components/PokemonCard";
import { Card, Container, Form, InputGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";

const LIMIT = 150;
const pokeApi = `https://pokeapi.co/api/v2/pokemon/?limit=${LIMIT}`;

function App() {
  const [apiData, setApiData] = useState([]);
  const [pokemonFiltered, setPokemonFiltered] = useState([]);

  async function getPokemon(route) {
    const response = await fetch(`${pokeApi}${route}`);
    const data = await response.json();
    setApiData(data.results);
    setPokemonFiltered(data.results);
    console.log(true);
  }

  useEffect(() => {
    getPokemon(apiData);
  }, []);

  const handleChange = (event) => {
    const value = event.target.value;
    const regex = new RegExp(value, "gi");
    const filtered = apiData.filter((pokemon) => {
      return pokemon.name.match(regex);
    });
    console.log("filtered");
    setPokemonFiltered(filtered);
  };

  // console.log(pokemonFiltered);
  // console.log(pokemonFiltered.map((pokemon) => console.log(pokemon.name)));

  return (
    <div data-testid="app">
      <Navigation />
      <InputGroup onChange={handleChange}>
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          placeholder="Search Pokemon"
          aria-label="Search Pokemon"
          aria-describedby="basic-addon1"
        />
      </InputGroup>
      <h1>Pokemon should appear here</h1>
      <div className="container">
        <div className="row">
          {pokemonFiltered.map((pokemon, i) => (
            <div key={i} className="d-flex justify-content-center">
              <PokemonCard key={i} name={pokemon.name} url={pokemon.url} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// const PokemonCard = (props) => {
//   const handlePokemonClicked = (event) => {
//     alert(props.pokemon);
//     console.log(event);
//   };
//   return;
//   <>
//     <p onClick={handlePokemonClicked}>This is {props.name} pokemon card</p>;
//     <p onClick={handlePokemonClicked}>
//       This is {props.url} pokemon card address
//     </p>
//   </>;
// };

export { App };
