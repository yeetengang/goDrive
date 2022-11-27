import { Col, Container, Row } from "react-bootstrap";
import { ArrowRightCircleFill, ArrowLeftCircleFill } from "react-bootstrap-icons";
import dots from "../assets/img/dots.png"
import profileImg from "../assets/img/profile.jpg";
import TrackVisibility from "react-on-screen"

export const Review = () => {
    return (
        <section className="review" id="review">
            <Container>
                <div className="overlap">
                    <Row className="align-items-center">
                        <Col xs={12} md={6} xl={6}>
                            <div className="Card">
                                <h1>"</h1>
                                <p>I was having a hard time finding a way to register myself with a driving class due to the pandemic issues. GoDrive helped me to register it and I finally manage to get my license 4 days after I pass my driving exam!</p>
                                <Row>
                                    <Col xs={3}>
                                        <div className="profile-img"><img src={profileImg} alt="Avatar"/></div>
                                    </Col>
                                    <Col>
                                        <h5>Chloe</h5>
                                        <span>User since March 2021</span>
                                    </Col>
                                </Row>
                            </div>
                            <div className="arrows">
                                <button onClick={() => console.log("test1")}><ArrowLeftCircleFill size={25}/></button>
                                <button onClick={() => console.log("test2")}><ArrowRightCircleFill size={25}/></button>
                            </div>
                        </Col>
                        <Col xs={12} md={6} xl={6}>
                            <div className="testimonia">
                                <h1>What students Say About Us</h1>
                                <h5>Makes Everything Easy & Simple</h5>
                                <p>GoDrive provide an online service for everyone that
                                    wish to get their driving license. Other than
                                    that, we also help you keep track of your next
                                    license renewal date and help you renew your
                                    license whenever you need!</p>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Container>
            <div className="back-square"></div>
            <img className="dots" src={dots} alt="dots"/>
        </section>
    );
}