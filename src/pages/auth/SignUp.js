import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import axios from "axios";
import { addUser } from "../../reducers/userAuthSlice";
import '../../styles/login.css';

const SignUp = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');

    const handleInfo = async (event) => {
        event.preventDefault();

        if (!username || !email || !password) {
            alert("Fill out all fields");
            return;
        }

        try {
            const response = await axios({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
                data: { username, email, password },
                // withCredentials: true,
            });
            console.log("Response:", response);
            alert("Sign-up successful!");

            dispatch(addUser(response.data));

            navigate("/signIn");
        } catch (error) {
            console.error(error);
            alert(error.response?.data?.message || "Sign-up failed");
        }
    };

    return (
        <div className="d-flex flex-column align-items-center justify-content center" style={{ marginTop: "160px" }}>
            <h1 className="text-white mb-5">Sign Up</h1>
            <form>
                <div className="mb-3">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control text-white pr-5 py-2"
                        id="exampleInputText1"
                        aria-describedby="emailHelp"
                        placeholder="username" />
                </div>
                <div className="mb-3">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control text-white pr-5 py-2"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="email" />
                </div>
                <div className="mb-3">
                    <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control text-white pr-5 py-2"
                        id="exampleInputPassword1"
                        placeholder="password" />
                </div>
                <button onClick={handleInfo} type="submit" id="btn">Sign Up</button>
                <p className="text-white text-center mt-3">
                    Already have an account? <a className="text-decoration-none" style={{ color: "#2BD17E" }} href="/signIn">SignIn</a>
                </p>
            </form>
        </div>
    );
};

export default SignUp;