function Card({ image, callback, name }) {
  return (
    <button className="card" onClick={callback}>
      <img src={image}></img>
      <p>{name}</p>
    </button>
  );
}

export default Card;
