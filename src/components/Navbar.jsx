import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../img/logo.png';

export default function NavBar() {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    const linkStyle = {
        padding: '10px',
        display: 'block',
        fontSize: '20px',
        color: 'white',
        textDecoration: 'none',
        fontFamily: '"Montserrat", sans-serif',
    };

    const navContainerStyle = {
        backgroundColor: '#060e06',
        padding: '20px 0',
        display: 'flex',
        gap: '5px',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '70px',
    };

    const navLinksContainer = {
        display: 'flex',
        gap: '20px',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
    };

    const logoStyle = {
        height: '40px',
        marginLeft: '20px',
    };

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div style={navContainerStyle}>
            <img 
                src={logo} 
                alt="Logo" 
                style={isSmallScreen ? { display: 'none' } : logoStyle} 
            />
            <div style={navLinksContainer}>
                <Link to="/" style={linkStyle}>Home</Link>
                <Link to="/create" style={linkStyle}>Create</Link>
            </div>
        </div>
    );
}