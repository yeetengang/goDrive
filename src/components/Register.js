import { Col, Container, Row } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const Register = () => {
    const navigate = useNavigate();
    const formInitialDetails = {
        email: '',
        password: '',
    }
    const [buttonText, setButtonText] = useState('Register');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }

    const delay = ms => new Promise(res => setTimeout(res, ms));

    const [formDetails, setFormDetails] = useState(formInitialDetails);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Registering...');

        // The server is hosted locally on port 80
        axios.post('http://localhost:80/api/user/save', formDetails).then(async function(response) {
            //console.log(response.data);

            setButtonText("Register");
            setFormDetails(formInitialDetails);

            if (response.status === 200) {
                setStatus({success: true, message: "Registration successful, proceed to Login Page..."});
                await delay(2000);
                navigateLogin();
            } else {
                setStatus({success: false, message: "Something went wrong, please try again later"})
            }
        });
    }

    const navigateLogin = () => {
        navigate('/user/login');
    }
    
    return (
        <section className="reg-log" id="reg-log">
            <Container>
                <Row className="align-items-center">
                    <Col>
                        <div className="reg-log-bx">
                            <h5>GoDrive</h5>
                            <h2>Welcome Back</h2>
                            <hr></hr>
                            <span>User Register</span>
                            <form onSubmit={handleSubmit}>
                                <div className="field">
                                    <h6>Email Address</h6>
                                    <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e)=> onFormUpdate('email', e.target.value)}/>
                                </div>
                                <div className="field">
                                    <h6>Password</h6>
                                    <input type="password" value={formDetails.password} placeholder="Password" onChange={(e)=> onFormUpdate('password', e.target.value)}/>
                                </div>
                                <div className="btn-submit">
                                    <button type='submit' className="reg-log-btn"><span>{buttonText}</span></button>
                                </div>
                            </form>
                            <div>
                                {
                                    status.message &&
                                    <p className={status.success === false ? "danger": "success"}>{status.message}</p>
                                }
                            </div>
                            <div className="chg-pg">
                                <span>Already Registered? </span><button className="chg-pg" onClick={navigateLogin}>Login</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}