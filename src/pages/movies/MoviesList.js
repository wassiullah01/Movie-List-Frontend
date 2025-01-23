import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import '../../styles/movieList.css'


const MoviesList = () => {

    const navigate = useNavigate()
    const [movies, setMovies] = useState([])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('movies')) || [];
        setMovies(data);
    }, [])

    const renderMovies = () => {
        return movies.map((movie, index) => (
            <div
                className="card"
                style={{ width: '18rem', backgroundColor: '#092C39' }}
                key={index}>
                <Link to={`/view/${index}`}>
                    <img src={movie.img} className="card-img-top" height="300px" alt="Movie" />
                </Link>
                <div className="card-body d-flex flex-column">
                    <Link
                        to={`/view/${index}`}
                        className="card-text text-white text-decoration-none">
                        {movie.text}
                    </Link>
                    <Link
                        to={`/view/${index}`}
                        className="card-text text-white text-decoration-none">
                        {movie.year}
                    </Link>
                    <button
                        className="edit-movie btn btn-primary mt-2"
                        onClick={() => handleEdit(index)}>
                        Edit
                    </button>
                    <button
                        className="delete-movie btn btn-danger mt-2"
                        onClick={() => handleDelete(index)}>
                        Delete
                    </button>
                </div>
            </div>
        ))
    }

    const handleEdit = (index) => {
        navigate(`/edit/${index}`)
    }

    const handleDelete = (index) => {
        const forDelete = movies.filter((_, i) => i !== index)
        setMovies(forDelete)
        localStorage.setItem('movies', JSON.stringify(forDelete));
    }

    const handleAddMovie = () => {
        navigate('/add')
    }


    return (
        <>
            <div className="text-center">
                <h4 className="heading-4 text-white mx-5">My movies <svg onClick={handleAddMovie} id="addIcon" width="22px" height="22px" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512" style={{ cursor: "pointer" }}>
                    <path fill="#ffffff"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z" />
                </svg></h4>
                {/* <Link to="/signIn" className="heading-6 text-white text-decoration-none mx-5">Logout <svg width="22px"
                    height="22px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"
                    style={{ cursor: "pointer", marginLeft: "10px" }}>
                    <path fill="#ffffff"
                        d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z" />
                </svg></Link> */}
            </div>


            <div className="d-flex flex-wrap flex-row align-items-center justify-content-between mx-5">
                {renderMovies()}
            </div>

            <nav aria-label="Page navigation example" className="my-5">
                <ul className="pagination d-flex align-items-center justify-content-center">
                    <li className="page-item text-white fw-bold">Prev</li>
                    <li className="page-item">
                        <Link className="page-link mx-3" to="#">1</Link>
                    </li>
                    <li className="page-item">
                        <Link className="page-link mx-3" to="#">2</Link>
                    </li>
                    <li className="page-item text-white fw-bold">Next</li>
                </ul>
            </nav>
        </>
    );
}

export default MoviesList;