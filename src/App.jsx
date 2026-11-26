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
}

function App() {
  const [order, setOrder] = useState(preset_order);

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

  function randomize() {
    setOrder(shuffle(order));
  }

  return (
    <>
      <section id="center">
        {order.map((i) => (
          <Card
            key={i}
            callback={randomize}
            image={pokes[i]["image"]}
            name={pokes[i]["name"]}
          />
        ))}
      </section>
    </>
  );
}

export default App;
