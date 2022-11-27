import { Col, Container, Row, Table } from "react-bootstrap";
import { LessonCard } from "./LessonCard";
import { useState, useEffect } from 'react';
import axios from "axios";
import "react-multi-carousel/lib/styles.css";

export const Lessons = () => {
    const formInitialDetails = {
        datetime: '',
        state: '',
        class: '',
    }
    const [formDetails, setFormDetails] = useState(formInitialDetails);
    
    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }
    const [lessons, setLessons] = useState([]);
    const [userLessons, setUserLessons] = useState([]);

    const checkLocal = JSON.parse(localStorage.getItem('GO_DRIVE_TOKEN'));
    const [items, setItems] = useState(checkLocal);

    useEffect(() => {
        
        if (checkLocal) {
            setItems(checkLocal);
            //console.log(checkLocal);
            getUserLessons();
        }
        getLessons();
    }, []);


    function getLessons() {
        axios.get('http://localhost:80/api/lesson/upcoming').then(function(response){
            //console.log(response.data);
            setLessons(response.data);
        });
    }

    function getUserLessons() {
        //console.log(items);
        axios.post('http://localhost:80/api/user/retrievelesson', items).then(function(response) {
            //console.log(response.data);
            setUserLessons(response.data);
        });
    }

    const searchLessons = async (e) =>  {
        e.preventDefault();
        axios.post('http://localhost:80/api/lesson/search', formDetails).then(function(response) {
            console.log(response.data)
            if (response.status === 200) {
                setLessons(response.data);
            }
        });
    }

    const deleteLesson = (id) => {
        axios.delete(`http://localhost:80/api/user/lesson/${id}/delete`).then(function(response){
            //console.log(response.data);
            getLessons(); //Retrieve the updated data that has already removed 1 user data
        });
    }

    const [signedIn, setSignedIn] = useState(false);

    useEffect(() => {
        const detailsExist = localStorage.getItem("GO_DRIVE_TOKEN");
        if (!detailsExist) {
            setSignedIn(false);
        } else {
            setSignedIn(true);
        }
    }, [])

    return (
        <section className="lessons" id="lessons">
            <Container>
                <div className="lesson-bx">
                    <h4>GoDrive</h4>
                    <h2>Upcoming Lessons</h2>
                    <span>*Only registered user can make appointment</span>
                </div>
                <Row>
                    <Col xs={12} lg={6}>
                        {
                            lessons.map((lesson, index) => {
                                return (
                                    <LessonCard 
                                        key={index}
                                        {...lesson}
                                    />
                                )
                            })
                        }
                        <button onClick={() => getLessons()}><span>Next</span></button>
                    </Col>
                    <Col xs={12} lg={6}>
                        <div className="lesson-form">
                            <h2>Find a lesson that best suit you</h2>
                            <form onSubmit={searchLessons}>
                                <div className="field">
                                    <input type="date" value={formDetails.datetime} placeholder="Datetime" onChange={(e)=> onFormUpdate('datetime', e.target.value)}/>
                                </div>
                                <div className="field">
                                    <input type="text" value={formDetails.state} placeholder="State" onChange={(e)=> onFormUpdate('state', e.target.value)}/>
                                </div>
                                <div className="field">
                                    <input type="text" value={formDetails.class} placeholder="Class" onChange={(e)=> onFormUpdate('class', e.target.value)}/>
                                </div>
                                <button type='submit' className="search-btn"><span>Search</span></button>
                            </form>
                        </div>
                    </Col>
                </Row>
                <div className="lesson-bx">
                    <h2>Registered Lessons</h2>
                </div>
                <div className="registered-lesson">
                <Table>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>State</th>
                            <th>Lesson Type</th>
                            <th>Venue</th>
                            <th>Start Time</th>
                            {/*<th>Actions</th>*/}
                        </tr>
                    </thead>
                    <tbody>
                        {userLessons.length? userLessons.map((lesson, key)=> 
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{lesson.state}</td>
                                <td>{lesson.type}</td>
                                <td>{lesson.venue}</td>
                                <td>{lesson.start_time}</td>
                                {/*<td>
                                    <button onClick={() => deleteLesson(lesson.id)} className="delete-btn">Delete</button>
                                </td>*/}
                            </tr>
                        ): signedIn? <tr><td colSpan="5">You haven't register any lesson yet</td></tr>:
                        <tr><td colSpan="5">Sign In to view your registered lessons timetable</td></tr>
                        }
                    </tbody>
                </Table>
                </div>
            </Container>
        </section>
    );
}