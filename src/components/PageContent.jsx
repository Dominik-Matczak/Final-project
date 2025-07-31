import '../styles/PageContent.scss'
import ProductCard from './ProductCard'
import '../styles/container.scss'
import { useEffect, useState } from 'react';



export default function PageContent({ books, loading, selectedKind, setSelectedKind, basket, setBasket }) {

    const [numberOfPage, setNumberOfPage] = useState(0);
    const [ sortedBooks, setSortedBooks ] = useState([])

    function handlePageDecrease() {
        
        if (numberOfPage > 0) {
            setNumberOfPage((prev) => prev - 1)
        } 
    }

    function handlePageIncrease() {
        
        if (numberOfPage <= (Math.floor(books.length / 50) - 1)) {
            setNumberOfPage((prev) => prev + 1)
        } 
    }

    const handleKindChange = (e) => {
        setSelectedKind(e.target.value);
    }

    useEffect(() => {
       setSortedBooks(books)

        if (selectedKind !== "") {
            const filteredbooks = books.filter(book => book.kind === selectedKind);
            setSortedBooks(filteredbooks);
        }

    },[books, selectedKind])

    return (
        
        loading ? <h2>Trwa wczytywanie książek</h2> : 

        <div className="container" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="page-products">
                <div className="products-filtering">
                    <p>Gatunek</p>
                    <div className="kind-filtering">              
                    <select id='kind-select' name="kind" onChange={handleKindChange} value={selectedKind}>
                        <option hidden value="">Wybierz gatunek</option>
                        <option value="Liryka">Liryka</option>
                        <option value="Epika">Epika</option>
                        <option value="Dramat">Dramat</option>
                    </select>
                    {selectedKind !== "" && <button onClick={() => setSelectedKind("")}>Wyczyść filtr</button>}
                    </div>
                </div>
                <div className="products">

                {sortedBooks.map((book, index) => {
                    if (index >= 25 * numberOfPage && index <= (25 * (numberOfPage + 1) - 1)) {   
                        return <ProductCard book={book} key={index} basket={basket} setBasket={setBasket}/>
                    }
                })}

                </div>
            </div>
            <div className='page-buttons-container'>
                {numberOfPage > 0 && <button className='page-button' onClick={handlePageDecrease}>Poprzednia strona</button>}
                {numberOfPage <= (Math.floor(sortedBooks.length / 50) - 1) && <button className='page-button' onClick={handlePageIncrease}>Następna strona</button>}
            </div>
        </div>


        
    )

}
