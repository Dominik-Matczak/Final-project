import "../styles/ProductCard.scss";

export default function ProductCard({ book, basket, setBasket }) {
  const { title, author, price, kind, genre } = book;

  const addItemsToTheBasket = (e) => {
    e.preventDefault();
    setBasket((prev) => [...prev, book]);
  };

  return (
    <div className="product-card">
      <div className="product-card-img">
        <img
          src={`https://wolnelektury.pl/media/${book.cover}`}
          alt={book.title}
        />
      </div>

      <ul>
        <li>
          <span>{title}</span>
        </li>
        <li>
          <p>{author}</p>
        </li>
        <li>
            <p>{kind}</p>
        </li>
        <li className="genre-list-item">
            <p>{genre}</p>
        </li>
      </ul>

      <div className="product-card-action-box">
        <ul>
          <li><p>Nowość!</p></li>
          <li>
            <strong>{price} zł</strong>
          </li>
          <li>Stan: nowy</li>
          <li>
            <i>Dostawa w 3-5 dni</i>
          </li>
          <li className="delivery-option-box">
                <img src="src/assets/dhl.png" alt="" />
                <img src="src/assets/dpd.png" alt="" />
                <img src="src/assets/inpost.png" alt="" />
          </li>
          <li>
          </li>
        </ul>
        <button onClick={addItemsToTheBasket}>Dodaj do koszyka</button>
      </div>
    </div>
  );
}
