import "./App.css";
import Card from "./Card";
import { useState } from "react";

function App() {
  const [order, setOrder] = useState([
    379, 380, 381, 382, 383, 384, 385, 386, 387, 388, 389, 390, 391, 392, 393,
    394,
  ]);

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
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i}.png`}
          />
        ))}
      </section>
    </>
  );
}

export default App;
