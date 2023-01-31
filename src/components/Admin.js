import { useEffect, useState } from "react";
import { Row, Col, Tab, Nav, Table, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { People } from "react-bootstrap-icons";
import axios from "axios";

export const Admin = () => {
    const navigate = useNavigate();

    const navigateLogin = () => {
        navigate('/user/login');
    }

    const [users, setUsers] = useState([]);
    const [lessons, setLessons] = useState([]);
    const [isOpen, setOpen] = useState(false);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const lessonFormInitialDetails = {
        state: '',
        venue: '',
        type: '',
        start_time: '',
        end_time: '',
        slots: '',
    }
    const [lessonFormDetails, setLessonFormDetails] = useState(lessonFormInitialDetails);

    useEffect(() => {
        const detailsExist = localStorage.getItem("GO_DRIVE_TOKEN");
        if (!detailsExist) {
            setSignedIn(false);
            setIsAdmin(false);
            navigateLogin();
        } else {
            setSignedIn(true);
            getUsers();
            getLessons();
            if (JSON.parse(localStorage.getItem("GO_DRIVE_TOKEN"))["is_admin"] == 1) {
                // if is admin
                setIsAdmin(true);
            } else {
                setIsAdmin(false);
                navigateLogin();
            }
        }
    }, []);

    function getUsers() {
        axios.get('http://localhost:80/api/user/').then(function(response){
            //console.log(response.data);
            setUsers(response.data);
        });
    }

    function getLessons() {
        axios.get('http://localhost:80/api/lesson/').then(function(response){
            //console.log(response.data);
            setLessons(response.data);
        });
    }

    const deleteUser = (id) => {
        axios.delete(`http://localhost:80/api/user/${id}/delete`).then(function(response){
            //console.log(response.data);
            getUsers(); //Retrieve the updated data that has already removed 1 user data
        });
    }

    const deleteLesson = (id) => {
        axios.delete(`http://localhost:80/api/lesson/${id}/delete`).then(function(response){
            //console.log(response.data);
            getLessons(); //Retrieve the updated data that has already removed 1 user data
        });
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const onLessonFormUpdate = (category, value) => {
        setLessonFormDetails({
            ...lessonFormDetails,
            [category]: value
        })
    }

    const openForm = () => {
        setOpen(true);
    }

    const closeForm = () => {
        setOpen(false);
        setStatus({});
    }

    const createLesson = async (e) => {
        e.preventDefault();

        // The server is hosted locally on port 80
        axios.post('http://localhost:80/api/lesson/save', lessonFormDetails).then(async function(response) {
            console.log(lessonFormDetails);
            setLessonFormDetails(lessonFormInitialDetails);

            if (response.status === 200) {
                setStatus({success: true, message: "Successfully created lesson!"});
                await delay(2000);
                closeForm();
                getLessons();
            } else {
                setStatus({success: false, message: "Something went wrong, please try again later"})
            }
        });
    }

    if (signedIn && isAdmin) {
        return (
            <div className="admin">
                <Tab.Container id="admin-tabs" defaultActiveKey="first">
                    <Nav variant="pills" className="nav-pills justify-content-center align-items-center" id="pills-tab">
                    <Nav.Item>
                        <Nav.Link eventKey="first">Manage Users</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="second">Manage License</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="third">Check Exam Status</Nav.Link>
                    </Nav.Item>
                    </Nav>
                    <Tab.Content id="slideInUp">
                    <Tab.Pane eventKey="first">
                        <div className="users-admin">
                            <Row>
                                <Col xs={2} md={1} className="icon">
                                    <People size={25}/>
                                </Col>
                                <Col xs={10} md={11}>
                                    <h1>Users</h1>
                                </Col>
                            </Row>
                            <h6>Listings of all users presence in the system *Not including admin</h6>
                            <h6>Admin can 
                                <br/>1. Edit Users' License Type from 'N' to License L or P
                                <br/>2. Update Users' License validity date
                                <br/>3. Delete User from the system
                            </h6>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>Date of Create</th>
                                        <th>Date of Update</th>
                                        <th>License Type</th>
                                        <th>License Start Date</th>
                                        <th>License End Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map((user, key)=> 
                                        <tr key={key}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.created_at}</td>
                                            <td>{user.updated_at}</td>
                                            <td>{user.license_type}</td>
                                            <td>{user.valid_start}</td>
                                            <td>{user.valid_end}</td>
                                            <td>
                                                <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                                <button onClick={() => deleteUser(user.id)} className="delete-btn">Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="second">
                        {
                            isOpen? <div className="form-popup" id="myForm">
                                <Form onSubmit={createLesson}>
                                    <h1>Create Lesson</h1>

                                    <Form.Label htmlFor="state"><b>State</b></Form.Label>
                                    <Form.Control type="text" value={lessonFormDetails.state} placeholder="Enter State" onChange={(e)=> onLessonFormUpdate('state', e.target.value)} required/>

                                    <Form.Label htmlFor="venue"><b>Venue</b></Form.Label>
                                    <Form.Control type="text" value={lessonFormDetails.venue} placeholder="Enter Venue" onChange={(e)=> onLessonFormUpdate('venue', e.target.value)} required/>

                                    <Form.Label htmlFor="type"><b>Type of Lesson</b></Form.Label>
                                    <Form.Control type="text" value={lessonFormDetails.type} placeholder="Enter lesson type" onChange={(e)=> onLessonFormUpdate('type', e.target.value)} required/>
                                    
                                    <Form.Label htmlFor="start"><b>Start Time</b></Form.Label>
                                    <Form.Control type="datetime-local" value={lessonFormDetails.start_time} placeholder="Enter Start Date and Time" onChange={(e)=> onLessonFormUpdate('start_time', e.target.value)} required/>
                                    
                                    <Form.Label htmlFor="end"><b>End Time</b></Form.Label>
                                    <Form.Control type="datetime-local" value={lessonFormDetails.end_time} placeholder="Enter End Date and Time" onChange={(e)=> onLessonFormUpdate('end_time', e.target.value)} required/>

                                    <Form.Label htmlFor="slots"><b>Slot/s Available</b></Form.Label>
                                    <Form.Control type="number" value={lessonFormDetails.slots} placeholder="Enter Number of Slot Available" onChange={(e)=> onLessonFormUpdate('slots', e.target.value)} required/>
                                    <br/>
                                    <Button type='submit' className="lesson-craete-btn"><span>{"Create Lesson"}</span></Button>
                                    <Button type="button" className="btn-cancel" onClick={closeForm}>Close</Button>
                                </Form>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </div> : ""
                        }
                        <div className="lessons-admin">
                            <Row>
                                <Col xs={2} md={1} className="icon">
                                    <People size={25}/>
                                </Col>
                                <Col xs={8} md={9}>
                                    <h1>Lesson Details</h1>
                                </Col>
                                <Col xs={2} mc={2}>
                                    <button onClick={openForm} className="create-btn">Create</button>
                                </Col>
                            </Row>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>State</th>
                                        <th>Lesson Type</th>
                                        <th>Venue</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Available Slots No.</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lessons.map((lesson, key)=> 
                                        <tr key={key}>
                                            <td>{lesson.id}</td>
                                            <td>{lesson.state}</td>
                                            <td>{lesson.type}</td>
                                            <td>{lesson.venue}</td>
                                            <td>{lesson.start_time}</td>
                                            <td>{lesson.end_time}</td>
                                            <td>{lesson.slots}</td>
                                            <td>{lesson.status}</td>
                                            <td>
                                                <Link to={`lesson/${lesson.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                                <button onClick={() => deleteLesson(lesson.id)} className="delete-btn">Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Tab.Pane>
                    <Tab.Pane eventKey="third">
                        <div className="exam-admin">
                            <Row>
                                <Col xs={2} md={1} className="icon">
                                    <People size={25}/>
                                </Col>
                                <Col xs={10} md={11}>
                                    <h1>Exams</h1>
                                </Col>
                            </Row>
                            <h6>Listings of users that registered for KPP test or driving exams</h6>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Email</th>
                                        <th>Date of Create</th>
                                        <th>Date of Update</th>
                                        <th>License Type</th>
                                        <th>License Start Date</th>
                                        <th>License End Date</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {users.map((user, key)=> 
                                        <tr key={key}>
                                            <td>{user.id}</td>
                                            <td>{user.email}</td>
                                            <td>{user.created_at}</td>
                                            <td>{user.updated_at}</td>
                                            <td>{user.license_type}</td>
                                            <td>{user.valid_start}</td>
                                            <td>{user.valid_end}</td>
                                            <td>
                                                <Link to={`user/${user.id}/edit`} style={{marginRight: "10px"}}>Edit</Link>
                                                <button onClick={() => deleteUser(user.id)} className="delete-btn">Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>
                    </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        );
    } 
}