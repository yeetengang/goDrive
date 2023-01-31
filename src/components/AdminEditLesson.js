import { useState, useEffect } from "react";
import { Form, Table, Button } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export const AdminEditLesson = () => {
    const navigate = useNavigate();

    const initialInputs = {
        state: '', // Malaysia State
        type: '', // Lesson Type
        status: '', // Active / Inactive
        venue: '', // Learning Center
        start_time: '', // Class Start Datetime
        end_time: '', // Class End Datetime
        slots: '', // Number of available slots
    }
    const [status, setStatus] = useState({});
    const [inputs, setInputs] = useState(initialInputs);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const {id} = useParams();

    useEffect(() => {
        getLesson();
    }, []);

    function getLesson() {
        axios.get(`http://localhost:80/api/lesson/${id}`).then(function(response){
            //console.log(response.data);
            setInputs(response.data);
        });
    }

    const onFormUpdate = (category, value) => {
        setInputs({
            ...inputs,
            [category]: value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.put(`http://localhost:80/api/lesson/${id}/edit`, inputs).then(async function(response){
            //console.log(response.data);
            if (response.status === 200) {
                setStatus({success: true, message: "Update success, back to admin page..."});
                await delay(2000);
                navigate('/admin'); //Navigate to admin page
            } else {
                setStatus({success: false, message: "Something went wrong, please try again later"});
            }
            
        });
    }

    return (
        <div className="edit">
            <h1>Edit Lesson's Details</h1>
            <Form onSubmit={handleSubmit}>
                <Table cellSpacing={10}>
                    <tbody>
                        <tr>
                            <th>
                                <Form.Label>State: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.state} type="text" onChange={(e)=> onFormUpdate('state', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>Lesson Type: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.type} type="text" onChange={(e)=> onFormUpdate('type', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>Status: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.status} type="text" onChange={(e)=> onFormUpdate('status', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>Venue: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.venue} type="text" onChange={(e)=> onFormUpdate('venue', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>Start Date & Time: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.start_time} type="datetime-local" onChange={(e)=> onFormUpdate('start_time', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                        <th>
                                <Form.Label>End Date & Time: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.end_time} type="datetime-local" onChange={(e)=> onFormUpdate('end_time', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>Available Slots No.: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.slots} type="number" onChange={(e)=> onFormUpdate('slots', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align="right"><Button type="submit">Save</Button></td>
                        </tr>
                    </tbody>
                </Table>
                {
                    status.message &&
                    <p className={status.success === false ? "danger": "success"}>{status.message}</p>
                }
            </Form>
        </div>
    );
}