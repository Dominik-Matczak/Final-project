import { Outlet } from "react-router";
import { useState, useEffect } from "react";

export default function Layout() {
  const [basket, setBasket] = useState([]);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    surname: "",
    street: "",
    phoneNumber: "",
    addressCode: "",
    codeAssociatedPlace: "",
    deliveryCost: 0,
    deliveryMethod: "",
    paymentMethod: ""
  });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedKind, setSelectedKind] = useState("");
   const [insertedDataIsOk, setInsertedDataIsOk] = useState();
  const [orderCompleted, setOrderCompleted] = useState(false);

  useEffect(() => {
    fetch("https://wolnelektury.pl/api/books")
      .then((response) => response.json())
      .then((data) => {
        const newData = data.map((book) => ({
          ...book,
          price: Math.floor(Math.random() * (89 - 49 + 1)) + 49,
        }));
        setBooks(newData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Błąd podczas pobierania danych:", error);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Outlet context={{ basket, setBasket, orderInfo, setOrderInfo, books, setBooks, loading, setLoading, selectedKind, setSelectedKind, insertedDataIsOk, setInsertedDataIsOk, orderCompleted, setOrderCompleted }} />
    </>
  );
}
