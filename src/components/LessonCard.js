import { Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

export const LessonCard = ({id, state, type, status, venue, start_time, end_time, slots}) => {
    const [statusq, setStatus] = useState({});
    const [buttonText, setButtonText] = useState('Click To Book');

    const lessonFormInitialDetails = {
        userid: '', //user id
        lessonid: '', 
    }
    const [lessonFormDetails, setLessonFormDetails] = useState(lessonFormInitialDetails);
    const [items, setItems] = useState([]);
    const delay = ms => new Promise(res => setTimeout(res, ms));

    useEffect(() => {
        const checkLocal = JSON.parse(localStorage.getItem('GO_DRIVE_TOKEN'));
        if (checkLocal) {
            setItems(checkLocal);
        }
        setButtonText("Click To Book");
    }, []);

    const userAddLesson = async (e) => {
        e.preventDefault();
        setButtonText('Booking...');
        const details = {
            userid: items.id,
            lessonid: id,
            token: items.token,
        }
        // The server is hosted locally on port 80
        axios.post('http://localhost:80/api/user/lesson', details).then(async function(response) {
            //console.log(details);
            if (response.status === 200 && response.data.message === "Record created successfully") {
                setButtonText('Booked');
                setStatus({success: true, message: "Booked!"});
                window.location.reload();
            } else {
                setButtonText('Error Book');
                setStatus({success: false, message: "Error Booking"});
            }
            await delay(2000);
            setButtonText('Click to Book');
        });
    }

    return (
        <Col>
            <div className="lesson-card">
                <div className="status-color" onClick={userAddLesson}></div>
                <Row xs={3}>
                    <Col xs={5}>
                        <div className="state">
                            <p>{state}</p>
                        </div>
                        <h4>{type}</h4>
                    </Col>
                    <Col xs={5}>
                        <div className="details">
                        <p>Date: <span>{start_time.split(" ")[0]}</span></p>
                        <p>Time: <span>{(start_time.split(" ")[1]).split(":")[0] + ":" +(start_time.split(" ")[1]).split(":")[1]}</span></p>
                        <p>Venue: <span>{venue}</span></p>
                        </div>
                    </Col>
                    <Col xs={2}>
                        <div className="vertical" onClick={userAddLesson}>
                            <p>{buttonText}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </Col>
    );
}