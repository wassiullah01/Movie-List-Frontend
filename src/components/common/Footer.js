import { Link } from "react-router-dom";
import '../../styles/footer.css'

const Footer = () => {
    return (
        // <div className="footer-container">
            <footer className="py-5 text-white bg-secondary" id="footer">
                <div className="row">
                    <div className="col-2" id="forLeft"> 
                        <h5>Movies</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/add" className="nav-link p-0 text-secondary">Add New</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">Pricing</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">About</Link></li>
                        </ul>
                    </div>

                    <div className="col-2">
                        <h5>TV Shows</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="/" className="nav-link p-0 text-secondary">Home</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">Features</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">Pricing</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">About</Link></li>
                        </ul>
                    </div>

                    <div className="col-2 mb-5">
                        <h5>Policy</h5>
                        <ul className="nav flex-column">
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">About Us</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">Terms and Conditions</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">Privacy Policy</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">FAQs</Link></li>
                            <li className="nav-item mb-2"><Link to="#" className="nav-link p-0 text-secondary">Contact</Link></li>
                        </ul>
                    </div>

                    <div className="col-4 offset-1">
                        <form>
                            <h5>Subscribe to our newsletter</h5>
                            <p>Monthly new movies and exciting from us.</p>
                            <div className="d-flex w-100 align-items-center justify-content-center">
                                <label htmlFor="newsletter1" className="visually-hidden">Email address</label>
                                <input id="newsletter1" type="text" className="form-control shadow-none" placeholder="Email address" />
                                    <button className="btn btn-dark" type="button">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="d-flex justify-content-center py-2 border-top">
                    <p>© 2025 Company, Inc. All rights reserved.</p>
                </div>
            </footer>
        // </div>
    );
}

export default Footer;