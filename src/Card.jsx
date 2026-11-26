function Card({ image, callback, name }) {
  return (
    <div className="card" onClick={callback}>
      <img src={image}></img>
      <p>{name}</p>
    </div>
  );
}

export default Card;
