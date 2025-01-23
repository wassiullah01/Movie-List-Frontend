import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../styles/login.css'
// import { Link } from "react-router-dom";

const SignIn = () => {
    const navigate = useNavigate()
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState({})
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('signUp')) || []
        setLogin(data)
    }, [])
    

    const handleLogin = (event) => {
        event.preventDefault();
        if (!password && !email) {
            alert("Fill out all fields!")
        }

        console.log('login',login,'email',login.email,'password',login.password)
        const findEmail = login.find((item)=>item.email === email)
        const findPassword = login.find((item)=>item.password === password)

        if(findEmail && findPassword){
            alert(`Welcome to Movie-List`)
            navigate("/")
        }
        else {
            alert("Your credentials are wrong!")
        }
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content center" style={{marginTop: "160px"}}>
            <h1 className="text-white mb-5">Sign in</h1>
            <form>
                <div className="mb-3">
                    <input 
                    type="email" 
                    className="form-control text-white pr-5 py-2" 
                    id="exampleInputEmail1"
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                        aria-describedby="emailHelp" placeholder="email" />
                </div>
                <div className="mb-3">
                    <input 
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password" 
                    className="form-control text-white pr-5 py-2" 
                    id="exampleInputPassword1"
                    required
                        placeholder="password" />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label text-white" htmlFor="exampleCheck1" id="exampleCheck2">Remember Me</label>
                </div>
                {/* <button type="submit" className="btn btn-success">Login</button> */}
                <button 
                onClick={handleLogin}
                type="button" 
                id="btn">Login</button>
                <p className="text-white text-center mt-3">Don't have an account? 
                    <a className="text-decoration-none"
                    style={{color:" #2BD17E"}} href="/signUp"> SignUp</a>
                </p>
            </form>
        </div>
    );
}

export default SignIn;