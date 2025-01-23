import { useState } from "react"
import { useNavigate } from "react-router-dom";
import '../../styles/login.css'

const SignUp = () => {

    const navigate = useNavigate()
    const data = JSON.parse(localStorage.getItem('signUp')) || []
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')

    const handleInfo = (event) => {
        event.preventDefault();

        if (!password && !email && !username) {
            alert("Fill out all fields")
        }

        if (password.length < 8 && password >= 12) {
            alert("Password must be at least 8 characters long.");
        }
        if (!/[a-z]/.test(password)) {
            alert("Password must include at least one lowercase letter.");
        }
        if (!/[A-Z]/.test(password)) {
            alert("Password must include at least one uppercase letter.");
        }
        if (!/[0-9]/.test(password)) {
            alert("Password must include at least one number.");
        }
        if (!/[^a-zA-Z0-9]/.test(password)) {
            alert("Password must include at least one special character.");
        }
        alert("Sign-up successful!");
        const info = {
            username: username,
            email: email,
            password: password
        }
        data.push(info)
        localStorage.setItem("signUp", JSON.stringify(data))
        navigate("/signIn")
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content center" style={{ marginTop: "160px" }}>
            <h1 className="text-white mb-5">Sign Up</h1>
            <form>
                <div className="mb-3">
                    <input
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control text-white pr-5 py-2"
                        id="exampleInputText1" aria-describedby="emailHelp"
                        placeholder="username" />
                </div>
                <div className="mb-3">
                    <input
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        className="form-control text-white pr-5 py-2"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp" placeholder="email" />
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
                <p className="text-white text-center mt-3">Already have an account? <a className="text-decoration-none"
                    style={{ color: "#2BD17E" }} href="/signIn">SignIn</a></p>
            </form>
        </div>
    );
}

export default SignUp;