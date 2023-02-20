import React, { useEffect, useState } from "react";
import { Card, card } from "react-bootstrap";

function PokemonCard({ url, name }) {
  const [Pokemon, setPokemon] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getOnePokemon() {
    const response = await fetch(`${url}`);
    const data = await response.json();
    setPokemon(data);
    setIsLoading(false);
    // console.log(data);
  }

  useEffect(() => {
    getOnePokemon();
  }, []);
  // console.log(Pokemon.abilites.map((ability) => ability.ability.name));
  return (
    !isLoading && (
      <div>
        <div className="mb-3">
          <Card style={{ width: "15rem", height: "350px" }} bg="light">
            <Card.Img src={Pokemon.sprites.front_default}></Card.Img>
            <Card.Title>{name}</Card.Title>
            <ul>
              <Card.Text as="div" className="text-capitalize">
                {Pokemon.abilities.map((ability, i) => {
                  return <li key={i}>{ability.ability.name}</li>;
                })}
              </Card.Text>
            </ul>
          </Card>
        </div>
      </div>
    )
  );
}

export { PokemonCard };
