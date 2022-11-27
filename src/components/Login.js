import { Col, Container, Row } from "react-bootstrap";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { runLogoutTimer, saveToLocal } from "./AuthService";

export const Login = () => {
    const navigate = useNavigate();
    const formInitialDetails = {
        email: '',
        password: '',
    }
    const [buttonText, setButtonText] = useState('Login');
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
        setButtonText('Checking User Data...');

        // The server is hosted locally on port 80
        axios.post('http://localhost:80/api/user/retrieve', formDetails).then(async function(response) {
            setButtonText("Login");
            setFormDetails(formInitialDetails);

            if (response.status === 200 && response.data.id != undefined) {
                //console.log(response.data);
                setStatus({success: true, message: "Login success, welcome back!"});
                saveToLocal(response.data);
                runLogoutTimer(response.data.expire);
                await delay(2000);
                navigateMain();
            } else {
                setStatus({success: false, message: "Something went wrong, please try again later"})
            }
        });
    }

    const handleSubmitAdmin = async (e) => {
        e.preventDefault();
        setButtonText('Checking Admin Data...');

        // The server is hosted locally on port 80
        axios.post('http://localhost:80/api/user/admin', formDetails).then(async function(response) {
            setButtonText("Login");
            setFormDetails(formInitialDetails);

            if (response.status === 200) {
                setStatus({success: true, message: "Login success, welcome back!"});
                saveToLocal(response.data);
                runLogoutTimer(response.data.expire);
                await delay(2000);
                navigateAdmin();
            } else {
                setStatus({success: false, message: "Something went wrong, please try again later"})
            }
        });
    }

    const navigateRegister = () => {
        navigate('/user/register')
    }

    const navigateMain = () => {
        navigate('/')
    }

    const navigateAdmin = () => {
        navigate('/admin')
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
                            <span>User Login</span>
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
                            <div className="admin-log">
                                <button  onClick={handleSubmitAdmin}><span>{"Login As Admin"}</span></button>
                            </div>
                            <div>
                                {
                                    status.message &&
                                    <p className={status.success === false ? "danger": "success"}>{status.message}</p>
                                }
                            </div>
                            <div className="chg-pg">
                                <span>New to GoDrive? </span><button className="chg-pg" onClick={navigateRegister}>Sign up</button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}