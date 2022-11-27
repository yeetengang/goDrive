import { Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from 'react';
import axios from "axios";
import cardImg from "../assets/img/card.png"

export const Licenses = () => {
    const checkLocal = JSON.parse(localStorage.getItem('GO_DRIVE_TOKEN'));
    const [items, setItems] = useState(checkLocal);
    const [userLicense, setUserLicense] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    
    useEffect(() => {
        if (checkLocal) {
            setItems(checkLocal);
            getUserLicense();
            setSignedIn(true);
        } else {
            setSignedIn(false);
        }
    }, []);

    function getUserLicense() {
        //console.log(items);
        axios.post('http://localhost:80/api/user/retrievelicense', items).then(function(response) {
            //console.log(response.data);
            setUserLicense(response.data);
        });
    }

    return (
        <section className="licenses" id="licenses">
            <Container>
                <Row>
                    <Col xs={12} md={6}>
                        <h2>LICENSE</h2>
                        <p>We offer online license checking to help you know whether 
                            you are a License L or P holder and keep track of your 
                            license validity date.</p>
                        <div className="license-details">
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>Class </td>
                                        <td>: </td>
                                        <td>
                                            {
                                                userLicense.license_type == "L" ? 
                                                <div className="class-icons-L">
                                                    <span>{userLicense.license_type}</span>
                                                </div> : 
                                                userLicense.license_type == "P" ?
                                                <div className="class-icons-P">
                                                    <span>{userLicense.license_type}</span>
                                                </div> :
                                                signedIn? 
                                                <div>
                                                    <span>Waiting for updates...</span>
                                                </div> :
                                                <div>
                                                    <span>Sign in to view license details</span>
                                                </div>
                                            }
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Validity Period </td>
                                        <td>: </td>
                                        <td>{
                                                userLicense.valid_start != undefined && (userLicense.license_type == "P" || userLicense.license_type == "L")? 
                                                userLicense.valid_start + " - " + userLicense.valid_end :
                                                signedIn? "Waiting for updates...": "Sign in to view more"
                                            }</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                    </Col>
                    <Col xs={12} md={6}>
                        <img src={cardImg} alt="card image"/>
                    </Col>
                </Row>
            </Container>
        </section>
    );
}