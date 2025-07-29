import { useOutletContext } from "react-router-dom";

export default function Basket() {
  const { basket, setBasket } = useOutletContext();

  return (
    <div>
      <h2>Koszyk</h2>
      {basket.length === 0 ? (
        <p>Twój koszyk jest pusty.</p>
      ) : (
        <ul>
          {basket.map((book, index) => (
            <li key={index}>{book.title} — {book.price} zł</li>
          ))}
        </ul>
      )}
    </div>
  );
}