import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react" 
import headerImg from "../assets/img/car.png"
import TrackVisibility from "react-on-screen"

export const Banner = (props) => {
    const navigate = useNavigate();

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const detailsExist = localStorage.getItem("GO_DRIVE_TOKEN");
        if (!detailsExist) {
            setSignedIn(false);
        } else {
            setSignedIn(true);
        }
    }, [])

    const navigateRegister = () => {
        navigate('user/register');
    }

    return (
        <section className="banner" id="home">
            <div className="overlay">
                <Container>
                    <Row className="align-items-center">
                        <Col xs={12} md={6} xl={6} className="banner-overlap">
                            <h1>{'Begin your driving journey here'}</h1> {/**Begin your driving journey here */}
                            <TrackVisibility>
                            {({ isVisible }) => // When isVisible flag is TRUE, then show this part
                                <div className={isVisible ? "animate__animated animate__fadeInUp" : ""}>
                                    <p>90% of students get their licenses within 3 days after passed the driving test</p>
                                </div>
                            }
                            </TrackVisibility>
                            {
                                signedIn? <button><span>Welcome Back!</span></button> :
                                <button onClick={navigateRegister}><span>Register Now</span><ArrowRightCircle size={25}/></button>
                            }
                            
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                            <img src={headerImg} alt="Headder Img"/>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="back-circle"></div>
        </section>
    );
}