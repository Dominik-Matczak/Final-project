import '../styles/Footer.scss'
import { Link } from 'react-router'

import iconFb from '../assets/icon_fb.png'
import iconX from '../assets/icon_x.png'
import iconInsta from '../assets/icon_insta.png'

export default function Footer() {
    return (
        <div className="footer-content">
            <span><i className="fa-solid fa-book"></i>Readdiction</span>
            <div className="footer-socials">
                <Link to='' target='_blank'><img src={iconFb}></img></Link>
                <Link to='' target='_blank'><img src={iconX}></img></Link>
                <Link to='' target='_blank'><img src={iconInsta}></img></Link>
            </div>
        </div>
    )
};