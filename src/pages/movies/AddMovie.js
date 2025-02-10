import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import axiosInstance from "../../components/common/axiosInstance";
import "../../styles/movieCrud.css";

const AddMovie = () => {
    const navigate = useNavigate();

    const [text, setText] = useState("");
    const [year, setYear] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [preview, setPreview] = useState("");

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleAdd = async () => {
        if (!text || !year || !selectedImage) {
            alert("Please fill in all fields!");
            return;
        }

        const formData = new FormData();
        formData.append("name", text);
        formData.append("publishYear", year);
        formData.append("file", selectedImage);
        console.log("form ----", selectedImage);

        console.log("url -111-", selectedImage, text, year);
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            axiosInstance({
                method: "post",
                url: `${process.env.REACT_APP_BACKEND_URL}/api/movies/add-movie`,
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                    
                },
                withCredentials: true
            })
                .then(response => {
                    console.log("Response:", response);
                    alert("Movie added successfully!");
                    navigate("/")
                })
        } catch (error) {
            console.error("Error adding movie:", error);
            alert("Error adding movie. Check the console for details.");
        }
    };

    return (
        <div>
            <h1 className="my-5 text-white text-center">Add New Movie</h1>
            <div className="container-wrapper">
                <div
                    onClick={() => document.getElementById("imageInput").click()}
                    className="container mx-5"
                >
                    <div
                        className="box text-center"
                        style={{ display: preview ? "none" : "block" }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22px"
                            height="22px"
                            viewBox="0 0 512 512"
                            style={{ cursor: "pointer" }}
                        >
                            <path
                                fill="#ffffff"
                                d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                            />
                        </svg>
                        <p className="text-white">Drop an image here</p>
                    </div>

                    {/* Image preview */}
                    {preview && (
                        <img
                            src={preview}
                            alt="Selected"
                            style={{
                                width: "100%",
                                objectFit: "cover",
                                borderRadius: "45px",
                                padding: "10px",
                                height: "350px"
                            }}
                        />
                    )}
                    <input
                        type="file"
                        id="imageInput"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleImageUpload}
                    />
                </div>

                {/* Text inputs for title and publishing year */}
                <div className="form mt-5">
                    <input
                        onChange={(e) => setText(e.target.value)}
                        className="text-white"
                        type="text"
                        name="title"
                        id="title"
                        placeholder="Title"
                    />
                    <input
                        onChange={(e) => setYear(e.target.value)}
                        className="text-white"
                        type="text"
                        name="publishing"
                        id="publishing"
                        placeholder="Publishing Year"
                    />
                    <div className="d-flex flex-row mt-5">
                        <button
                            onClick={handleAdd}
                            id="addBtn"
                            className="submit px-5 py-2 rounded fw-bold"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMovie;