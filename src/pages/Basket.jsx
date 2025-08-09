import { useOutletContext } from "react-router-dom";
import "../styles/container.scss";
import "../styles/Basket.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import BasketBar from "../components/BasketBar";
import { useState } from "react";

import dhlIcon from '../assets/dhl.png'
import dpdIcon from '../assets/dpd.png'
import inpostIcon from '../assets/inpost.png'
import traditionalTransferIcon from '../assets/traditional.png'
import blikIcon from '../assets/blik.png'

export default function Basket() {
  const {
    basket,
    setBasket,
    orderInfo,
    setOrderInfo,
    orderCompleted,
    setOrderCompleted,
    insertedDataIsOk,
    setInsertedDataIsOk,
    totalPrice,
    setTotalPrice,
    orderList,
    setOrderList
  } = useOutletContext();

  const [dataCheck, setDataCheck] = useState(false);

  useEffect(() => {
    setOrderInfo({
      name: "",
      surname: "",
      street: "",
      phoneNumber: "",
      addressCode: "",
      codeAssociatedPlace: "",
      deliveryCost: 0,
      deliveryMethod: "",
      paymentMethod: "",
      totalPrice: 0,
    });
    setInsertedDataIsOk();
    setOrderCompleted(false);
  }, [setInsertedDataIsOk, setOrderCompleted, setOrderInfo]);

  useEffect(() => {
    const summaryBasketPrices = basket.reduce(
      (sum, book) => sum + book.price,
      0
    );

    setTotalPrice(
      parseFloat(summaryBasketPrices) + parseFloat(orderInfo.deliveryCost)
    );
  }, [basket, orderInfo.deliveryCost, totalPrice, setTotalPrice]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemRemoval = (indexToRemove) => {
    setBasket((prevBasket) =>
      prevBasket.filter((book, index) => index !== indexToRemove)
    );
  };

  const handleFormDataCheck = () => {
    if (
      orderInfo.name.length > 3 &&
      orderInfo.surname.length > 3 &&
      orderInfo.street.length > 5 &&
      orderInfo.addressCode.length === 6 &&
      orderInfo.phoneNumber.length >= 9 &&
      orderInfo.addressCode.includes("-") &&
      orderInfo.codeAssociatedPlace.length > 3 &&
      orderInfo.deliveryCost !== 0 &&
      orderInfo.paymentMethod !== ""
    ) {
      setInsertedDataIsOk(true);
    } else {
      setInsertedDataIsOk(false);
    }
  };

  const handleOrderComplete = () => {
    setOrderCompleted(true);
    setOrderList([...orderList, {...orderInfo, products: basket, totalPrice}])
  };

  const {
    name,
    surname,
    street,
    phoneNumber,
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

      <div className="container">
        {basket.length === 0 ? (
          <>
            <h2>Koszyk</h2>
            <p>Twój koszyk jest pusty.</p>
          </>
        ) : (
          <div className="basket-content">
            <div className="basket-form">
              <form className="order-form" onMouseLeave={handleFormDataCheck}>
                <h3>Dane osobowe</h3>
                <input
                  className="form-data-input"
                  type="text"
                  placeholder="Imię"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
                {orderInfo.name.length < 3 && insertedDataIsOk === false && (
                  <p>Imię jest za krótkie</p>
                )}
                <input
                  className="form-data-input"
                  type="text"
                  placeholder="Nazwisko"
                  name="surname"
                  value={surname}
                  onChange={handleInputChange}
                />
                {orderInfo.surname.length < 3 && insertedDataIsOk === false && (
                  <p>Nazwisko jest za krótkie</p>
                )}
                <input
                  className="form-data-input"
                  type="text"
                  placeholder="Ulica"
                  name="street"
                  value={street}
                  onChange={handleInputChange}
                />
                {orderInfo.street.length < 5 && insertedDataIsOk === false && (
                  <p>Nazwa ulicy jest za krótka</p>
                )}
                <input
                  className="form-data-input"
                  type="text"
                  placeholder="Numer telefonu"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  maxLength={9}
                />
                {orderInfo.phoneNumber.length < 9 &&
                  insertedDataIsOk === false && (
                    <p>Nieprawidłowy numer telefonu</p>
                  )}
                <div className="order-address-code">
                  <input
                    type="text"
                    placeholder="Kod pocztowy"
                    name="addressCode"
                    value={addressCode}
                    onChange={handleInputChange}
                    id="addressCode"
                    maxLength={6}
                  />
                  <input
                    type="text"
                    placeholder="Miejscowość"
                    name="codeAssociatedPlace"
                    value={codeAssociatedPlace}
                    onChange={handleInputChange}
                    id="asoAddress"
                  />
                </div>
                {orderInfo.addressCode.length < 6 &&
                  insertedDataIsOk === false && (
                    <p>
                      Nieprawidłowy kod pocztowy lub format. Prawidłowy format
                      to (xx-xxx)
                    </p>
                  )}
                {orderInfo.codeAssociatedPlace.length < 3 &&
                  insertedDataIsOk === false && (
                    <p>Nazwa miejscowości jest zbyt krótka</p>
                  )}

                <div className="delivery-method-options">
                  <h3>Sposób dostawy</h3>
                  <label>
                    <input
                      type="radio"
                      name="delivery-method"
                      value={19.99}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          deliveryCost: e.target.value,
                          deliveryMethod: "Kurier DHL",
                        })
                      }
                    />{" "}
                    <img src={dhlIcon} alt="" />
                    Kurier DHL +19,99zł
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery-method"
                      value={14.99}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          deliveryCost: e.target.value,
                          deliveryMethod: "Kurier inPost",
                        })
                      }
                    />{" "}
                    <img src={inpostIcon} alt="" /> Kurier inPost
                    +14,99zł
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="delivery-method"
                      value={17.99}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          deliveryCost: e.target.value,
                          deliveryMethod: "Kurier DPD",
                        })
                      }
                    />{" "}
                    <img src={dpdIcon}alt="" /> Kurier DPD +17,99zł
                  </label>
                  {orderInfo.deliveryCost === 0 &&
                    insertedDataIsOk === false && <p>Wybierz metodę dostawy</p>}
                </div>

                <div className="payment-method-option">
                  <h3>Sposób płatności</h3>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      value={`Przelew tradycyjny`}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: e.target.value,
                        })
                      }
                    />{" "}
                    <img src={traditionalTransferIcon} alt="" />
                    Przelew tradycyjny
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      value={`BLIK`}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: e.target.value,
                        })
                      }
                    />{" "}
                    <img src={blikIcon} alt="" />
                    BLIK
                  </label>
                  {orderInfo.paymentMethod === "" &&
                    insertedDataIsOk === false && (
                      <p>Wybierz metodę płatności</p>
                    )}
                </div>
              </form>
            </div>
            <div className="basket-products">
              <h3>Twój koszyk</h3>
              <h5>Produkty ({basket.length})</h5>
              <ul>
                {basket.map((book, index) => (
                  <li key={index}>
                    <img src={book.simple_thumb} alt="" />
                    <div className="list-element-box">
                      <h4>{book.title}</h4>
                      <p>{book.author}</p>
                      <p>{book.price} zł</p>
                    </div>
                    <button onClick={() => handleItemRemoval(index)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </li>
                ))}
              </ul>

              <strong>
                Łącznie:{` `}
                {totalPrice} zł
              </strong>

              <button
                id="summary-button"
                type="submit"
                disabled={insertedDataIsOk === false}
                onClick={() => setDataCheck(true)}
                onMouseEnter={handleFormDataCheck}
              >
                Podsumowanie
              </button>

              {/* <Link id="buy-now" to="/order-success">
                <button
                  type="submit"
                  disabled={insertedDataIsOk === false}
                  onClick={handleOrderComplete}
                >
                  Zamów teraz!
                </button>
              </Link> */}
            </div>
          </div>
        )}
      </div>

      {dataCheck && <div className="inserted-data-section">
        <div className="inserted-data-confirmation">
          <i className="fa-solid fa-triangle-exclamation warning-sign"></i>
          <h4>Sprawdź poprawność danych! </h4>
          <ul>
            <li><p>Imię: </p> <span>{name}</span></li>
            <li><p>Nazwisko: </p><span>{surname}</span></li>
            <li><p>Adres: </p><span>{street}</span></li>
            <li>
              <p>Kod pocztowy i miasto: </p><span>{addressCode} {codeAssociatedPlace}</span>
            </li>
            <li><p>Numer telefonu: </p><span>{phoneNumber}</span></li>
            <li><p>Metoda dostawy: </p><span>{deliveryMethod}</span></li>
            <li><p>Koszt dostawy: </p><span>{deliveryCost}</span></li>
            <li><p>Metoda płatności: </p><span>{paymentMethod}</span></li>
            <li><p>Łączna kwota do zapłaty: </p><span>{totalPrice} zł</span></li>
          </ul>
          <div className="confirmation-buttons">
            <button className="edit-data" onClick={() => setDataCheck(false)}>Edytuj</button>
            <Link to="/order-success">
              <button onClick={handleOrderComplete}>Przejdź do płatności</button>
            </Link>
          </div>
        </div>
      </div>}
    </>
  );
}
