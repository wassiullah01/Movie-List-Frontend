import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../components/common/axiosInstance";
import Modal from "../../components/common/Modal";
import "../../styles/movieList.css";

const MoviesList = () => {
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [userPermissions, setUserPermissions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const moviesPerPage = 4;
    const totalPages = Math.ceil(movies.length / moviesPerPage);
    const [showModal, setShowModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    // Fetch Movies
    useEffect(() => {
        axiosInstance({
            method: "get",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/movies`,
            withCredentials: true
        })
            .then((response) => {
                setMovies(response.data);
                console.log("Movies fetched:", response.data);
            })
            .catch((error) => console.error("Error fetching movies:", error));
    }, []);

    // Fetch User Permissions
    useEffect(() => {
        axiosInstance({
            method: "get",
            url: `${process.env.REACT_APP_BACKEND_URL}/api/permissions/user-permissions`,
            withCredentials: true
        })
            .then((response) => {
                if (response.data.status === "success") {
                    setUserPermissions(response.data.data.permissions || []);
                    console.log("User permissions:", response.data.data.permissions);
                }
            })
            .catch((error) => console.error("Error fetching user permissions:", error));
    }, []);

    // Check User Permission
    const hasPermission = (permission) => userPermissions.includes(permission);

    // Handle Delete Confirm
    const handleDeleteConfirm = () => {
        if (deleteId !== null) {
            axiosInstance({
                method: "delete",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/movies/delete-movie/${deleteId}`,
                withCredentials: true
            })
                .then(() => {
                    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== deleteId));
                    console.log("Movie deleted:", deleteId);
                    setShowModal(false);
                })
                .catch((error) => console.error("Error deleting movie:", error));
        }
    };

    // Show Delete Modal
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    // Cancel Delete
    const handleCancel = () => {
        setShowModal(false);
        setDeleteId(null);
    };

    // Pagination
    const handlePrevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
    const handleNextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

    if (!hasPermission("view")) {
        return <h3 className="text-white text-center mt-5">You do not have permission to view movies.</h3>;
    }

    const renderMovies = movies
        .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
        .map((movie) => (
            <div className="card" style={{ width: "18rem", backgroundColor: "#092C39" }} key={movie.id}>
                <Link to={`/view-movie/${movie.id}`}>
                    <img src={`${process.env.REACT_APP_BACKEND_URL}${movie.imgURL}`} className="card-img-top" height="300px" alt="Movie" />
                </Link>
                <div className="card-body d-flex flex-column">
                    <Link to={`/view-movie/${movie.id}`} className="card-text text-white text-decoration-none">
                        {movie.name}
                    </Link>
                    <span className="card-text text-white">{movie.publishYear}</span>

                    {hasPermission("update") && (
                        <button className="edit-movie btn btn-primary mt-2" onClick={() => navigate(`/update-movie/${movie.id}`)}>
                            Edit
                        </button>
                    )}

                    {hasPermission("delete") && (
                        <button className="delete-movie btn btn-danger mt-2" onClick={() => handleDeleteClick(movie.id)}>
                            Delete
                        </button>
                    )}
                </div>
            </div>
        ));

    return (
        <>
            <div className="text-center">
                <h4 className="heading-4 text-white">
                    My Movies&nbsp;
                    {hasPermission("create") && (
                        <svg
                            onClick={() => navigate("/add-movie")}
                            id="addIcon"
                            width="22px"
                            height="22px"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                            style={{ cursor: "pointer" }}
                        >
                            <path
                                fill="#ffffff"
                                d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z"
                            />
                        </svg>
                    )}
                </h4>
            </div>

            <div className="d-flex flex-wrap flex-row align-items-center gap-4 mx-5">{renderMovies}</div>

            <nav aria-label="Page navigation example" className="my-5">
                <ul className="pagination d-flex align-items-center justify-content-center">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={handlePrevPage}>
                            Prev
                        </button>
                    </li>
                    {Array.from({ length: totalPages }, (_, i) => (
                        <li className={`page-item ${currentPage === i + 1 ? "active" : ""} mx-2`} key={i}>
                            <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                                {i + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                        <button className="page-link" onClick={handleNextPage}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>

            <Modal show={showModal} onConfirm={handleDeleteConfirm} onCancel={handleCancel} />
        </>
    );
};

export default MoviesList;
