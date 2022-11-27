import { Container, Col, Row } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios";
import examImg from "../assets/img/exams.jpg"

export const Exams = () => {
    const checkLocal = JSON.parse(localStorage.getItem('GO_DRIVE_TOKEN'));
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const [status, setStatus] = useState({});
    const [kppexam, setKPPExam] = useState({});
    const [drivingexam, setDrivingExam] = useState({});

    useEffect(() => {
        if (checkLocal) {
            setKPPExam({id: checkLocal.id, token: checkLocal.token, exam_type: "KPP"});
            setDrivingExam({id: checkLocal.id, token: checkLocal.token, exam_type: "Driving"});
        }
    }, []);
    
    function registerKPPExam() {
        //setExam({id: checkLocal.id, token: checkLocal.token, exam_type: "KPP"});
        axios.post('http://localhost:80/api/user/exam', kppexam).then(async function(response) {
            console.log(response.data);
            if (response.status === 200 && response.data.message === "Record created successfully") {
                setStatus({success: true, message: "Registration successful"});
            } else if (response.status === 200 && response.data.message != "Record created successfully") {
                setStatus({success: false, message: response.data.message})
            }
            else {
                setStatus({success: false, message: "Something went wrong, please try again later"})
            } 
            await delay(2000);
            setStatus({});
        });
    }
    function registerDrivingExam() {
        //setExam({id: checkLocal.id, token: checkLocal.token, exam_type: "Driving"}, ()=>{
            axios.post('http://localhost:80/api/user/exam', drivingexam).then(async function(response) {
                console.log(response.data);
                if (response.status === 200 && response.data.message === "Record created successfully") {
                    setStatus({success: true, message: "Registration successful"});
                } else if (response.status === 200 && response.data.message != "Record created successfully") {
                    setStatus({success: false, message: response.data.message})
                }
                else {
                    setStatus({success: false, message: "Something went wrong, please try again later"})
                } 
                await delay(2000);
                setStatus({});
            });
        //});
        
    }
    return (
        <section className="exams" id="exams">
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h1>EXAMS</h1>
                        <img src={examImg} alt="exam-img"/>
                    </Col>
                    <Col xs={12} md={6}>
                        <Col>
                            <div className="reserve-instruc">
                                <h5>Exam Reservation</h5>
                                <p>You can select test to be taken in this section. We will arrange
                                    the date and time for Law Test or help you register the driving
                                    test with JPJ. We will contact you soon via a phone call after 
                                    you decide to take the test.</p>
                                <p>Let's get to the test when you are ready!</p>
                            </div>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs={12} lg={6} className="btn-container">
                                    <div className="exam-btn-1">
                                        <button onClick={registerKPPExam}>
                                            <h3>KPP ONLINE TEST</h3>
                                            <p>Law Test</p>
                                            <span>Click to reserve</span>
                                        </button>
                                    </div>
                                </Col>
                                <Col xs={12} lg={6}>
                                    <div className="exam-btn-2">
                                        <button onClick={registerDrivingExam}>
                                            <h3>DRIVING EXAMS</h3>
                                            <p>Registration available for those who passed KPP Test</p>
                                            <span>Click to reserve</span>
                                        </button>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Col>
                </Row>
                {
                    status.message &&
                    <Col>
                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                    </Col>
                }
            </Container>
        </section>
    );
}