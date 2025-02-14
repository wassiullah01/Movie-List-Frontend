import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/login.css';
import axios from "axios";

const SignIn = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleLogin = async (event) => {
        event.preventDefault();

        if (!email || !password) {
            alert("Fill out all fields!");
            return;
        }

        try {
            const response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
                data: { email, password },
                withCredentials: true,
            });
            console.log("Response:", response);
            if (email === "admin@gmail.com") {
                alert("Welcome Admin");
                navigate("/admin");
            } else {
                alert("Welcome to Movie-List");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Login failed");
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content center" style={{ marginTop: "160px" }}>
            <h1 className="text-white mb-5">Sign in</h1>
            <form>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control text-white pr-5 py-2"
                        id="exampleInputEmail1"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        aria-describedby="emailHelp"
                        placeholder="email" />
                </div>
                <div className="mb-3">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control text-white pr-5 py-2"
                        id="exampleInputPassword1"
                        required
                        placeholder="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label text-white" htmlFor="exampleCheck1" id="exampleCheck2">
                        Remember Me
                    </label>
                </div>
                <button
                    onClick={handleLogin}
                    type="button"
                    id="btn">
                    Login
                </button>
                <p className="text-white text-center mt-3">
                    Don't have an account?
                    <Link className="text-decoration-none" style={{ color: " #2BD17E" }} to="/signUp">
                        SignUp
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignIn;