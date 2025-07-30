import '../styles/PageContent.scss'
import ProductCard from './ProductCard'
import '../styles/container.scss'
import { useState } from 'react';



export default function PageContent({ books, loading, selectedKind, setSelectedKind, basket, setBasket }) {

    const [numberOfPage, setNumberOfPage] = useState(0);

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



    return (

        loading ? <h2>Trwa wczytywanie książek</h2> : 
        

        
        <div className="container" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="page-products">
                <div className="products-filtering">
                    <p>Gatunek</p>
                    <input type="radio" name="kind" value="Liryka" onChange={e => setSelectedKind(e.target.value)} /> Liryka
                    <input type="radio" name="kind" value="Epika" onChange={e => setSelectedKind(e.target.value)}  /> Epika
                    <input type="radio" name="kind" value="Dramat" onChange={e => setSelectedKind(e.target.value)} /> Dramat
                </div>
                <div className="products">
                {books.map((book, index) => {

                    if (index >= 50 * numberOfPage && index <= (50 * (numberOfPage + 1) - 1)) {
                        if (selectedKind === '' || selectedKind === book.kind ){
                        return <ProductCard book={book} key={index} basket={basket} setBasket={setBasket}/>
                    }
                    }
                })}
                </div>
            </div>
            <div className='page-buttons-container'>
                {numberOfPage > 0 && <button className='page-button' onClick={handlePageDecrease}>Poprzednia strona</button>}
                {numberOfPage <= (Math.floor(books.length / 50) - 1) && <button className='page-button' onClick={handlePageIncrease}>Następna strona</button>}
            </div>
        </div>


        
    )

}
