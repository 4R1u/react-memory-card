import './App.css'
import Card from './Card'
import { useState } from 'react';

function App() {
  const [order, setOrder] = useState(
    [
      10, 11, 12, 13,
      14, 15, 16, 17,
      18, 19, 20, 21,
      22, 23, 24, 25
    ]
  );
  
  return (
    <>
      <section id="center">
        {order.map(
          i =>
            <Card key={i} image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/${i+10}.png`} />
        )}
      </section>
    </>
  )
}

export default App
