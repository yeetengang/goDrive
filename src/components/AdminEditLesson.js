import { useState, useEffect } from "react";
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
            <form onSubmit={handleSubmit}>
                <table cellSpacing={10}>
                    <tbody>
                        <tr>
                            <th>
                                <label>State: </label>
                            </th>
                            <td>
                                <input value={inputs.state} type="text" onChange={(e)=> onFormUpdate('state', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Lesson Type: </label>
                            </th>
                            <td>
                                <input value={inputs.type} type="text" onChange={(e)=> onFormUpdate('type', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Status: </label>
                            </th>
                            <td>
                                <input value={inputs.status} type="text" onChange={(e)=> onFormUpdate('status', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Venue: </label>
                            </th>
                            <td>
                                <input value={inputs.venue} type="text" onChange={(e)=> onFormUpdate('venue', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Start Date & Time: </label>
                            </th>
                            <td>
                                <input value={inputs.start_time} type="datetime-local" onChange={(e)=> onFormUpdate('start_time', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>End Date & Time: </label>
                            </th>
                            <td>
                                <input value={inputs.end_time} type="datetime-local" onChange={(e)=> onFormUpdate('end_time', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <label>Available Slots No.: </label>
                            </th>
                            <td>
                                <input value={inputs.slots} type="number" onChange={(e)=> onFormUpdate('slots', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={2} align="right"><button>Save</button></td>
                        </tr>
                    </tbody>
                </table>
                {
                    status.message &&
                    <p className={status.success === false ? "danger": "success"}>{status.message}</p>
                }
            </form>
        </div>
    );
}