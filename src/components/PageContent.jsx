import "../styles/PageContent.scss";
import ProductCard from "./ProductCard";
import "../styles/container.scss";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router";
import ad1 from "../assets/ad1.png";
import ad2 from "../assets/ad2.png";
import ad3 from "../assets/ad3.png";

export default function PageContent({
  books,
  loading,
  selectedKind,
  setSelectedKind,
  basket,
  setBasket,
}) {
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [sortedBooks, setSortedBooks] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [insertedGenre, setInsertedGenre] = useState("");
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const { searchBar } = useOutletContext();

  const advertImages = [ad1, ad2, ad3];

  function handlePageDecrease() {
    if (numberOfPage > 0) {
      setNumberOfPage((prev) => prev - 1);
    }
  }

  function handlePageIncrease() {
    if (numberOfPage <= Math.floor(books.length / 50) - 1) {
      setNumberOfPage((prev) => prev + 1);
    }
  }

  function handleAdIndexIncrement() {
    if (currentAdIndex !== advertImages.length - 1) {
      setCurrentAdIndex((prev) => prev + 1);
    }
  }

  function handleAdIndexDecrement() {
    if (currentAdIndex !== 0) {
      setCurrentAdIndex((prev) => prev - 1);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAdIndex((prevIndex) => (prevIndex + 1) % advertImages.length);
    }, 15000);

    return () => clearInterval(interval);
  }, [advertImages.length]);

  useEffect(() => {
    let filtered = books;

    if (selectedKind !== "") {
      filtered = filtered.filter((book) => book.kind === selectedKind);
    }

    if (searchBar !== "") {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchBar.toLowerCase()) ||
          book.author.toLowerCase().includes(searchBar.toLowerCase())
      );
    }

    if (minPrice !== "" && minPrice !== null && minPrice !== undefined) {
      filtered = filtered.filter((book) => book.price >= Number(minPrice));
    }

    if (maxPrice !== "" && maxPrice !== null && maxPrice !== undefined) {
      filtered = filtered.filter((book) => book.price <= Number(maxPrice));
    }

    if (insertedGenre !== "") {
      filtered = filtered.filter((book) =>
        book.genre.toLowerCase().includes(insertedGenre.toLowerCase())
      );
    }

    setSortedBooks(filtered);
    setNumberOfPage(0);
  }, [books, selectedKind, searchBar, minPrice, maxPrice, insertedGenre]);

  return loading ? (
    <h2>Trwa wczytywanie książek</h2>
  ) : (
    <div
      className="container main-page-container"
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div className="ad-slider">
        <div
          className="images-container"
          style={{
            backgroundImage: `url(${advertImages[currentAdIndex]})`,
            backgroundPosition: "center",
            backgroundSize: "1000px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <button id="slide-left" onClick={handleAdIndexDecrement}>
            <i class="fa-solid fa-angles-left"></i>
          </button>
          <button id="slide-right" onClick={handleAdIndexIncrement}>
            <i class="fa-solid fa-angles-right"></i>
          </button>
        </div>
      </div>

      <div className="page-products">
        <div className="products-filtering">
          <p className="filtering-segment-title">Rodzaj</p>

          <div className="kind-filtering">
            <label className="kind-filtering-option">
              <input
                type="radio"
                name="kind-choice"
                value={`Liryka`}
                onChange={(e) => setSelectedKind(e.target.value)}
                checked={selectedKind === "Liryka"}
              />
              <p>Liryka</p>
            </label>
            <label className="kind-filtering-option">
              <input
                type="radio"
                name="kind-choice"
                value={"Epika"}
                onChange={(e) => setSelectedKind(e.target.value)}
                checked={selectedKind === "Epika"}
              />
              <p>Epika</p>
            </label>
            <label className="kind-filtering-option">
              <input
                type="radio"
                name="kind-choice"
                value={"Dramat"}
                onChange={(e) => setSelectedKind(e.target.value)}
                checked={selectedKind === "Dramat"}
              />
              <p>Dramat</p>
            </label>
            {selectedKind !== "" && (
              <button onClick={() => setSelectedKind("")}>Wyczyść filtr</button>
            )}
          </div>

          <div className="price-filtering">
            <p className="filtering-segment-title">Cena</p>
            <label className="price-filtering-label">
              <input
                type="number"
                placeholder="od"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="do"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </label>
          </div>

          <div className="genre-filtering">
            <p className="filtering-segment-title">Gatunek</p>
            <input
              type="text"
              placeholder="Wprowadź nazwę gatunku"
              value={insertedGenre}
              onChange={(e) => setInsertedGenre(e.target.value)}
            />
          </div>
        </div>

        <div className="products">
          {sortedBooks.map((book, index) => {
            if (
              index >= 25 * numberOfPage &&
              index <= 25 * (numberOfPage + 1) - 1
            ) {
              return (
                <ProductCard
                  book={book}
                  key={index}
                  basket={basket}
                  setBasket={setBasket}
                />
              );
            }
          })}
        </div>
      </div>
      <div className="page-buttons-container">
        {numberOfPage > 0 && (
          <button className="page-button" onClick={handlePageDecrease}>
            Poprzednia strona
          </button>
        )}
        {numberOfPage <= Math.floor(sortedBooks.length / 50) - 1 && (
          <button className="page-button" onClick={handlePageIncrease}>
            Następna strona
          </button>
        )}
      </div>
    </div>
  );
}
