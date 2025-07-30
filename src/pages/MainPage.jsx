import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router"
import { useState, useEffect } from "react";
import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/MainPage.scss'
import PageContent from "../components/PageContent"
import { useOutletContext } from "react-router-dom";





export default function MainPage() {

    const { basket, setBasket } = useOutletContext();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedKind, setSelectedKind] = useState('');
    

    useEffect(() => {
         fetch('https://wolnelektury.pl/api/books')
            .then((response) => response.json())
            .then((data) => {
                const newData = data.map((book) => ({
                    ...book,
                    price: Math.floor(Math.random() * (89 - 49 + 1)) + 49
                }));
                setBooks(newData);
                setLoading(false);
        })
        .catch((error) => {
            console.error('Błąd podczas pobierania danych:', error);
            setLoading(false);
        });
  }, []);

    return (
       <>
        <PageContent 
        books={books} 
        loading={loading} 
        selectedKind={selectedKind} 
        setSelectedKind={setSelectedKind}
        basket={basket}
        setBasket={setBasket}/>
       </>
    )
};