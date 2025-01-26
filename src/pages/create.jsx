import { useEffect, useState } from "react";
import { useAppContext } from "../store/store";
import Layout from "../components/Layout";
import { useNavigate, useLocation } from "react-router-dom";

export default function Create() {
    const [title, setTitle] = useState("");    
    const [genre, setGenre] = useState("");
    const [cover, setCover] = useState("");
    const [director, setDirector] = useState("");    
    const [review, setReview] = useState("");

    const store = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    const inputStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        fontSize: '16px',
        width: '100%',  
        marginBottom: '15px', 
    };

    const buttonStyle = {
        buttonCover: {
            padding: "10px 0px",
            minWidth: "100px",
            border: "none",
            borderRadius: "5px",            
            marginBottom: '20px',           
        },
        buttonSubmit: {
            padding: "15px 20px",
            minWidth: "200px",
            border: "none",
            borderRadius: "5px",
            backgroundColor: "#28a745",
            color: "white",
            fontWeight: "bolder", 
            fontSize: "18px",
            cursor: "pointer", 
        }
    };

    const queryParams = new URLSearchParams(location.search);
    const movieId = queryParams.get("id");

    useEffect(() => {
        if (movieId) {
            const existingMovie = store.getItem(movieId);
            if (existingMovie) {
                setTitle(existingMovie.title);
                setGenre(existingMovie.genre);
                setCover(existingMovie.cover);
                setDirector(existingMovie.director);                
                setReview(existingMovie.review);
            }
        } else {
            setTitle("");
            setGenre("");
            setCover("");
            setDirector("");            
            setReview("");
        }
    }, [movieId, store]);

    function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        switch (name) {
            case 'title':
                setTitle(value);
                break;
            case 'genre':
                setGenre(value);
                break;
            case 'director':
                setDirector(value);
                break;            
            case 'review':
                setReview(value);
                break;
            default:
        }
    }

    function handleOnChangeFile(e) {
        const element = e.target;
        const file = element.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            setCover(reader.result.toString());
        };
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        if (!title || (!cover && !movieId)) {
            alert("Title and Cover are required fields!");
            return;
        }

        const newMovie = {
            id: movieId || crypto.randomUUID(),
            title,
            genre,
            cover,
            director,            
            review,
        };

        if (movieId) {
            store.updateItem(newMovie);
        } else {
            store.createItem(newMovie);
        }

        navigate("/");
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <div>
                    <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                        Title <span style={{ color: 'white', marginLeft: '5px' }}>* </span>
                        <span>Required field</span>
                    </div>
                    <input 
                        type="text" 
                        name="title" 
                        onChange={handleChange} 
                        value={title}
                        style={inputStyle}
                        required
                    />
                </div>
                <div>
                    <div style={{ color: 'white' }}>Genre</div>
                    <input 
                        type="text" 
                        name="genre" 
                        onChange={handleChange} 
                        value={genre}
                        style={inputStyle}
                    />
                </div>
                <div>
                    <div style={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                        Cover <span style={{ color: 'white', marginLeft: '5px' }}>* </span>
                        <span>Required field</span>
                    </div>
                    <input 
                        type="file" 
                        name="cover" 
                        onChange={handleOnChangeFile}
                        style={buttonStyle.buttonCover}
                        required={!cover && !movieId}
                    />
                    <div>{cover ? <img src={cover} width="200px" alt="preview" /> : ''}</div>
                </div>
                <div>
                    <div style={{ color: 'white' }}>Director</div>
                    <input 
                        type="text" 
                        name="director" 
                        onChange={handleChange} 
                        value={director}
                        style={inputStyle} 
                    />
                </div>                
                <div>
                    <div style={{ color: 'white' }}>Review</div>
                    <textarea 
                        name="review" 
                        onChange={handleChange} 
                        value={review}
                        rows="6"
                        cols="40"
                        style={inputStyle} 
                    />
                </div>
                <input
                    type="submit"
                    value={movieId ? "Update Movie" : "Register Movie"}
                    style={buttonStyle.buttonSubmit}
                />
            </form>
        </Layout>
    );
}