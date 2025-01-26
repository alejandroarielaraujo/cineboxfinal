import { Link } from "react-router-dom";

export default function Movie({item, handleEdit, handleDelete}){

    const movieContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
    marginBottom: '10px',
    textAlign: 'center',
    
    };

    const movieInfoStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        textDecoration: 'none',
        color: 'white',
        marginBottom: '15px', 
    };


    const imageStyle = {
        width: '200px',
        height: '300px',
        objectFit: 'cover', 
        borderRadius: '10px', 
        marginBottom: '20px',
    };

    const titleStyle = {
        fontSize: '24px', 
        fontWeight: 'bold', 
        
    };

    const buttonContainerStyle = {
        marginTop: '10px', 
    };

    const buttonStyle = {
        backgroundColor: 'white', 
        color: '#8A2BE2', 
        border: '2px solid #8A2BE2',
        padding: '10px 20px', 
        borderRadius: '5px', 
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        margin: '5px',
        transition: 'background-color 0.3s, color 0.3s',
    };

    const buttonHoverStyle = {
        backgroundColor: '#d1d1d1',
        color: '#6A0DAD',
    };

    return(
        <div style={movieContainerStyle}>
            <Link to={`/view/${item.id}`} style={movieInfoStyle}>
                <img src={item.cover} alt={item.title} style={imageStyle} />
                <div style={titleStyle}>{item.title}</div>
            </Link>
            <div>
                <button 
                    onClick={() => handleEdit(item.id)}
                    style={buttonStyle}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Edit
                </button>

                <button 
                    onClick={() => handleDelete(item.id)}
                    style={buttonStyle}
                    onMouseOver={e => e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor}
                    onMouseOut={e => e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor}
                >
                    Delete
                </button>
            </div>
        </div>
    )
}