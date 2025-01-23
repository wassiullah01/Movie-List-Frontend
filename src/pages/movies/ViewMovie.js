import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import '../../styles/view.css'

const ViewMovie = () => {

    const { id } = useParams();
    const [movie, setMovie] = useState({ img: "", text: "", year: "" })

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        setMovie(movies[id])
    }, [id])


    return (
        <section className="lower">
            <h2 className="my-3 text-white text-center">View movie</h2>

            <div className="container-wrapper-view">

                <div className="container-view">
                    {movie.img ? (
                        <img
                            src={movie.img}
                            alt="Movie"
                            style={{
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "45px",
                                padding: "10px",
                                height: "350px"
                            }}
                        />
                    )
                        : (
                            <div className="box-view">
                                <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 512 512"
                                    style={{ cursor: "pointer" }}>
                                    <path fill="#ffffff"
                                        d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
                                </svg>
                                <p className="text-white">Drop an image here</p>
                            </div>
                        )}
                </div>

                <div className="form mt-5">
                    <input value={movie.text} className="text-white" type="text" name="title" id="title" placeholder="Title" />
                    <input value={movie.year} className="text-white" type="text" name="publishing" id="publishing" placeholder="Publishing Year" />
                    <div className="mt-5">
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ViewMovie;