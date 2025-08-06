import { useOutletContext } from "react-router-dom";
import '../styles/container.scss'
import '../styles/Basket.scss'
import { useState } from "react";

export default function Basket() {
  const { basket, setBasket } = useOutletContext();
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    surname: "",
    street: "",
    phoneNumber: "",
    addressCode: "",
    codeAssociatedPlace: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemRemoval = (indexToRemove) => {
    setBasket((prevBasket) => prevBasket.filter((book, index) => index !== indexToRemove));
  };

  const totalPrice = basket.reduce((sum, book) => sum + book.price, 0);

  const { name, surname, street, phoneNumber, addressCode, codeAssociatedPlace } = orderInfo;

  return (
    <div className="container basket-container">
      
      {basket.length === 0 ? (
        <>
        <h2>Koszyk</h2>
        <p>Twój koszyk jest pusty.</p>
        </>
      ) : (

        <div className="basket-content">
          <div className="basket-form">
            <h3>Dane osobowe</h3>
            <form className="order-form">
              
              <input type="text" placeholder="Imię" name="name" value={name} onChange={handleInputChange}/>

              <input type="text" placeholder="Nazwisko" name="surname" value={surname} onChange={handleInputChange} />

              <input type="text" placeholder="Ulica" name="street" value={street} onChange={handleInputChange}/>

              <input type="number" placeholder="Numer telefonu" name="phoneNumber" value={phoneNumber} onChange={handleInputChange}/>

              <div className="order-address-code">
                
                <input type="text" placeholder="Kod pocztowy" name="addressCode" value={addressCode} onChange={handleInputChange} id="addressCode" />
                <input type="text" placeholder="Miejscowość" name="codeAssociatedPlace" value={codeAssociatedPlace} onChange={handleInputChange} id="asoAddress" />


              </div>
            </form>
            
            <div className="delivery-method-options">
              <h3>Sposób dostawy</h3>
              <label>
                <input type="radio" name="delivery-method" value={19.99} onChange={(e) => setDeliveryCost(e.target.value)} /> <img src="src/assets/dhl.png" alt="" />Kurier DHL +19,99zł
              </label>
              <label>
                <input type="radio" name="delivery-method" value={14.99} onChange={(e) => setDeliveryCost(e.target.value)}/> <img src="src/assets/inpost.png" alt="" /> Kurier inPost +14,99zł
              </label>
              <label>
                <input type="radio" name="delivery-method" value={17.99} onChange={(e) => setDeliveryCost(e.target.value)} /> <img src="src/assets/dpd.png" alt="" /> Kurier DPD +17,99zł
              </label>
            </div>

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
                <button onClick={() => handleItemRemoval(index)}><i class="fa-solid fa-trash"></i></button>
              </li>
            ))}
          </ul>
          
          <strong>Łącznie: {parseFloat(totalPrice) + parseFloat(deliveryCost)} zł</strong>
          <button id="buy-now">Zamów teraz!</button>

          </div>
        </div>
      )}
    </div>
  );
}