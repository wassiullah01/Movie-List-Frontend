import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../styles/movieCrud.css';

const EditMovie = () => {

    const [text, setText] = useState("")
    const [year, setYear] = useState("")
    const [image, setImage] = useState("")
    const id = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        const data = movies[id.id]
        console.log("data", data, "movies", movies, "id = ", id.id)
        if (data) {
            setImage(data.img)
            setText(data.text)
            setYear(data.year)
        }
    }, [id])

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUpdate = () => {
        const movies = JSON.parse(localStorage.getItem("movies")) || [];
        movies[id.id] = { img: image, text: text, year: year };
        localStorage.setItem("movies", JSON.stringify(movies));
        navigate("/")
    }

    return (
        <>
            <h1 className="my-5 text-white text-center">Edit</h1>

            <div className="container-wrapper">

                <div className="container mx-5">
                    <div
                        className="box text-center"
                        style={{ display: image ? "none" : "block" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 512 512" style={{ cursor: "pointer" }}>
                            <path fill="#ffffff"
                                d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z" />
                        </svg>
                        <p className="text-white">Drop an image here</p>
                    </div>
                    <img
                        src={image}
                        alt="Movie"
                        style={{
                            width: "100%",
                            objectFit: "cover",
                            borderRadius: "45px",
                            padding: "10px",
                            height: "350px",
                            display: image ? "block" : "none",
                        }}
                        onClick={() => document.getElementById("imageInput").click()}
                    />
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageChange}
                    />
                </div>

                <div className="form mt-5">
                    <input value={text} onChange={(e) => setText(e.target.value)} className="text-white" type="text" name="title" id="title" placeholder="Title" />
                    <input value={year} onChange={(e) => setYear(e.target.value)} className="text-white" type="text" name="publishing" id="publishing" placeholder="Publishing Year" />
                    <div className="d-flex flex-row mt-5">
                        <button onClick={handleUpdate} id="editBtn" className="submit px-5 py-2 rounded fw-bold">Update</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditMovie;