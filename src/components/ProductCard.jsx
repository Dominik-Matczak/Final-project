import '../styles/ProductCard.scss'

export default function ProductCard({ book, basket, setBasket }) {

    const { title, author, price } = book;

    const addItemsToTheBasket = (e) => {
        e.preventDefault();
        setBasket((prev) => [...prev, book])
        console.log(basket);
    }

    return (
        
        <div className="product-card">
                        <div className="product-card-img">
                            <img src={`https://wolnelektury.pl/media/${book.cover}`} alt={book.title} />
                        </div>
                        <div className="product-card-content">
                            
                            <ul>
                                <li><span>{title}</span></li>
                                <li><p>{author}</p></li>
                                <li><strong>{`Cena produktu: ${price} zł`}</strong></li>
                                <li><button onClick={addItemsToTheBasket}>Dodaj do koszyka</button></li>
                            </ul>
                        </div>

        </div>
    
    )
}