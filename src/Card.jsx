function Card({ image, callback }) {
  return (
    <div className="card" onClick={callback}>
      <img src={image}></img>
    </div>
  );
}

export default Card;