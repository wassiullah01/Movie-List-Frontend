import { Link, useNavigate } from "react-router-dom";
import logo from '../../assests/images/mkv.png'
import '../../styles/navbar.css'

const Navbar = () => {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light">
            {/* <div className="container-fluid"> */}
            <img src={logo}
                onClick={handleClick}
                id="logo"
                alt="LOGO" />
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item dropdown mx-3">
                        <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown"
                            data-bs-toggle="dropdown" aria-expanded="false" style={{ color: "#2BD17E" }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="25px" viewBox="0 0 448 512">
                                <path fill="#2BD17E"
                                    d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" />
                            </svg>
                        </Link>
                        <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <li><Link className="dropdown-item" to="#">User</Link></li>
                            <li><Link className="dropdown-item" to="/signIn">Logout</Link></li>
                        </ul>
                    </li>
                </ul>
            </div>
            {/* </div> */}
        </nav>
    );
}

export default Navbar;