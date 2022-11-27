import { useState, useEffect } from "react";
import axios from 'axios';
import { Table, Form, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

export const AdminEditLicense = () => {
    const navigate = useNavigate();

    const initialInputs = {
        email: '',
        license_type: '',
        valid_start: '',
        valid_end: '',
    }
    const [status, setStatus] = useState({});
    const [inputs, setInputs] = useState(initialInputs);
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const {id} = useParams();

    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        axios.get(`http://localhost:80/api/user/${id}`).then(function(response){
            console.log(response.data);
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

        axios.put(`http://localhost:80/api/user/${id}/edit`, inputs).then(async function(response){
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
            <h1>Edit User's License Details</h1>
            <Form onSubmit={handleSubmit}>
                <table cellSpacing={10}>
                    <tbody>
                        <tr>
                            <th>
                                <Form.Label>User Email: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.email} type="text" readOnly={true}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>License Type: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.license_type} type="text" onChange={(e)=> onFormUpdate('license_type', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>License Valid Start Date: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.valid_St} type="datetime-local" onChange={(e)=> onFormUpdate('valid_start', e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                <Form.Label>License Valid End Date: </Form.Label>
                            </th>
                            <td>
                                <Form.Control value={inputs.valid_end} type="datetime-local" onChange={(e)=> onFormUpdate('valid_end', e.target.value)}/>
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
            </Form>
        </div>
    );
}