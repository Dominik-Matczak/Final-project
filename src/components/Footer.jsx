import '../styles/Footer.scss'
import { Link } from 'react-router'

export default function Footer() {
    return (
        <div className="footer-content">
            <span><i className="fa-solid fa-book"></i>Readdiction</span>
            <div className="footer-socials">
                <Link to='' target='_blank'><img src='src/assets/icon_fb.png'></img></Link>
                <Link to='' target='_blank'><img src='src/assets/icon_x.png'></img></Link>
                <Link to='' target='_blank'><img src='src/assets/icon_insta.png'></img></Link>
            </div>
        </div>
    )
};