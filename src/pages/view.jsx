import { useParams } from "react-router-dom";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useAppContext } from "../store/store";

export default function View(){
    const [item, setItem] = useState(null);
    const params = useParams();
    const store = useAppContext();

    useEffect(() => {
        const movie = store.getItem(params.movieId);
        setItem(movie);
    }, [params.movieId]);

    if (!item) {
        return <Layout>Item not found</Layout>
    }
    
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        padding: '20px',
        color: 'white',
        textAlign: 'left',
    };

    const imageStyle = {
        width: '350px',
        height: '575px',
        objectFit: 'cover',
        borderRadius: '10px',
        marginRight: '30px',
    };

    const detailsStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const labelStyle = {        
        fontSize: '20px',
    };

    const valueStyle = {
        fontWeight: 'bold',
        fontSize: '20px',
        marginBottom: '10px',
    };

    const titleStyle = {
        fontSize: '52px', 
        fontWeight: 'bold', 
        marginBottom: '10px',
    };

    return (
        <Layout>
            <div style={containerStyle}>
                <img src={item.cover} alt={item.title} style={imageStyle} />
                <div style={detailsStyle}>
                    <h2 style={titleStyle}>{item.title}</h2>
                    {item.genre && (
                        <div style={valueStyle}>
                            <span style={labelStyle}>Genre:</span> {item.genre}
                        </div>
                    )}
                    {item.director && (
                        <div style={valueStyle}>
                            <span style={labelStyle}>Director:</span> {item.director}
                        </div>
                    )}
                    {item.review && (
                        <div style={valueStyle}>
                            <span style={labelStyle}>Review:</span> {item.review}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}