import { Col, Container, Row } from "react-bootstrap";
import lessonImg from "../assets/img/lesson.jpg"
import examImg from "../assets/img/exam.jpg";
import licenseImg from "../assets/img/license.jpg"

export const About = () => {
    return (
        <section className="about" id="about">
            <Container>
                <Row className="align-items-center">
                    <h2>What we do?</h2>
                    <Col md={6} lg={4}>
                        <div className="card">
                            <div className="img-bx">
                                <img src={lessonImg} alt="card1" className="card-img-top"/>
                                <div className="overlay-up">
                                    <h1>01</h1>
                                </div>
                                <div className="overlay">
                                    <h4 className="card-title">LESSONS</h4>
                                    <p className="card-text">We offer various driving lessons for each driving license class and help you made appointment with the coach</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={4}>
                        <div className="card">
                            <div className="img-bx">
                                <img src={examImg} alt="card1" className="card-img-top"/>
                                <div className="overlay-up">
                                    <h1>02</h1>
                                </div>
                                <div className="overlay">
                                    <h4 className="card-title">EXAMS</h4>
                                    <p className="card-text">Written exams and driving exams are available on selected days and times and we help you make arrangement for that</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md={6} lg={4}>
                        <div className="card">
                            <div className="img-bx">
                                <img src={licenseImg} alt="card1" className="card-img-top"/>
                                <div className="overlay-up">
                                    <h1>03</h1>
                                </div>
                                <div className="overlay">
                                    <h4 className="card-title">LICENSES</h4>
                                    <p className="card-text">We collaborate with JPJ Malaysia to help you register/renew you license card</p>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}