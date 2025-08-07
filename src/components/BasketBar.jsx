import { Link } from "react-router"

export default function BasketBar({basket, insertedDataIsOk, orderCompleted}) {
   return (
     <div className="basket-bar">
        <Link id="homepage-link" to="/">
          <button>
            Strona główna <i className="fa-solid fa-house"></i>{" "}
          </button>
        </Link>

        <div className="progression-bar">
          <div className="single-circle">
            <div className={ basket.length === 0 ? "progression-bar-circle" : "progression-bar-circle filled-bar"}>{basket.length === 0 ? "1" : <i className="fa-solid fa-check"></i>}</div>
            <p>Koszyk</p>
          </div>
          <div className="single-circle">
            <div className={insertedDataIsOk ? 'progression-bar-circle filled-bar' : 'progression-bar-circle'} >{insertedDataIsOk ? <i className="fa-solid fa-check"></i> : "2"}</div>
            <p>Dostawa i płatność</p>
          </div>
          <div className="single-circle">
            <div className={orderCompleted ? 'progression-bar-circle filled-bar' : 'progression-bar-circle'}>{orderCompleted ? <i className="fa-solid fa-check"></i> : "3"}</div>
            <p>Gotowe</p>
          </div>
        </div>
      </div>
   )
}