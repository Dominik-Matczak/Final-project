import { useEffect } from 'react';
import '../styles/Header.scss'
import { Link } from 'react-router'
import { useOutletContext } from 'react-router'


export default function Header( { basket}) {

    const { searchBar, setSearchBar } = useOutletContext();

    const handleSearch = (e) => {
        setSearchBar(e.target.value)
    }

    return (
        <div className='header-content'>
            <Link to='/'><i className="fa-solid fa-book"></i>Readdiction</Link>
            <div className='header-search-bar'>
                <i className="fa-solid fa-magnifying-glass"></i>
                <input onChange={handleSearch} value={searchBar} type="text" placeholder='Wyszukaj po tytule bądź autorze '/>
            </div>
            <div className='header-navigation'>
                <ul>
                    <li>
                        <Link to="help">
                            <i className="fa-solid fa-circle-question"></i>
                            Pomoc
                        </Link>
                    </li>
                    <li>
                        <Link to="favourite">
                            <i className="fa-solid fa-heart"></i>
                            Ulubione
                        </Link>
                    </li>
                    <li className='basket-link'>
                        <Link to="basket">
                            <i className="fa-solid fa-basket-shopping"></i>
                            Koszyk
                            {basket.length > 0 && <strong>{basket.length}</strong>}
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
};