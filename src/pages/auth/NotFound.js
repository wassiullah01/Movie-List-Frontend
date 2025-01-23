import { Link } from "react-router-dom";

const NotFound = () => {
    return ( 
        <div style={{textAlign:"center",marginTop:"200px"}}>
        <h1 style={{fontSize:"100px",color:"white"}}>404</h1>
        <Link to="/" style={{fontSize:"20px",color:"lightgreen"}}>Back To HomePage</Link>    
        </div>
     );
}
 
export default NotFound;