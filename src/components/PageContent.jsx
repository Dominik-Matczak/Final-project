import '../styles/PageContent.scss'
import ProductCard from './ProductCard'



export default function PageContent({ books, loading, selectedKind, setSelectedKind, basket, setBasket }) {


    return (

        loading ? <h2>Trwa wczytywanie książek</h2> : 
        

        
        <div className="page-products">
            <div className="products-filtering">
                    <p>Gatunek</p>
                    <input type="radio" name="kind" value="Liryka" onChange={e => setSelectedKind(e.target.value)} /> Liryka
                    <input type="radio" name="kind" value="Epika" onChange={e => setSelectedKind(e.target.value)}  /> Epika
                    <input type="radio" name="kind" value="Dramat" onChange={e => setSelectedKind(e.target.value)} /> Dramat
            </div>
            <div className="products">
                {books.map((book, index) => {
                    if (selectedKind === ''){
                        return <ProductCard book={book} key={index} basket={basket} setBasket={setBasket}/>
                    }
                    if (selectedKind === book.kind) {
                        return <ProductCard book={book} key={index} basket={basket} setBasket={setBasket}/>
                    }
                })}
            </div>
        </div>


        
    )

}
