import "./App.css";
import Card from "./Card";
import { useState } from "react";

const preset_order = [
  379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393,
  394,
];

const pokes = {};
for (var i of preset_order) {
  const obj = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
    .then((result) => result.json())
    .then((result) => result);

  pokes[i] = { name: obj["name"], image: obj["sprites"]["front_default"] };
  // make registeel shiny just because
  if ("registeel" == pokes[i]["name"].toLowerCase())
    pokes[i]["image"] = obj["sprites"]["front_shiny"];
}

function App() {
  const [order, setOrder] = useState(preset_order);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState({});

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
      setScore(score + 1);
      setClicked({ ...clicked, [i]: true });
    } else {
      setScore(0);
      setClicked({});
    }
    setOrder(shuffle(order));
  }

  return (
    <>
      <p>Score: {score}</p>
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
