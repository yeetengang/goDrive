import { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import { logout } from "./AuthService"; 

export const NavBar = () => {
    const navigate = useNavigate();
    const [activeLink, setActiveLink] = useState('home');
    const [scrolled, setScrolled] = useState(false);

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        //const details = JSON.parse(localStorage.getItem('GO_DRIVE_TOKEN'));
        
        /*if (details) {
            setDetails(details);
        } */
        const detailsExist = localStorage.getItem("GO_DRIVE_TOKEN");
        if (!detailsExist) {
            setSignedIn(false);
        } else {
            setSignedIn(true);
        }
 
        const onScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        }

        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [])

    const onUpdateActiveLink = (value) => {
        setActiveLink(value);
    }

    const navigateLogin = () => {
        navigate('user/login');
    }

    const logoutAccount = () => {
        logout();
        setSignedIn(false);
        window.location.reload();
    }

    return (
        <Navbar expand="lg" className={scrolled ? "scrolled": ""}>
            <Container>
                <Navbar.Brand href="#home">
                    {/*<img src={logo} alt="Logo" />*/}
                    <h2>GoDrive</h2>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav">
                    <span className="navbar-toggler-icon"></span>
                </Navbar.Toggle>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home" className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('home')}>Home</Nav.Link>
                    <Nav.Link href="#about" className={activeLink === 'about' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('about')}>About</Nav.Link>
                    <Nav.Link href="#lessons" className={activeLink === 'lessons' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('lessons')}>Lessons</Nav.Link>
                    <Nav.Link href="#licenses" className={activeLink === 'licenses' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('licenses')}>Licenses</Nav.Link>
                    <Nav.Link href="#contact" className={activeLink === 'contact' ? 'active navbar-link' : 'navbar-link'} onClick={() => onUpdateActiveLink('contact')}>Contact</Nav.Link>
                </Nav>
                <span className="navbar-text">
                    {
                        !signedIn ?  
                        <button className="vvd" onClick={navigateLogin}><span>Login</span></button> :
                        <button className="vvd" onClick={logoutAccount}><span>Log Out</span></button>
                    }
                </span>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}