import { useOutletContext } from "react-router";
import BasketBar from "../components/BasketBar";
import "../styles/OrderSuccess.scss";

export default function OrderSuccess() {
  const { basket, insertedDataIsOk, orderCompleted, orderInfo, totalPrice } =
    useOutletContext();

  const {
    name,
    surname,
    phoneNumber,
    street,
    addressCode,
    codeAssociatedPlace,
    deliveryCost,
    deliveryMethod,
    paymentMethod,
  } = orderInfo;

  return (
    <>
      <BasketBar
        basket={basket}
        insertedDataIsOk={insertedDataIsOk}
        orderCompleted={orderCompleted}
      />
      <div className="order-success-content">
        <h1>Dziękujemy za złożenie zamówienia!</h1>

        <div className="order-data-section">
          <h3>Dane kupującego</h3>
          <p>
            {name} {surname}
            <br />
            Telefon: {phoneNumber}
            <br />
            Adres: {street}, {addressCode} {codeAssociatedPlace}
          </p>
        </div>

        <div className="order-data-section">
          <h3>Wybrana metoda dostawy</h3>
          <strong>{deliveryMethod}</strong>
          <p>Koszt dostawy: {deliveryCost} zł</p>
        </div>

        <div className="order-data-section">
          <h3>Wybrana metoda płatności</h3>
          <p>
            {paymentMethod}
          </p>
        </div>

        <p>Kwota łączna: {totalPrice} zł</p>

        <a className="fa-solid fa-check"></a>
      </div>
    </>
  );
}
