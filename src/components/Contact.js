import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import contactImg from "../assets/img/contact-img.svg";
import axios from 'axios';
import { Licenses } from './Licenses';


export const Contact = () => {
    const formInitialDetails = {
        name: '',
        email: '',
        phone: '',
        message: '',
    }

    const [formDetails, setFormDetails] = useState(formInitialDetails);
    const [buttonText, setButtonText] = useState('Send');
    const [status, setStatus] = useState({});

    const onFormUpdate = (category, value) => {
        
        setFormDetails({
            ...formDetails,
            [category]: value
        })
    }
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const handleSubmit = async (e) => {
        e.preventDefault();
        setButtonText('Sending...');
        /*let response = await fetch("http://localhost:5000/contact", {
            method: "POST",
            headers: {
                "Content-Type": "Application/json;charset=utf-8",
            },
            body: JSON.stringify(formDetails),
        });
        setButtonText("Send");
        let result = response.json()
        setFormDetails(formInitialDetails);
        if (result.Code === 200) {
            setStatus({success: true, message: "Message sent successfully"})
        } else {
            setStatus({success: false, message: "Something went wrong, please try again later"})
        }*/
        axios.post(`http://localhost:80/api/user/email`, formDetails).then(async function(response){
            console.log(response.data);
            if (response.status === 200 && response.data.message === "Email sent successfully") {
                setStatus({success: true, message: "Message sent!"});
                setButtonText('Sent!');
                setFormDetails(formInitialDetails); //Clear the inputs
                await delay(2000);
                setButtonText("Send");
                setStatus({});
            } else {
                setStatus({success: false, message: "Something went wrong, please try again later"});
            }
            
        });
    }

    return (
        <section className='contact' id='contact'>
            <Container>
                <Row className="align-items-center">
                    <Col md={6}>
                        <img src={contactImg} alt="Contact Us"/>
                    </Col>
                    <Col md={6}>
                        <h2>Have Something for Us?</h2>
                        <h6>Send us a message!</h6>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col xs={12} md={6} className="px-1">
                                    <input type="text" value={formDetails.name} placeholder="Name" onChange={(e)=> onFormUpdate('name', e.target.value)}/>
                                </Col>
                                <Col xs={12} md={6} className="px-1">
                                    <input type="email" value={formDetails.email} placeholder="Email Address" onChange={(e)=> onFormUpdate('email', e.target.value)}/>
                                </Col>
                                <Col xs={12} md={6} className="px-1">
                                    <input type="tel" value={formDetails.phone} placeholder="Phone No." onChange={(e)=> onFormUpdate('phone', e.target.value)}/>
                                </Col>
                                <Col xs={12} className="px-1">
                                    <textarea rows="6" value={formDetails.message} placeholder="Message" onChange={(e)=> onFormUpdate('message', e.target.value)}/>
                                    <button type='submit'><span>{buttonText}</span></button>
                                </Col>
                                {
                                    status.message &&
                                    <Col>
                                        <p className={status.success === false ? "danger" : "success"}>{status.message}</p>
                                    </Col>
                                }
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}