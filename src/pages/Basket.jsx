import { useOutletContext } from "react-router-dom";
import "../styles/container.scss";
import "../styles/Basket.scss";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import BasketBar from "../components/BasketBar";

export default function Basket() {
  const { basket, setBasket, orderInfo, setOrderInfo, orderCompleted, setOrderCompleted, insertedDataIsOk, setInsertedDataIsOk, orderList, setOrderList  } = useOutletContext();
 

  useEffect(() => {
    setOrderInfo({ ...orderInfo, deliveryCost: 0, paymentMethod: '' });
    setInsertedDataIsOk();
    setOrderCompleted(false);
  }, []);

  useEffect(() => {
    const summaryBasketPrices = basket.reduce((sum, book) => sum + book.price, 0);

    setOrderInfo({...orderInfo, totalPrice: parseFloat(summaryBasketPrices) + parseFloat(orderInfo.deliveryCost)})

  },[basket, orderInfo.deliveryCost])

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
  }


  const {
    name,
    surname,
    street,
    phoneNumber,
    addressCode,
    codeAssociatedPlace,
    totalPrice
  } = orderInfo;

  return (
    <>
      <BasketBar basket={basket} insertedDataIsOk={insertedDataIsOk} orderCompleted={orderCompleted} />

      <div className="container">
        {basket.length === 0 ? (
          <>
            <h2>Koszyk</h2>
            <p>Twój koszyk jest pusty.</p>
          </>
        ) : (
          <div className="basket-content">
            <div className="basket-form">
              <form className="order-form">
                <h3>Dane osobowe</h3>
                <input
                  type="text"
                  placeholder="Imię"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                />
                {(orderInfo.name.length < 3 && insertedDataIsOk === false) && <p>Imię jest za krótkie</p>}
                <input
                  type="text"
                  placeholder="Nazwisko"
                  name="surname"
                  value={surname}
                  onChange={handleInputChange}
                />
                {(orderInfo.surname.length < 3 && insertedDataIsOk === false) && <p>Nazwisko jest za krótkie</p>}
                <input
                  type="text"
                  placeholder="Ulica"
                  name="street"
                  value={street}
                  onChange={handleInputChange}
                />
                {(orderInfo.street.length < 5 && insertedDataIsOk === false) && <p>Nazwa ulicy jest za krótka</p>}        
                <input
                  type="text"
                  placeholder="Numer telefonu"
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleInputChange}
                  maxLength={9}
                />
                {(orderInfo.phoneNumber.length < 9 && insertedDataIsOk === false) && <p>Nieprawidłowy numer telefonu</p>}
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
                {(orderInfo.addressCode.length < 6 && insertedDataIsOk === false) && <p>Nieprawidłowy kod pocztowy lub format. Prawidłowy format to (xx-xxx)</p>}
                {(orderInfo.codeAssociatedPlace.length < 3 && insertedDataIsOk === false) && <p>Nazwa miejscowości jest zbyt krótka</p>}

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
                          deliveryMethod: "Kurier DHL"
                        })
                      }
                    />{" "}
                    <img src="src/assets/dhl.png" alt="" />
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
                          deliveryMethod: "Kurier inPost"
                        })
                      }
                    />{" "}
                    <img src="src/assets/inpost.png" alt="" /> Kurier inPost
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
                          deliveryMethod: "Kurier DPD"
                        })
                      }
                    />{" "}
                    <img src="src/assets/dpd.png" alt="" /> Kurier DPD +17,99zł
                  </label>
                  {(orderInfo.deliveryCost === 0 && insertedDataIsOk === false) && <p>Wybierz metodę dostawy</p>}
                </div>

                <div className="payment-method-option">
                  <h3>Sposób płatności</h3>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      value={`traditional-transfer`}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: e.target.value,
                        })
                      }
                    />{" "}
                    <img src="src/assets/traditional.png" alt="" />
                    Przelew tradycyjny
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="payment-method"
                      value={`blik`}
                      onChange={(e) =>
                        setOrderInfo({
                          ...orderInfo,
                          paymentMethod: e.target.value,
                        })
                      }
                    />{" "}
                    <img src="src/assets/blik.png" alt="" />
                    BLIK
                  </label>
                  {(orderInfo.paymentMethod === "" && insertedDataIsOk === false) && <p>Wybierz metodę płatności</p>}
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

              <Link id="buy-now" to="/order-success" onMouseEnter={handleFormDataCheck}>
                <button type="submit" disabled={insertedDataIsOk === false} onClick={handleOrderComplete}>
                  Zamów teraz!
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
