import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";

export default function Layout() {
    
    const [basket, setBasket] = useState([]);

    return (
        <>
        <Header basket={basket} />
        <Outlet context={{basket, setBasket}}/>
        <Footer />
        </>
    );
}