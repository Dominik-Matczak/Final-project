import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";

export default function Layout() {
    
    const [basket, setBasket] = useState([]);

     useEffect(() => {
        console.log("Aktualny koszyk w Layout:", basket);
        }, [basket]);
    
    return (
        <>
        <Header basket={basket} />
        <Outlet context={{basket, setBasket}}/>
        <Footer />
        </>
    );
}