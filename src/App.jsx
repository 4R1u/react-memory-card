import "./App.css";
import Card from "./Card";
import { useState } from "react";
import { useEffect } from "react";

const NUM_CARDS = 16;
const TOTAL_POKEMON = 1025;
const FIRST_ORDER = [
  379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393,
  394,
];
const pokes = {};

for (var i of FIRST_ORDER) {
  const obj = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((result) => result.json())
    .then((result) => result);

  pokes[i] = {
    name: obj["name"],
    image: obj["sprites"]["front_default"],
  };
  // make registeel shiny just because
  if ("registeel" == pokes[i]["name"].toLowerCase())
    pokes[i]["image"] = obj["sprites"]["front_shiny"];
}

function App() {
  const [presetOrder, setPresetOrder] = useState(FIRST_ORDER);
  const [order, setOrder] = useState(presetOrder);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [clicked, setClicked] = useState({});
  const [wait, setWait] = useState(false);

  useEffect(() => {
    async function refetchPokemon() {
      const innerFunc = async function () {
        for (var i of presetOrder) {
          if (pokes[i])
            // use pokes as "cache" to minimize fetches
            continue;

          const obj = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            .then((result) => result.json())
            .then((result) => result);

          pokes[i] = {
            name: obj["name"],
            image: obj["sprites"]["front_default"],
          };

          // make registeel shiny just because
          if ("registeel" == pokes[i]["name"].toLowerCase())
            pokes[i]["image"] = obj["sprites"]["front_shiny"];
        }
      };

      setWait(true);
      await innerFunc();
      setOrder(presetOrder);
      setWait(false);
    }

    refetchPokemon();
  }, [presetOrder]);

  function shuffle(oldArray) {
    var array = [];
    for (var i in oldArray) array[i] = oldArray[i];

    let currentIndex = array.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  function newOrder(i) {
    if (undefined === clicked[i]) {
      const newScore = score + 1;
      setScore(newScore);
      setHighScore((highScore) => Math.max(highScore, newScore));
      setClicked({ ...clicked, [i]: true });
      if (newScore % NUM_CARDS == 0) {
        // got through all cards, fetch more
        const renewed = [];
        const start =
          Math.floor(Math.random() * (TOTAL_POKEMON - NUM_CARDS)) + 1;
        const end = start + 16;
        for (var i = start; i < end; ++i) renewed.push(i);
        setPresetOrder(renewed);
        setClicked({});
      }
    } else {
      setScore(0);
      setClicked({});
    }
    setOrder(shuffle(order));
  }

  return (
    <>
      <p>Score: {score}</p>
      <p>Highscore: {highScore}</p>
      {wait ? <p>WAIT: New Pokemon loading...</p> : null}
      <section id="center">
        {order.map((i) => (
          <Card
            key={i}
            callback={(e) => newOrder(i)}
            image={pokes[i]["image"]}
            name={pokes[i]["name"]}
          />
        ))}
      </section>
    </>
  );
}

export default App;
